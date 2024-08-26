import { Product } from "../products/product";
import { User } from "../users/user";
import { ProductItemStatus } from "./productItemStatus";

export class ProductItem {

  id!: number;
  productId!: number;
  product!: Product;
  amount!: number;
  expirationDate!: Date;

  ////

  entryDate!: Date;
  isActive!: boolean;
  checkedDate!: Date;
  amountExpired!: number;
  status!: ProductItemStatus;
  checkedBy!: User;
}
