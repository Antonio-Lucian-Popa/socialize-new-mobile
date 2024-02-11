import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StoryListComponent } from './components/story-list/story-list.component';
import { register } from 'swiper/element/bundle';
import { PostListComponent } from './components/post-list/post-list.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { PostComponent } from './components/post/post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentComponent } from './components/comments/comment/comment.component';
register();


const components: any[] = [
  StoryListComponent,
  PostListComponent,
  DatePickerComponent,
  PostComponent,
  CommentsComponent,
  CommentComponent
];

const modules: any[] = [
  FormsModule, ReactiveFormsModule, MatMenuModule, MatTabsModule
];


@NgModule({
  declarations: [
    ...components,
    TimeAgoPipe,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ...modules
  ],
  exports: [...modules, ...components, TimeAgoPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
