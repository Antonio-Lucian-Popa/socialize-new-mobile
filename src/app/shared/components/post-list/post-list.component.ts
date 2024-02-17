import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interface/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];

  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  loadPosts(event?: any) {
    const userId = 'user-id-here'; // Replace with actual user ID
    this.postService.getFollowingUsersPosts(userId, this.currentPage, 10).subscribe({
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
  }

  loadData(event: any) {
    this.loadPosts(event);
  }

}
