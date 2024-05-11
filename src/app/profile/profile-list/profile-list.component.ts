import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../auth/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { Router } from '@angular/router';
import { CartService } from '../../order/cart/cart.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss'
})
export class ProfileListComponent implements OnInit {

  currentUser: User;
  errorMessage: boolean = false;

  constructor(private authService: AuthService, private auth: AngularFireAuth,  private dialog: MatDialog, private router: Router, 
              private cartService: CartService) {}


  ngOnInit(): void {
    this.auth.authState.subscribe((userAuth:any) => {
      if (userAuth) {
        this.authService.getCurrentUser(userAuth.uid).subscribe((user:User) => {
          this.currentUser = user;
        })
      }
    })
  }

  logOut() {
    this.cartService.makeCartEmpty(this.currentUser.id);
    this.authService.logOut();
  }

  goToEdit() {
    this.dialog.open(ProfileEditComponent, {
      data: {
        userId: this.currentUser.id
      }
    });
  }

  profileDelete() {
    this.authService.deleteUser(this.currentUser.id);
  }
}
