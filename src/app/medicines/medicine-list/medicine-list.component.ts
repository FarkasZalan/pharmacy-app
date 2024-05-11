import { Component } from '@angular/core';
import { Medicine } from '../medicine.model';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrl: './medicine-list.component.scss'
})
export class MedicineListComponent {
  medicines: Medicine[] = [];
  selectedSortOption: string = "";
  filterBySearch: string = "";
  filteredMedicines: Medicine[] = [];

  constructor(private medicineService: MedicineService) {
     this.getAllMedicine();
  }

  getAllMedicine() {
    this.medicineService.getAllMedicine().subscribe((medicines:Medicine[]) => {
      this.medicines = medicines
      this.filteredMedicines = medicines;
     });
     this.sortMedicines("nameASC");
  }

  applyFilter() {
    this.filteredMedicines = this.medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(this.filterBySearch.toLowerCase())
    );
     if (this.filterBySearch === "") {
      this.getAllMedicine();
     }

     this.sortMedicines(this.selectedSortOption);
  }

  sortMedicines(option: string) {
    switch (option) {
      case 'nameASC':
        this.filteredMedicines.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDESC':
        this.filteredMedicines.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceASC':
        this.filteredMedicines.sort((a, b) => a.price - b.price);
        break;
      case 'priceDESC':
        this.filteredMedicines.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }

  openMedicinePage(openMedicin: Medicine) {
    this.medicineService.goToMedicinePage(openMedicin);
  }
}
