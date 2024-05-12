import { Component, OnInit } from '@angular/core';
import { Order } from '../order.model';
import { User } from '../../auth/user.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { AuthService } from '../../auth/auth.service';
import { MedicineService } from '../../medicines/medicine.service';
import { Medicine } from '../../medicines/medicine.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent implements OnInit {
  orderSummary: Order;
  currentUser: User;
  orderItems: string = "";

  constructor(private route: ActivatedRoute, private orderService: OrderService, private authService: AuthService, private router: Router,
              private medicineService: MedicineService
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.orderService.getOrderById(params.get("id")).subscribe((order: Order) => {
          this.orderSummary = order;
          console.log(this.orderSummary)
          this.authService.getCurrentUser(this.orderSummary.userId).subscribe((user: User) => {
              this.currentUser = user;
          });

          this.makeOrderItemsString();
        })
    });
    
  }

  makeOrderItemsString() {
    let keys = [];
    Object.keys(this.orderSummary.cartItems.medicineCart).forEach(key => {
      const value: number = this.orderSummary.cartItems.medicineCart[key];

        this.medicineService.getMedicineById(key).subscribe((medicine: Medicine) => {
        if (!keys.includes(key)) {
            keys.push(key);
            this.orderItems += value + " db " + medicine.name + " " + (value* medicine.price) + " Ft" + "\n"; 
        }
      });
    });
  }

  backToMenu() {
    this.router.navigate(['/']);
  }
}
