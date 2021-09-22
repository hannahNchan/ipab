import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ModGuard implements CanActivateChild {

  private readonly url = '/';
  band: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {
  }

  /**
   * Deniega el acceso a las pantallas
   * que requieren autenticación.
   * @param next
   * @param state
   */
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): UrlTree | boolean {
    if (this._authService.isAllowModulo(state.url)) {
      return true;
    }
    return this._router.parseUrl(this.url);

  }
}