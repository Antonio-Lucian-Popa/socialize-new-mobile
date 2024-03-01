import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interface/post';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnChanges {

  @Input() isMyPosts: boolean = false;
  @Input() isPopularPosts: boolean = false; // E pentru tabul discovery, sa vezi postari populare
  @Input() userId: string | null = null;

  posts: Post[] = [];

  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {

    // Check if user is authenticated before loading posts
    // if (this.authService.isAuthenticated()) {
    //   this.authService.getUserId().then((userId) => {
    //     this.myUserId = userId;
    //     if (this.isMyPosts) {
    //       this.loadMyPosts();
    //     } else {
    //       this.loadPosts();
    //     }
    //   });
    // }
    if (this.isMyPosts) {
      this.loadMyPosts();
    } else {
      this.loadPosts();
    }
    // this.postService.getPosts().subscribe((posts) => {
    //   this.posts = posts;
    // });
  }

  /**
   * This method is called when the value of the input property changes
   */
  ngOnChanges() {
    this.posts = [];
    this.currentPage = 0;
    this.totalPages = 0;
    if (this.isMyPosts) {
      this.loadMyPosts();
    } else {
      this.loadPosts();
    }
  }

  loadMyPosts(event?: any) {
    if (this.userId) {
      this.postService.getUserPosts(this.userId, this.currentPage, 10).subscribe({
        next: (response) => {
          this.posts = [...this.posts, ...response.content];
          this.currentPage++;
          this.totalPages = response.totalPages;
          if (event) {
            event.target.complete();

            // Check if all data is loaded
            if (this.currentPage >= this.totalPages) {
              event.target.disabled = true; // Disable infinite scroll if no more data to load
            }
          }
        },
        error: (error) => {
          console.error(error);
          if (event) {
            event.target.complete();
          }
        }
      });
    }
  }

  loadPosts(event?: any) {
    if (this.userId && !this.isPopularPosts) {
      this.postService.getFollowingUsersPosts(this.userId, this.currentPage, 10).subscribe({
        next: (response) => {
          this.posts = [...this.posts, ...response.content];
          this.currentPage++;
          this.totalPages = response.totalPages;
          if (event) {
            event.target.complete();
          }

          // Check if all data is loaded
          if (this.currentPage >= this.totalPages) {
            event.target.disabled = true; // Disable infinite scroll if no more data to load
          }
        },
        error: (error) => {
          console.error(error);
          if (event) {
            event.target.complete();
          }
        }
      });
    } else if (this.isPopularPosts) {
      this.postService.findPopularPosts().subscribe({
        next: (response) => {
          this.posts = [...this.posts, ...response];
          if (event) {
            event.target.complete();
          }
        },
        error: (error) => {
          console.error(error);
          if (event) {
            event.target.complete();
          }
        }
      });
    }
  }

  loadData(event: any) {
    this.loadPosts(event);
  }

}
