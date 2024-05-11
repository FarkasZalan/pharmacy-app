import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CartItem } from "../cart/cart.model";

@Injectable({
    providedIn: 'root'
  })
export class CartService {

    constructor(private db: AngularFirestore) {}

    addToCart(cartItem: CartItem, selectedMedicineId: string, newQuantity: number) {
        this.db.collection("cart").ref
            .where("userId", "==", cartItem.userId)
            .where("closed", "==", false)
            .get()
            .then(async (medicineCart) => {
                if (!medicineCart.empty) {
                    medicineCart.forEach(async (doc) => {
                    const existingCartItem = doc.data() as CartItem;
                    const existingMedicineCart = existingCartItem.medicineCart;

                    for (const [id, oldQuantity] of Object.entries(existingMedicineCart)) {
                        cartItem.medicineCart[id] = oldQuantity;
                    }

                    cartItem.medicineCart[selectedMedicineId] = newQuantity;

                    // régi javascript hülyeség miatt át kell konvertálni hogy tudja kezeln ia firebase a mapot
                    const medicineCartObject = {};
                    Object.keys(cartItem.medicineCart).forEach(key => {
                        medicineCartObject[key] = cartItem.medicineCart[key];
                    });
                    cartItem.medicineCart = medicineCartObject as Map<string, number>;
                    // idáig

                    await this.db.collection("cart").doc(doc.id).update({
                        medicineCart: cartItem.medicineCart
                    });
                    window.location.reload();
                });
                } else {
                    const medicineCartObject = {};
                    Object.keys(cartItem.medicineCart).forEach(key => {
                        medicineCartObject[key] = cartItem.medicineCart[key];
                    });
                    cartItem.medicineCart = medicineCartObject as Map<string, number>;

                    await this.db.collection("cart").add(cartItem);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getCartSize(userId: string) {
        return new Promise<number>((resolve, reject) => {
            this.db.collection("cart").ref
                .where("userId", "==", userId)
                .where("closed", "==", false)
                .get()
                .then(querySnapshot => {
                    let totalSize = 0;
                    querySnapshot.forEach(doc => {
                        const existingCartItem = doc.data() as CartItem;
                        const existingMedicineCart = existingCartItem.medicineCart;
                        const size = Object.keys(existingMedicineCart).length;
                        totalSize += size;
                    });
                    resolve(totalSize);
                })
                .catch(error => {
                    console.error("Error getting cart size:", error);
                    reject(error);
                });
        });
    }

    makeCartEmpty(userId: string) {
        this.db.collection("cart").ref
        .where("userId", "==", userId)
        .where("closed", "==", false)
        .get()
        .then(querySnapshot => {
                querySnapshot.forEach(async doc => {
                    await this.db.collection("cart").doc(doc.id).update({
                        closed: true
                });
            });
        })
        .catch(error => {
            console.error("Error getting cart size:", error);
        });
    }
}