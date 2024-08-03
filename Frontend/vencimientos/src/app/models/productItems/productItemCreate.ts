import { Product } from "../products/product";

export class ProductItemCreate {

  productId!: number;
  product!: Product;
  expirationDate!: Date;
  amount!: number;
}
