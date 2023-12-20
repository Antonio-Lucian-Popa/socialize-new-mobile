import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationPageComponent } from './notification.page';


import { NotificationPageRoutingModule } from './notification-routing.module';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { SharedModule } from "../../shared.module";

@NgModule({
    declarations: [NotificationPageComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        NotificationPageRoutingModule,
        SharedModule
    ]
})
export class NotificationPageModule {}
