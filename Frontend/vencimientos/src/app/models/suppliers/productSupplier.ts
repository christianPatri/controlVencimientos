// import { MonthlyClient } from "../clients/monthlyClient";

export class ProductSupplier {
  id!: number;
  name!: string;
  rut!: string;
  description!: string;
  phoneNumber!: string;
  secondaryPhoneNumber!: string;
  contactName!: string;
  seller!: string;
  visitDays!: number[];
  interval!: number;
  errorMessage!: string;
}
