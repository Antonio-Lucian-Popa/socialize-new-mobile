import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public progress = 0;
  isPostCreate = false;

  isLoaded = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 3000);

    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50);

    this.postService.postCreateEmmitter.subscribe((data) => {
      console.log(data);
      this.uploadPost(data.userId, data.createPostDto, data.images);
    });
  }

  uploadPost(userId: string, createPostDto: any, images: string[]) {
    this.isPostCreate = true;
    this.postService.createPost(userId, createPostDto, images).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Calculate and update progress
          this.progress = event.total ? event.loaded / event.total : 0;
        } else if (event.type === HttpEventType.Response) {
          // Handle the response
          console.log('Upload complete', event.body);
          this.progress = 0; // Reset or adjust as needed
          this.isPostCreate = false;
        }
      },
      error: (error) => {
        // Handle error
        console.error('Upload error', error);
        this.progress = 0; // Reset on error
      },
      complete: () => {
        // Handle completion
        console.log('Upload completed');
      }
    });
  }


}
