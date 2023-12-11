import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {

  posts = [
    {
      id: 1,
      title: 'Mon premier post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.',
      loveIts: 0,
      created_at: new Date(),
      images: [
        {
          src: 'https://picsum.photos/200/300/?random',
          alt: 'random image'
        }
      ],
      user: {
        id: 12,
        name: 'John Doe',
        avatar: 'https://picsum.photos/200/300/?random'
      }
    }
  ];

  dataLoaded = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataLoaded = true;
    }, 3000);

  }

}
