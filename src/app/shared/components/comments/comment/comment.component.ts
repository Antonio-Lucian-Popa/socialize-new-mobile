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

  public expandedStates: { [commentId: number]: boolean } = {};

  public showSubComments: { [key: number]: boolean } = {}; // Tracks visibility of subcomments for each comment


  // Flag to toggle text display
  showFullText: boolean = false;

  // Maximum length before truncating
  maxLength: number = 50;

  constructor() { }


  // toggleText() {
  //   this.showFullText = !this.showFullText;
  // }

  toggleText(commentId: number): void {
    // If the comment ID exists in the map, toggle its state. Otherwise, set it to true.
    if (this.expandedStates.hasOwnProperty(commentId)) {
      this.expandedStates[commentId] = !this.expandedStates[commentId];
    } else {
      this.expandedStates[commentId] = true;
    }
  }

  toggleSubComments(commentId: number): void {
    this.showSubComments[commentId] = !this.showSubComments[commentId];
  }

  // Method to count total subcomments, considering nested levels
  countSubComments(comment: Comment): number {
    let count = comment.subComments.length;
    comment.subComments.forEach(subComment => {
      count += this.countSubComments(subComment);
    });
    return count;
  }


}
