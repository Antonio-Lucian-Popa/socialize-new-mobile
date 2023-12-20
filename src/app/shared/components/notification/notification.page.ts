import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../interface/notification';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  styleUrls: ['notification.page.scss']
})
export class NotificationPageComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    //this.generateItems();
    this.findLastNotifications();
  }

  findLastNotifications() {
    this.notificationService.findLastNotifications().subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }


  onIonInfinite(ev: any) {
    this.findLastNotifications();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


}
