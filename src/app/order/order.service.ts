import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
  })
export class OrderService {

    constructor(private db: AngularFirestore) {}
}