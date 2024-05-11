import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../../../styles/login.scss'
})
export class LoginComponent {
  @ViewChild('form') loginUserForm: NgForm;
  email: string = "";
  password: string = "";
  errorMessage: boolean = false;
  constructor(private router: Router, private authService: AuthService, private location: Location) {

  }

  login() {
    this.email = this.loginUserForm.value.email;
    this.password = this.loginUserForm.value.password;
    this.authService.login(this.email, this.password).then((resolve) => {
      if (resolve) {
        this.location.back();
      } else {
        this.errorMessage = true;
      }
    }).catch(() => {
      this.errorMessage = true;
    })

  }

  goToRegister() {
    this.router.navigate(['auth/register'])
  }
}
