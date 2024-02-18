import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Post } from '../../interface/post';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  userSearch = this.fb.group({
    value: [""]
  });

  popularImages: Post[] = [];
  usersSearched: any[] = [];

  isPopularImages = true;
  isUsersSearched = false;

  postSubscriber!: Subscription;

  isLoaded = false;

  // We have 2 cases:
  // 1. When we arrive on this page, we need to view popular images, like instagram
  // 2. If the user search something, we need to show the users finded by that name on the user input
  // When the user input is empty, show popular images
  // If what user search not find, show a message "Not users found"

  constructor(private fb: FormBuilder, private postService: PostService, private userService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.getLatestPopularImages();
    this.userSearch.get("value")?.valueChanges.subscribe(userSearched => {
      console.log(userSearched);
      if (userSearched) {
        this.isLoaded = false;
        this.isUsersSearched = true;
        this.isPopularImages = false;
        // TODO: Make a loader when we search for a user
        // this.userService.findUserByUsername(userSearched).subscribe(res => {
        //   this.usersSearched = res;

        //   setTimeout(() => {
        //     this.isLoaded = true;
        //   }, 3000);

        // });
        // TODO: find the user searched
      } else {
        this.isUsersSearched = false;
        this.isPopularImages = true;
      }
    });
  }

  getLatestPopularImages() {
    this.postSubscriber = this.postService.findPopularPosts().subscribe(posts => this.popularImages = posts);
  }

  onIonInfinite(ev: any) {
    //   this.findLastNotifications();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  openImage(postId: string): void {
    this.router.navigateByUrl("/viewPost/" + postId);
  }

  openUserProfile(userId: string): void {
    this.router.navigateByUrl("tabs/userProfile/" + userId);
  }

  ngOnDestroy(): void {
    this.postSubscriber.unsubscribe();
  }

}
