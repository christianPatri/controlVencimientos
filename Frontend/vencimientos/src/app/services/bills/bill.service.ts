import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bill } from '../../models/bills/bill';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  //private billUrl =  'http://10.211.55.3:5000/api/bills/';
  private billUrl = `${environment.apiBaseUrl}/api/bills/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

    generateManualMonthlyClientBill(manualBill: Bill): Observable<Bill> {
      let path = 'ManualMonthlyClientBill';

      return this.http.post<Bill>(this.billUrl + path, manualBill, this.requestOptions);
    }

    getMonthlyClientBills(monthlyClientId : number): Observable<Bill[]> {
      let path = 'MonthlyClientBills';

      return this.http.get<Bill[]>(`${this.billUrl}${path + '/'}${monthlyClientId}`, this.requestOptions);
    }

    getBill(billNumber: number): Observable<Bill> {
      return this.http.get<Bill>(`${this.billUrl}${billNumber}`, this.requestOptions);
    }

    payBill(bill: Bill) : Observable<Bill> {
      let path = 'PayBill';

      return this.http.post<Bill>(this.billUrl + path, bill, this.requestOptions);
    }

    generateMonthlyBills() : Observable<number> {
      let path = 'GenerateMonthlyBills';

      return this.http.post<number>(this.billUrl + path, this.requestOptions);
    }


}
