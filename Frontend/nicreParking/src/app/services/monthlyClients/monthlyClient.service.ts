import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyClient } from '../../models/clients/monthlyClient';
import { MonthlyClientCheck } from '../../models/clients/monthlyClientCheck';
import { SessionService } from '../session/session.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthlyClientService {

  //private monthlyClientsUrl =  'http://10.211.55.3:5000/api/monthlyClients/';

  private monthlyClientsUrl = `${environment.apiBaseUrl}/api/monthlyClients/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

    getActiveMonthlyClients(): Observable<MonthlyClient[]> {
      let path = 'ActiveMonthlyClients';
      return this.http.get<MonthlyClient[]>(this.monthlyClientsUrl + path, this.requestOptions);
    }

    getMonthlyClient(monthlyClientId: number): Observable<MonthlyClient> {
      //let path = 'ActiveMonthlyClients';
      return this.http.get<MonthlyClient>(`${this.monthlyClientsUrl}${monthlyClientId}`, this.requestOptions);
    }

    createMonthlyClient(monthlyClient: MonthlyClient): Observable<MonthlyClient> {
      return this.http.post<MonthlyClient>(this.monthlyClientsUrl, monthlyClient, this.requestOptions);
    }

    updateMonthlyClient(monthlyClient: MonthlyClient): Observable<MonthlyClient> {
      return this.http.put<MonthlyClient>(this.monthlyClientsUrl, monthlyClient, this.requestOptions);
    }

    deleteMonthlyClient(monthlyClient: MonthlyClient): Observable<unknown> {
      let path = 'DeleteMonthlyClient'
      return this.http.put<unknown>(this.monthlyClientsUrl + path, monthlyClient, this.requestOptions);
    }

    checkMonthlyClient(monthlyClient: MonthlyClientCheck): Observable<MonthlyClient> {
      let path = 'CheckMonthlyClient'

      let params = new HttpParams()
        .set('document', monthlyClient.document)
        .set('licenseplate', monthlyClient.licenseplate);


      return this.http.get<MonthlyClient>(`${this.monthlyClientsUrl}${path}`, { params, ...this.requestOptions });
    }
}
