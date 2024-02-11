import { Component, OnInit } from '@angular/core';
import { Comment } from '../../interface/comment';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent  implements OnInit {

  comments: Comment[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getComments().subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

}
