import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {

  userInfo = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) { }


  login(): void {
    if(this.userInfo.valid) {
      console.log("form valid");
      this.router.navigateByUrl("/");
    } else {
      console.log(this.userInfo.value)
    }
  }

}
