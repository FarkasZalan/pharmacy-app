import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-successfull-dialog',
  templateUrl: './successfull-dialog.component.html',
  styleUrl: './successfull-dialog.component.scss'
})
export class SuccessfullDialogComponent {

  constructor(private dialog: MatDialog) {} 

  hideDialog() {
    this.dialog.closeAll();
  }

}
