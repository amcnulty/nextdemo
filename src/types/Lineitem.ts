import { type Product } from "./Product";

export interface Lineitem {
  product: Product;
  quantity: number;
}
