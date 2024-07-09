import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MonthlyParkingLog } from '../../models/vehicles/monthlyParkingLog';
import { MonthlyVehicle } from '../../models/vehicles/monthlyVehicle';
import { MonthlyVehicleGenerator } from '../../models/vehicles/monthlyVehicleGenerator';
import { MonthlyVehicleMovements } from '../../models/vehicles/monthlyVehicleMovements';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class MonthlyVehicleService {

  //private monthlyVehiclesUrl =  'http://10.211.55.3:5000/api/monthlyVehicles/';
  private monthlyVehiclesUrl = `${environment.apiBaseUrl}/api/monthlyVehicles/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

    generateMonthlyVehicles(monthlyVehicles: MonthlyVehicleGenerator): Observable<MonthlyVehicleGenerator> {
      let path = 'GenerateMonthlyVehicles';
      return this.http.post<MonthlyVehicleGenerator>(this.monthlyVehiclesUrl + path, monthlyVehicles, this.requestOptions);
    }

    generateMonthlyVehicle(monthlyVehicles: MonthlyVehicleGenerator): Observable<MonthlyVehicleGenerator> {
      let path = 'GenerateMonthlyVehicle';
      return this.http.post<MonthlyVehicleGenerator>(this.monthlyVehiclesUrl + path, monthlyVehicles, this.requestOptions);
    }

    updateMonthlyVehicle(monthlyVehicle: MonthlyVehicle): Observable<MonthlyVehicle> {
      let path = 'UpdateMonthlyVehicle';
      return this.http.put<MonthlyVehicle>(this.monthlyVehiclesUrl + path, monthlyVehicle, this.requestOptions);
    }

    entryMonthlyVehicle(vehicle: MonthlyVehicle): Observable<MonthlyParkingLog> {
      let path = 'EntryMonthlyVehicle';
      return this.http.post<MonthlyParkingLog>(this.monthlyVehiclesUrl + path, vehicle, this.requestOptions);
    }

    exitMonthlyVehicle(vehicle: MonthlyVehicle): Observable<MonthlyParkingLog> {
      let path = 'ExitMonthlyVehicle';
      return this.http.post<MonthlyParkingLog>(this.monthlyVehiclesUrl + path, vehicle, this.requestOptions);
    }

    getMonthlyVehicleMovements(movements: MonthlyVehicleMovements): Observable<MonthlyParkingLog[]> {
      let path = 'MonthlyVehicleMovements';

      let params = new HttpParams()
        .set('monthlyVehicleId', movements.monthlyVehicleId);

      if(movements.from != null || movements.from != undefined) params = params.set('from', movements.from);

      if(movements.to != null || movements.to != undefined) params = params.set('to', movements.to);

      return this.http.get<MonthlyParkingLog[]>(`${this.monthlyVehiclesUrl}${path}`, { params, ...this.requestOptions });
    }

    deleteMonthlyVehicle(monthlyVehicle: MonthlyVehicle): Observable<any> {
      let path = "DeleteMonthlyVehicle"

      return this.http.post<any>(this.monthlyVehiclesUrl + path, monthlyVehicle, this.requestOptions);
    }
}
