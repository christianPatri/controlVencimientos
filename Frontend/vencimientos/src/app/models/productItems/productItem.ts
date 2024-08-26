import { Product } from "../products/product";

export class ProductItem {

  productId!: number;
  product!: Product;
  amount!: number;
  expirationDate!: Date;
}
