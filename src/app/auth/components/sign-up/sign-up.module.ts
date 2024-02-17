import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    SharedModule,
  ],
  declarations: [SignUpPage, WelcomeScreenComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SignUpPageModule {}
