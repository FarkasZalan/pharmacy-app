import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../auth/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { SuccessfullDialogComponent } from '../../successfull-dialog/successfull-dialog.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrl: '../../../styles/login.scss'
})
export class ProfileEditComponent {
  @ViewChild('form') editUserForm: NgForm;
  editUser: User;
  password: string = "";
  errorMessage: boolean = false;
  name: string = "";
  address: string = "";
  editUserId: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, private userService: AuthService) {
    this.editUserId = data.userId;
    userService.getCurrentUser(this.editUserId).subscribe((user: User) => {
      this.editUser = user;
    })
  }


  modify() {
    if (this.editUserForm.value.name !== "") {
      this.name = this.editUserForm.value.name;
    } else {
      this.name = this.editUser.name;
    }

    if (this.editUserForm.value.address !== "") {
      this.address = this.editUserForm.value.address;
    } else {
      this.address = this.editUser.address;
    }

    this.editUser = {
      id: this.editUser.id,
      name: this.name,
      email: this.editUser.email,
      address: this.address,
      deleted: false
    }

    this.userService.modifyUser(this.editUser).then(() => {
      this.dialog.closeAll();
      this.dialog.open(SuccessfullDialogComponent);
    })
    .catch(() => {
      this.errorMessage = true;
    })
  }

  backToLProfile() {
    this.dialog.closeAll();
  }
}
