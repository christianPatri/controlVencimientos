import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HourlyVehicle } from '../../models/clients/hourlyVehicle';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class HourlyClientsService {

  //private hourlyCllientsUrl =  'http://10.211.55.3:5000/api/hourlyClients/';
  private hourlyCllientsUrl = `${environment.apiBaseUrl}/api/hourlyClients/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

  entryHourlyVehicle(hourlyVehicle: HourlyVehicle): Observable<HourlyVehicle> {
    let path = 'EntryHourlyClient';
    return this.http.post<HourlyVehicle>(this.hourlyCllientsUrl + path, hourlyVehicle, this.requestOptions);
  }

  exitHourlyVehicle(hourlyVehicle: HourlyVehicle): Observable<HourlyVehicle> {
    let path = 'ExitHourlyClient';
    return this.http.post<HourlyVehicle>(this.hourlyCllientsUrl + path, hourlyVehicle, this.requestOptions);
  }
}
