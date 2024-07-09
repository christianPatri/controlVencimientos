import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MonthlyDebtor } from '../../models/clients/monthlyDebtor';
import { MonthlyParkingReport } from '../../models/reports/monthlyParkingReport';
import { MonthlyParkingReportIn } from '../../models/reports/monthlyParkingReportIn';
import { NightlyParkingReport } from '../../models/reports/nighltyParkingReport';
import { NightlyParkingReportIn } from '../../models/reports/nightlyParkingReportIn';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  //private reportsUrl =  'http://10.211.55.3:5000/api/reports/';
  private reportsUrl = `${environment.apiBaseUrl}/api/reports/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

    getMonthlyDebtorsReport(): Observable<MonthlyDebtor[]> {
      let path = 'GetMonthlyDebtorsReport';

      return this.http.get<MonthlyDebtor[]>(this.reportsUrl + path, this.requestOptions);
    }

    getNightlyParkingReport(input : NightlyParkingReportIn): Observable<NightlyParkingReport> {
      let path = 'GetNightlyParkingReport';

      let params = new HttpParams()
      .set('from', input.from.toString())
      .set('to', input.to != undefined ? input.to.toString() : "");

      return this.http.get<NightlyParkingReport>(`${this.reportsUrl}${path}`, { params, ...this.requestOptions });
    }

    getHourlyParkingReport(input : NightlyParkingReportIn): Observable<NightlyParkingReport> {
      let path = 'GetHourlyParkingReport';

      let params = new HttpParams()
      .set('from', input.from.toString())
      .set('to', input.to != undefined ? input.to.toString() : "");

      return this.http.get<NightlyParkingReport>(`${this.reportsUrl}${path}`, { params, ...this.requestOptions });
    }

    getMonthlyParkingReport(input : MonthlyParkingReportIn): Observable<MonthlyParkingReport> {
      let path = 'GetMonthlyParkingReport';

      let params = new HttpParams()
      .set('from', input.from.toString())
      .set('to', input.to != undefined ? input.to.toString() : "");

      return this.http.get<MonthlyParkingReport>(`${this.reportsUrl}${path}`, { params, ...this.requestOptions });
    }

}
