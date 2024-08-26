import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionService } from '../session/session.service';
import { CalendarIcons } from '../../models/calendar/calendarIcons';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private calendarUrl = `${environment.apiBaseUrl}/api/calendar/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

  GetDayIcons(date: Date): Observable<CalendarIcons> {
    let path = 'GetDayIcons';

    let params = new HttpParams()
      .set('date', date.toDateString());

    return this.http.get<CalendarIcons>(this.calendarUrl + path, { params, ...this.requestOptions });
  }
}
