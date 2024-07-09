import { MonthlyVehicle } from "./monthlyVehicle";

export class MonthlyParkingLog {
  id!: number;
  vehicleId!: number;
  vehicle!: MonthlyVehicle;
  entryExitDate!: Date;
  isEntry!: boolean;
}
