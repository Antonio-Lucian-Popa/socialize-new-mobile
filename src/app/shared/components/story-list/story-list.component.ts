import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss'],
})
export class StoryListComponent  implements OnInit {

  stories: any[] = [
    {
      id: 1,
      name: 'story 1',
      image: 'https://picsum.photos/200/300',
      username: 'user1',
      avatar: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      name: 'story 2',
      image: 'https://picsum.photos/200/300',
      username: 'user2',
      avatar: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      name: 'story 3',
      image: 'https://picsum.photos/200/300',
      username: 'user3',
      avatar: 'https://picsum.photos/200/300',
    },
    {
      id: 1,
      name: 'story 1',
      image: 'https://picsum.photos/200/300',
      username: 'user4',
      avatar: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      name: 'story 2',
      image: 'https://picsum.photos/200/300',
      username: 'user5',
      avatar: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      name: 'story 3',
      image: 'https://picsum.photos/200/300',
      username: 'user6',
      avatar: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      name: 'story 1',
      image: 'https://picsum.photos/200/300',
      username: 'user7',
      avatar: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      name: 'story 2',
      image: 'https://picsum.photos/200/300',
      username: 'user8',
      avatar: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      name: 'story 3',
      image: 'https://picsum.photos/200/300',
      username: 'user9',
      avatar: 'https://picsum.photos/200/300',
    }
  ];

  public swiperConfig = {
    slidesPerView: 5,
    spaceBetween: 10,
    freeMode: true,
    allowTouchMove: true,
    direction: 'horizontal',
    cssMode: false
  };

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // BE call
  }

}
