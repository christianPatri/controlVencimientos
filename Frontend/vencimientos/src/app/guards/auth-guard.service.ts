
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(
    private auth: SessionService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated() ){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
