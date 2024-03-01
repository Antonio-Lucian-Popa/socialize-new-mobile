import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../interface/post';
import { PostService } from '../../services/post.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { forkJoin } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss']
})
export class UserProfilePage implements OnInit, OnDestroy {

  posts: Post[] = [];

  userId!: string | null;

  isUserFollowing = false;

  userProfile: any;

  // userProfile: any = {
  //   id: 1,
  //   firstName: 'Lisa',
  //   lastName: 'Aly',
  //   email: 'john@gmail.com',
  //   userImage: 'https://images.unsplash.com/photo-1660951381925-57ac7e40c40d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   followers: 100,
  //   following: 200,
  //   posts: 300
  // }

  userPosts: any = [
    {
      id: 2,
      title: 'Post 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      createdAt: '2019-01-01'
    }
  ];

  userImages: any = [
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1682685796444-acc2f5c1b7b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: '2019-01-01'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1702306258947-162c0847db0c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: '2019-01-01'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1510997017461-3c4b81f07779?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: '2019-01-01'
    }
  ];

  isLoggedUserProfile = false;

  userAuthSubscribed: any;

  imageUrl?: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    // check if the userId is equal to the logged in user
    this.userAuthSubscribed = this.authService.getUserId().then((userId) => {
      console.log(userId);
      if (userId === this.userId) {
        this.isLoggedUserProfile = true;
      }
    });
    // made be req to get user profile
    if (this.userId) {
      forkJoin([
        this.userService.findUserById(this.userId),
        this.userService.getProfileImage(this.userId)
      ]).subscribe((res: any) => {
        console.log(res);
        this.userProfile = res[0];

        const objectURL = URL.createObjectURL(res[1]);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log(res[1]);
      });

      // this.userService.findUserById(this.userId).subscribe((user: any) => {
      //   console.log(user);
      //   this.userProfile = user;
      // });
    }
    console.log(this.userId);
  }

  followUser(userId: string) {
    // make a BE call to add user to my following list
    this.isUserFollowing = true;
  }

  unfollowUser(userId: string) {
    // make a BE call to remove user from my following list
    this.isUserFollowing = false;
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave event fired');
  }

  ngOnDestroy(): void {
    this.userAuthSubscribed.unsubscribe();
  }

}
