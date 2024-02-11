import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/interface/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {

  @Input()
  comment!: Comment;

  // Flag to toggle text display
  showFullText: boolean = false;

  // Maximum length before truncating
  maxLength: number = 50;

  constructor() { }


  toggleText() {
    this.showFullText = !this.showFullText;
  }

}
