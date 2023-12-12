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
register();


const components: any[] = [
  StoryListComponent,
  PostListComponent,
  DatePickerComponent
];

const modules: any[] = [
  FormsModule, ReactiveFormsModule, MatMenuModule, MatTabsModule
];


@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ...modules
  ],
  exports: [...modules, ...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
