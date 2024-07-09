import { MonthlyParkingLog } from "./monthlyParkingLog";

export class MonthlyVehicle {
  id!: number;
  brand!: string;
  model!:string;
  licenseplate!: string;
  color!: string;
  startingDate!: Date;
  price!: number;
  vehicleParkingLogs!: MonthlyParkingLog[];
}
