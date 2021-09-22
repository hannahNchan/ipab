import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly loginUrl = '/multiva/inicio/login';
  band: boolean = false;

  constructor(private _authService: AuthService,private _router: Router) {
  }

  /**
   * Deniega el acceso a las pantallas
   * que requieren autenticación.
   * @param next
   * @param state
   */
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): UrlTree | boolean {
    if (this._authService.isLoggedInSessionTime()) {
      return true;
    }
    return this._router.parseUrl(this.loginUrl);
  }
}
