import { MonthlyVehicle } from "../vehicles/monthlyVehicle";

export class MonthlyClient {
  id!: number;
  name!: string;
  lastname!:string;
  phoneNumber!: string;
  secondaryPhoneNumber!: string;
  document!:string;
  address!:string;
  startingDate!: Date;
  showDetail: boolean = false;
  vehicles!: MonthlyVehicle[];
}



