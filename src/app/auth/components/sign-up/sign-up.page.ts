import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ModalController, NavController } from '@ionic/angular';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  @ViewChild('gallery', { static: false }) gallery: any;
  @ViewChild(IonModal)
  dateModal!: IonModal;

  // selectedFile?: File;

  selectedFile: File | undefined = undefined;
  imagePreview: string | ArrayBuffer | null = null;

  userInfo = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    birthday: [""],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    gender: ["", Validators.required],
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


  register() {
    if (this.userInfo.valid) {
      console.log('Registration Data:', this.userInfo.value);
      // Here you would usually send the data to your backend or perform some other registration logic

      // After handling registration, move to the next slide
      // Assuming 'gallery' is your Swiper instance, you might need to adjust this based on how you've set up Swiper
      this.gallery?.swiper?.slideNext();
    } else {
      console.log("Data is invalid");
    }

    this.gallery?.swiper?.slideNext(); // TODO: Remove this line
  }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target!.result; // Set the preview image URL
        this.selectedFile = event.target.files[0] || null;
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  }

  onSubmit() {
   if(this.userInfo.valid) {
    console.log('Form is valid', this.userInfo.value);
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

  onDateChange(event: CustomEvent) {
    const selectedDate = event.detail.value;
    this.userInfo.get('birthday')!.setValue(selectedDate, { onlySelf: true });
    this.closeModal(); // Call this function to close the modal
  }

  closeModal() {
    this.dateModal.dismiss();
  }

}
