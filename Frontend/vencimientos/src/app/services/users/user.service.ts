import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../session/session.service';
import { User } from '../../models/users/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private usersUrl =  'http://10.211.55.3:5000/api/users/';
  private usersUrl = `${environment.apiBaseUrl}/api/users/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

    getActiveUsers(): Observable<User[]> {
      let path = 'ActiveUsers';
      return this.http.get<User[]>(this.usersUrl + path, this.requestOptions);
    }

    createUser(user: User): Observable<User> {
      return this.http.post<User>(this.usersUrl, user, this.requestOptions);
    }

    updateUser(user: User): Observable<User> {
      return this.http.put<User>(this.usersUrl, user, this.requestOptions);
    }

    deleteUser(user: User): Observable<unknown> {
      let path = 'DeleteUser'
      return this.http.put<unknown>(this.usersUrl + path, user, this.requestOptions);
    }
}
