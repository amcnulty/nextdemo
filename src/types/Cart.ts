import { type Lineitem } from "./Lineitem";

export interface Cart {
  isActive: boolean;
  lineitems: Lineitem[];
  count: number;
  subTotal: number;
  tax: number;
  grandTotal: number;
}
