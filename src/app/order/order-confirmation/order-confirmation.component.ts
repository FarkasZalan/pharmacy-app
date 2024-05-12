import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Medicine } from '../../medicines/medicine.model';
import { CartDisplay } from '../cart/cart-display';
import { CartItem } from '../cart/cart.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CartService } from '../cart/cart.service';
import { MedicineService } from '../../medicines/medicine.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { OrderService } from '../order.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent {

  total: number = 0;
  cartItem: CartItem;
  currentUserID: string = "";
  currentUserOrder: User;
  medicines: CartDisplay[] = [];
  order: Order;

  constructor(private location: Location, private router: Router, private auth: AngularFireAuth, private cartService: CartService, 
              private medicineService: MedicineService, private authService: AuthService, private orderService: OrderService ) {}

  ngOnInit(): void {
    this.auth.authState.subscribe((userAuth:any) => {
      if (userAuth) {
        this.authService.getCurrentUser(userAuth.uid).subscribe((user:User) => {
          this.currentUserOrder = user;
        });
        this.currentUserID = userAuth.uid;
        this.cartService.getCartElements(this.currentUserID)
          .then(async (medicineCart) => {
            if (!medicineCart.empty) {
                  medicineCart.forEach(async (doc) => {
                  this.cartItem = doc.data() as CartItem;
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
                          this.total += (medicine.price * value);
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

  goToProfile() {
    this.router.navigate(['/profile/list']);
  }

  backToCart() {
    this.location.back();
  }

  makeOrder() {
    let currentDate: Date = new Date();
    const formattedDate: string = currentDate.toISOString().slice(0, 16).replace('T', ' ');
    console.log(formattedDate);
    this.order = {
      id: "",
      cartItems: this.cartItem,
      userId: this.currentUserID,
      total: this.total,
      orderDate: formattedDate
    }
    this.orderService.makeOrder(this.order);
  }
}
