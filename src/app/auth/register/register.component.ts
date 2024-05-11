import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: '../../../styles/login.scss'
})
export class RegisterComponent{
  @ViewChild('form') createUserForm: NgForm;
  newUser: User;
  password: string = "";
  errorMessage: boolean = false;
  constructor(private location: Location, private authService: AuthService) {}




  register() {
    this.newUser = {
      id: "",
      name: this.createUserForm.value.name,
      email: this.createUserForm.value.email,
      address: this.createUserForm.value.address,
      deleted: false
    }
    this.password = this.createUserForm.value.password;
    this.authService.register(this.newUser.email,
      this.newUser.name, this.newUser.address, this.password
    ).then((resolve) => {
      if (resolve) {
        this.location.back();
      } else {
        this.errorMessage = true;
      }
    }).catch(() => {
      this.errorMessage = true;
    })

  }

  backToLogin() {
    this.location.back();
  }
}
