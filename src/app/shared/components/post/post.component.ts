import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Post, UserPost } from '../../interface/post';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {

  @Input()
  post!: Post;

  userInputComment = this.fb.group({
    value: ['']
  })

  myUUid = "1234567890"; // TODO: Find a way to get the actual user id

  dataLoaded = false;

  isPostLiked = false;

  isModalOpen = false;

  // State to manage whether the full description is shown
  showFullDescription = false;

  constructor(private fb: FormBuilder, private commentService: CommentService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataLoaded = true;
    }, 3000);

  }

  onLikePost() {
    this.isPostLiked = !this.isPostLiked;
    if (this.isPostLiked) {
      this.post.likes.push({
        id: this.myUUid,
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://picsum.photos/200/300/?random'
      });
    } else {
      const indexOfLikeToRemove = this.post.likes.findIndex((like: UserPost) => like.id === this.myUUid);
      if (indexOfLikeToRemove !== -1) {
        // Correctly remove the item without reassigning the result of splice
        this.post.likes.splice(indexOfLikeToRemove, 1);
      }
    }
    // Made a request to the server to like the post
  }


  isPostLikedByUser() {
    return this.post.likes.some((like: any) => like.user.id === this.myUUid);
  }

  createComment(): void {
    const userInputForm = this.userInputComment.get("value");
    const comment = (userInputForm && userInputForm.value) ? userInputForm.value : '';
    this.commentService.userComment.next({
      id: '3',
      userDto: {
        id: this.myUUid,
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://picsum.photos/200/300/?random'
      },
      value: comment,
      createdAt: '',
      postId: '',
      parentId: '',
      subComments: []
    });
    this.userInputComment.reset();
  }

  // Toggle the state between showing the full description and the truncated version
  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

}
