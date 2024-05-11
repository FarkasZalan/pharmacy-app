import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CartItem } from "./cart/cart.model";

@Injectable({
    providedIn: 'root'
  })
export class OrderService {

    constructor(private db: AngularFirestore) {}
}