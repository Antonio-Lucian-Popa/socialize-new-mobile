import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  isModalOpen = false;

  constructor(public modalController: ModalController) { }

  // In your main component
  async openDatePicker() {
    const modal = await this.modalController.create({
      component: DatePickerComponent
    });
    return await modal.present();
  }


}
