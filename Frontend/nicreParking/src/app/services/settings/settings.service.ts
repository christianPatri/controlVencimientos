import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigurationItem } from '../../models/settings/configurationItem';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //private configurationItemsUrl =  'http://10.211.55.3:5000/api/settings/';
  private configurationItemsUrl = `${environment.apiBaseUrl}/api/settings/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

  getConfigurationItems(): Observable<ConfigurationItem[]> {
    let path = 'GetConfigurationItems';

    return this.http.get<ConfigurationItem[]>(this.configurationItemsUrl + path, this.requestOptions);
  }

  updateConfigurationItem(configurationItem: ConfigurationItem): Observable<ConfigurationItem> {
    let path = 'UpdateConfigurationItem';

    return this.http.post<ConfigurationItem>(this.configurationItemsUrl + path, configurationItem, this.requestOptions);
  }

  // getNightlyParkingReport(input : NightlyParkingReportIn): Observable<NightlyParkingReport> {
  //   let path = 'GetNightlyParkingReport';

  //   let params = new HttpParams()
  //   .set('from', input.from.toString())
  //   .set('to', input.to != undefined ? input.to.toString() : "");

  //   return this.http.get<NightlyParkingReport>(`${this.reportsUrl}${path}`, { params, ...this.requestOptions });
  // }

  // getHourlyParkingReport(input : NightlyParkingReportIn): Observable<NightlyParkingReport> {
  //   let path = 'GetHourlyParkingReport';

  //   let params = new HttpParams()
  //   .set('from', input.from.toString())
  //   .set('to', input.to != undefined ? input.to.toString() : "");

  //   return this.http.get<NightlyParkingReport>(`${this.reportsUrl}${path}`, { params, ...this.requestOptions });
  // }

}
