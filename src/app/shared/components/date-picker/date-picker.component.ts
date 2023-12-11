import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {

  constructor(private modalCtrl: ModalController) { }

  onDateChange(event: any) {
    // Handle the date change event
    // Close the modal after date selection
   // this.isModalOpen = false;
   this.modalCtrl.dismiss();
  }

}
