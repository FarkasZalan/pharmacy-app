import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss'
})
export class ProfileListComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthService, private auth: AngularFireAuth) {}


  ngOnInit(): void {
    this.auth.authState.subscribe((userAuth:any) => {
      if (userAuth) {
        this.authService.getCurrentUser(userAuth.uid).subscribe((user:User) => {
          this.currentUser = user;
          console.log(this.currentUser)
        })
      }
    })
  }

  logOut() {
    this.authService.logOut();
  }

  profileDelete() {

  }
}
