import { MonthlyClient } from "../clients/monthlyClient";
import { MonthlyVehicle } from "./monthlyVehicle";

export class MonthlyVehicleGenerator {
  monthlyClient!: MonthlyClient;
  monthlyVehicles!: MonthlyVehicle[]
}
