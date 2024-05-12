import { CartItem } from "./cart/cart.model";

export interface Order {
    id?: string,
    cartItems: CartItem,
    userId: string
    total: number;
    orderDate: string;
}