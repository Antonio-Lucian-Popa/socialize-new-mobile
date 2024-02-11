import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {

  @Input() post: any;

  myUUid = "1234567890";

  dataLoaded = false;

  isPostLiked = false;

  isModalOpen = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataLoaded = true;
    }, 3000);

  }

  onLikePost() {
    this.isPostLiked = !this.isPostLiked;
    if(this.isPostLiked) {
      this.post.likes.push({
        id: 3,
        user: {
          id: this.myUUid,
          name: 'John Doe',
          avatar: 'https://picsum.photos/200/300/?random'
        }
      });
    } else {
      this.post.likes = this.post.likes.filter((like: any) => like.user.id !== this.myUUid);
    }
    // Made a request to the server to like the post
  }

  isPostLikedByUser() {
    return this.post.likes.some((like: any) => like.user.id === this.myUUid);
  }


  // comment modal
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  // end comment modal

}
