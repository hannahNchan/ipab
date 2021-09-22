import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';

import { LocalStorageManagerService } from '@services/local-storage-manager.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private _localStorage: LocalStorageManagerService,
               private _router: Router,
               private modalService: NgbModal,
               private _authService: AuthService ) {
  }

  /**
   * Agrega la cabecera Autorization a las peticiones http.
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = this._localStorage.getData('token');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + idToken)
      });

      return next.handle(cloned).pipe(catchError(x => this.handleAuthError(x)));
    }
    return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      // navigate /delete cookies or whatever
      this.modalService.dismissAll();
      swal.close();
      this._authService.logout();
      this._router.navigate(['/multiva/inicio/login']);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }
}
