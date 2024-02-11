import { Component, OnInit } from '@angular/core';
import { StoryService } from './shared/services/story.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isStoryOpened = false;

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.storyService.isStoryOpened.subscribe((isOpened: boolean) => {
      this.isStoryOpened = isOpened;
    });
  }
}
