import { ProductItemCreate } from "../productItems/productItemCreate";

export class ProductItemsExcelUpload {

  rowsError!: number[];
  productItemsError!: ProductItemCreate[];
  productItemsToCreate!: ProductItemCreate[];
}
