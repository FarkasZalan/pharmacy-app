import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Medicine } from "./medicine.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class MedicineService {

    constructor(private db: AngularFirestore, private router: Router) {}

    getAllMedicine() {
        return this.db.collection<Medicine>('medicines').valueChanges();
    }

    uploadInitialMedicines(medicines: Medicine[]) {
        for (let medicine of medicines) {
            this.db.collection("medicines").add(medicine);
        }
    }

    goToMedicinePage(medicine: Medicine) {
        this.db.collection('medicines').ref
            .where('name', '==', medicine.name)
            .where('price', '==', medicine.price)
            .where('description', '==', medicine.description)
            .get()
            .then(document => {
               if (!document.empty) {
                 const medicineId = document.docs[0].id;
                  this.router.navigate(['/medicine-details', medicineId]);
                } else {
                  console.log('Document not found');
                }
            })
          .catch(error => {
              console.error('Error getting document:', error);
          });
    }

    getMedicineById(id: string) {
        return this.db.collection("medicines").doc(id).valueChanges();
    }
}