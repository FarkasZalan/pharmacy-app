import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicineService } from './medicines/medicine.service';
import { INITIAL_MEDICINES } from './medicines/medicines-item-list';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  constructor(private medicineService: MedicineService, private db: AngularFirestore) {}

  sudscriptionToUploadData: Subscription;

  ngOnInit() {
    this.sudscriptionToUploadData = this.db.collection("medicines").valueChanges().subscribe((docRef) => {
      if (docRef.length === 0) {
        this.medicineService.uploadInitialMedicines(INITIAL_MEDICINES);
      }
    })
  }

  ngOnDestroy(): void {
    this.sudscriptionToUploadData.unsubscribe();
  }
}
