import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  selectedFile?: File;

  userInfo = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    birthday: [""],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  });

  isModalOpen = false;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController
    ) { }

  // In your main component
  async openDatePicker() {
    const modal = await this.modalController.create({
      component: DatePickerComponent
    });
    return await modal.present();
  }

  onDateChange(event: any) {
    this.userInfo.get('birthday')!.setValue(event.detail.value);
  }


  register(): void {
    if(this.userInfo.valid) {
      console.log("form valid");
      this.router.navigateByUrl("/sign-in");
    } else {
      console.log(this.userInfo.value)
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
   if(this.userInfo.valid) {
    this.authService.register(this.userInfo.value, this.selectedFile).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        // route to the login page
        this.router.navigateByUrl('/sign-in');
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
   }
  }

  goToSlides() {
    this.navCtrl.navigateForward('/slides');
  }

}
