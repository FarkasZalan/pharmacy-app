import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Medicine } from '../medicine.model';
import { MedicineService } from '../medicine.service';
import { AuthService } from '../../auth/auth.service';
import { CartItem } from '../../order/cart/cart.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CartService } from '../../order/cart/cart.service';

@Component({
  selector: 'app-medicine-page',
  templateUrl: './medicine-page.component.html',
  styleUrl: './medicine-page.component.scss'
})
export class MedicinePageComponent implements OnInit{

  selectedMedicine: Medicine
  selectedMedicineId: string = "";
  userLoggedIn: boolean = false;
  cartItem: CartItem;
  quantity: number = 1;
  medicineMap: Map<string, number> = new Map<string, number>;
  currentUserId: string = "";

  constructor(private route: ActivatedRoute, private location: Location, private medicineService: MedicineService, private authService: AuthService, 
              private router: Router, private auth: AngularFireAuth, private cartService: CartService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedMedicineId = params.get("id")
        this.medicineService.getMedicineById(this.selectedMedicineId).subscribe((medicine: Medicine) => {
          this.selectedMedicine = medicine;
        });
    });
    this.authService.isAuthenticated().then(
      (authenticated: boolean) => {
          if (authenticated) {
              this.userLoggedIn = true;
          } else {
            this.userLoggedIn = false;
          }
      });
  }

 async addToCart() {
     this.auth.authState.subscribe((userAuth:any) => {
      if (userAuth) {
        this.currentUserId = userAuth.uid;
        this.medicineMap[this.selectedMedicineId] = this.quantity;
        this.cartItem = {
          medicineCart: this.medicineMap,
          userId: this.currentUserId,
          closed: false
        }
        this.cartService.addToCart(this.cartItem, this.selectedMedicineId, this.quantity);
      }
    });
  }

  backToMenu() {
    this.location.back();
  }

  goToLogin() {
    this.router.navigate(['auth/login'])
  }

}
