import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserLogin } from '../../models/session/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  //private sessionUrl = 'http://10.211.55.3:8090/api/sessions/';
  private sessionUrl = `${environment.apiBaseUrl}/api/sessions/`;
  private userToken : string = '';
  public isLogged = false;

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<string> {
    let path = 'Login';

    return this.http.post<string>(this.sessionUrl + path, user)
      .pipe(map(
        resp =>{
          this.saveToken(String(resp));
          return resp
        }));
  }

  saveToken(token: string ){
    localStorage.setItem('userToken', token);

    setTimeout(() => {
      this.isLogged = true;
     }, 2000);
  }

  logout() {
    localStorage.removeItem('userToken');
    this.isLogged =false;
  }

  readToken(){
    if (localStorage.getItem('userToken') ){
      let localStorageToke = localStorage.getItem('userToken');
      this.userToken = localStorageToke != null ? localStorageToke : "";
      this.isLogged = true;
    } else {
      this.userToken = '';
      this.isLogged = false;
    }
  }

  getToken() : string{

    var userToken = localStorage.getItem('userToken');

    if(userToken != null){
      return userToken;
    } else{
      return "";
    }
  }

  isAuthenticated(): boolean {
    this.readToken();
    return this.userToken.length > 2;
  }
}
