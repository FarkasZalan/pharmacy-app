import { User } from "../auth/user.model";
import { CartItem } from "./cart/cart.model";
import { Timestamp } from "firebase/firestore";

export interface Order {
    cartItems: CartItem[],
    userId: User
    total: number;
    orderDate: Timestamp;
}