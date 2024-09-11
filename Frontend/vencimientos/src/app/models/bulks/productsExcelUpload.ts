import { ProductCreate } from "../products/productCreate";

export class ProductsExcelUpload {
  rowsError!: number[];
  productsError!: ProductCreate[];
  productsToCreate!: ProductCreate[];
}
