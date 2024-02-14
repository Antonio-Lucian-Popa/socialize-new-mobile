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

    document.addEventListener('ionInput', function(e) {
      const textarea = e.target! as HTMLTextAreaElement;
      if (textarea.tagName === 'ION-TEXTAREA') {
        // Adjust the textarea to shrink or grow with content, up to max
        textarea.style.height = 'auto'; // Reset height to calculate new scrollHeight
        const newHeight = Math.min(textarea.scrollHeight, 140); // Assuming 140px is max before scrolling starts
        textarea.style.height = `${newHeight}px`;
      }
    });

  }

}
