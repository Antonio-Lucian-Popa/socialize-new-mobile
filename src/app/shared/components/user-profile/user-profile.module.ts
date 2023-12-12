import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfilePage } from './user-profile.page';


import { UserProfilePageRoutingModule } from './user-profile-routing.module';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    UserProfilePageRoutingModule,
    SharedModule
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}
