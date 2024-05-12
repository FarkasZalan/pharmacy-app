import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Order } from "./order.model";
import { Router } from "@angular/router";
import { CartService } from "./cart/cart.service";

@Injectable({
    providedIn: 'root'
  })
export class OrderService {

    constructor(private db: AngularFirestore, private router: Router, private cartService: CartService) {}

    makeOrder(order: Order) {
      this.db.collection("orders").add(order)
        .then((documentRef) => {
          documentRef.update({id: documentRef.id})
          this.cartService.makeCartEmpty(order.userId);
          this.router.navigate(['order/order-summary', documentRef.id]);
        });
    }

    getOrderById(orderId: string) {
      return this.db.collection("orders").doc(orderId).valueChanges();
    }

    getUserLatestOrders(userId: string) {
      return this.db.collection("orders", ref => 
        ref.where("userId", "==", userId)
      ).valueChanges();
    }
}