export interface CartItem {
    medicineCart: Map<string, number>,
    userId: string,
    closed: boolean
}