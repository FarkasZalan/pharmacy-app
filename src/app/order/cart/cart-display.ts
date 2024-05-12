import { Medicine } from "../../medicines/medicine.model";

export interface CartDisplay {
    medicineId: string,
    medicine: Medicine,
    quantity: number
}