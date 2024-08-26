import { ProductSupplier } from "../suppliers/productSupplier";

export class Product {
  id!: number;
  name!: string;
  description!: string;
  barCode!: string;
  code!: number;
  amountDaysPreviousNotification!: number;
  isActive!: boolean;
  creationDate!: Date;
  endDate!: Date;

  supplier!: ProductSupplier;
  supplierId!: number;
  supplierName!: string;
}
