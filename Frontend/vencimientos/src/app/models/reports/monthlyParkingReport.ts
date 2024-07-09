import { MonthlyParkingReportPayment } from "./monthlyParkingReportPayment";

export class MonthlyParkingReport {

  from!: Date;
  to!: Date;
  totalAmount!: number;
  totalPayments!: number;
  payments!: MonthlyParkingReportPayment[];
}
