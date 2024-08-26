import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserLogin } from '../../models/session/UserLogin';
import { User } from '../../models/users/user';
import { UserRoles } from '../../models/users/userRoles';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  //private sessionUrl = 'http://10.211.55.3:8090/api/sessions/';
  private sessionUrl = `${environment.apiBaseUrl}/api/sessions/`;
  private userToken : string = '';
  public isLogged = false;

  private readonly USER_KEY = 'loggedInUser';
  private readonly USER_ROLE = 'loggedInUserRole';

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<User> {
    let path = 'Login';

    return this.http.post<User>(this.sessionUrl + path, user)
      .pipe(map(
        resp =>{
          this.saveLoginInformation(resp);
          return resp
        }));
  }

  saveLoginInformation(user: User ){
    localStorage.setItem('userToken', user.token);
    let roles : UserRoles [] = [];

    //roles.push((user.role as UserRoles))

    const roleString = UserRoles[user.role as unknown as keyof typeof UserRoles];
    roles.push(roleString);

    //user.roles.forEach(r => );

    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    sessionStorage.setItem(this.USER_ROLE, JSON.stringify(roles));


    setTimeout(() => {
      this.isLogged = true;
     }, 2000);
  }

  logout() {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.USER_ROLE);
    this.isLogged =false;
  }

  getUser(): any | null {
    const user = sessionStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  getRoles(): any | null {
    const roles = sessionStorage.getItem(this.USER_ROLE);
    return roles ? JSON.parse(roles) : null;
  }

  getUserRoles(): string[] {
    const roles = this.getRoles();
    return roles ? roles : [];
  }

  // hasRole(roles: string []): boolean {
  //   const userRoles = this.getUserRoles();

  //   // const selectedRole: UserRoles | undefined; = UserRoles[role as keyof typeof UserRoles];

  //   let selectedRole: UserRoles[]| undefined;
  //   let x = userRoles.forEach(r => selectedRole?.push( UserRoles[r as keyof typeof UserRoles]));

  //   let hasRole = roles != undefined ? roles.includes(UserRoles[x]) : false;
  //   return (roles== '' || hasRole);
  // }

  hasRole(roles: string[]): boolean {
    const userRoles = this.getUserRoles(); // Obtiene los roles del usuario como strings

    // Convertir los roles del usuario a su equivalente en el enum UserRoles
    const selectedRoles: UserRoles[] = userRoles.map(role => UserRoles[role as keyof typeof UserRoles]);

    // Verificar si alguno de los roles permitidos está en los roles del usuario
    return roles == undefined || roles.some(role => selectedRoles.includes(UserRoles[role as keyof typeof UserRoles]));
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
