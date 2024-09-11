import { ProductSupplier } from "../suppliers/productSupplier";

export class SuppliersExcelUpload {
  rowsError!: number[];
  suppliersError!: ProductSupplier[];
  suppliersToCreate!: ProductSupplier[];
}
