import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild(IonModal)
  modal!: IonModal;

  images: string[] = []; // This will store the image data

  post = this.fb.group({
    description: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

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
      console.log(this.post.value);
    }
  }

}
