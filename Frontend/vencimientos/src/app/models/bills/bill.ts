import { MonthlyClient } from "../clients/monthlyClient";

export class Bill {
  billNumber!: number;
  isActive!: boolean;
  totalAmount!: number;
  issueDate!: Date;
  paymentDate!: Date;
  monthlyClientId!: number;
  monthlyClient!: MonthlyClient;
  year!: number;
  month!: number;
  description!: string;
}
