import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from './cart.model';
import { CartService } from './cart.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MedicineService } from '../../medicines/medicine.service';
import { Medicine } from '../../medicines/medicine.model';
import { CartDisplay } from './cart-display';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartItem: CartItem;
  currentUserID: string = "";
  cartSize: number = 0;
  medicines: CartDisplay[] = [];

  constructor(private router: Router, private cartService: CartService, private auth: AngularFireAuth, private medicineService: MedicineService
   ) {}

  ngOnInit(): void {
    this.auth.authState.subscribe((userAuth:any) => {
      if (userAuth) {
        this.currentUserID = userAuth.uid;
        this.cartService.getCartElements(this.currentUserID)
          .then(async (medicineCart) => {
            if (!medicineCart.empty) {
                  medicineCart.forEach(async (doc) => {
                  this.cartItem = doc.data() as CartItem;
                  this.cartSize = (Object.keys(this.cartItem.medicineCart).length);
                  let keys = [];
                  Object.keys(this.cartItem.medicineCart).forEach(key => {
                    const value = this.cartItem.medicineCart[key];
                    
                      this.medicineService.getMedicineById(key).subscribe((medicine: Medicine) => {
                        if (!keys.includes(key)) {
                          keys.push(key);
                          let medicineDisplay: CartDisplay = {
                            medicineId: key,
                            medicine: medicine,
                            quantity: value
                          }
                          this.medicines.push(medicineDisplay);
                        }
                      });
                });
                
          });
            } else {
              this.cartItem = null;
            }
          })
          .catch((error) => {
            console.log(error);
          })
        }
    });
  }

  backToMenu() {
    this.router.navigate(['/']);
  }

  emptyCart() {
    this.cartService.makeCartEmpty(this.currentUserID);
  }

   goToOrder() {
    let needToDelete = []
    for(let cartElement of this.medicines) {
      if (cartElement.quantity === 0) {
        delete this.cartItem.medicineCart[cartElement.medicineId];
      } else {
        this.cartItem.medicineCart[cartElement.medicineId] = cartElement.quantity;
      }
    }

    this.cartService.updateCartElments(this.cartItem);
    this.router.navigate(['order/order-summary']);
  }
}
