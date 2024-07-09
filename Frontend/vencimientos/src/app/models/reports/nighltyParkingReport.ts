import { HourlyVehicle } from "../clients/hourlyVehicle";

export class NightlyParkingReport {
  movements!: HourlyVehicle[];
  from!: Date;
  to!: Date;
  totalAmount!: number;
  totalMovements!: number;
}
