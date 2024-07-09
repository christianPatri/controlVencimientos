import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HourlyVehicle } from '../../models/clients/hourlyVehicle';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class NightlyClientsService {

  //private hourlyCllientsUrl =  'http://10.211.55.3:5000/api/nightlyClients/';
  private hourlyCllientsUrl = `${environment.apiBaseUrl}/api/nightlyClients/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

  entryNightlyVehicle(hourlyVehicle: HourlyVehicle): Observable<HourlyVehicle> {
    let path = 'EntryNightlyClient';
    return this.http.post<HourlyVehicle>(this.hourlyCllientsUrl + path, hourlyVehicle, this.requestOptions);
  }

  exitNightlyVehicle(hourlyVehicle: HourlyVehicle): Observable<HourlyVehicle> {
    let path = 'ExitNightlyClient';
    return this.http.post<HourlyVehicle>(this.hourlyCllientsUrl + path, hourlyVehicle, this.requestOptions);
  }
}
