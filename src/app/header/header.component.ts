import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  userLoggedIn: boolean = false;
  loggedUser: User;

  constructor(private router: Router,
              private authService: AuthService,
              private auth: AngularFireAuth) {}


  ngOnInit(): void {
    this.auth.authState.subscribe((userAuth:any) => {
      if (userAuth) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    })
  }

  navigateToAccount() {
    this.router.navigate(['/profile']);
  }

//click to logo and then navigate home
navigateHome() {
  this.router.navigate(['/home']);
}

navigateToLogin() {
  this.router.navigate(['/auth']);
}
}
