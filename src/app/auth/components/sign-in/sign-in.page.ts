import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }


  login(): void {
    if(this.userInfo.valid) {
      console.log("form valid");
      const { email, password } = this.userInfo.value;
      // made a login request
      if(email && password) {
        this.authService.login(email, password).subscribe((response: any) => {
          console.log(response);
          this.router.navigate(['/']);
        });
      }
    } else {
      console.log("form not valid");
    }
  }

}
