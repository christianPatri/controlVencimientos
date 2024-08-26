
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(
    private auth: SessionService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];

    if (this.auth.isAuthenticated() && this.auth.hasRole(expectedRoles) ){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   const requiredRoles: string[] = route.data['roles'];
  //   const userRole: string = this.authService.getUserRole(); // O el método que uses para obtener el rol del usuario

  //   if (requiredRoles.includes(userRole)) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/unauthorized']); // O la ruta de tu página de no autorizado
  //     return false;
  //   }
  // }
}
