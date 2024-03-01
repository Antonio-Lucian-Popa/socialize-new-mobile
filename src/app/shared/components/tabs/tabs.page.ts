import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PostService } from '../../services/post.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;

  userId: string | null = null;

  images: string[] = []; // This will store the image data

  post = this.fb.group({
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.authService.getUserId().then((userId) => {
      console.log(userId)
      this.userId = userId;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
     // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  uploadImage() {
    const fileInput: HTMLElement = document.getElementById('file-input')! as HTMLElement;
    fileInput.click(); // This will open the file upload dialog
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result); // Push the base64 string into the images array
        };
        reader.readAsDataURL(file); // Read the file as a data URL (base64 string)
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1); // This will remove the image from the array
  }

  createPost(): void {
    if (this.post.valid || this.images.length > 0) {
      console.log(this.post.value, this.images);
      this.postService.postCreateEmmitter.emit({userId: this.userId, post: this.post.value, images: this.images});
     // this.postService.createPost('userId', this.post.value, this.images).subscribe(res => console.log(res));
    }
  }

  openUserProfile() {
    // Open the user profile page
    this.authService.getUserId().then((userId) => {
      console.log(userId)
      this.userId = userId;
      this.router.navigate(['/tabs/userProfile', this.userId]);
    });
  }

}
