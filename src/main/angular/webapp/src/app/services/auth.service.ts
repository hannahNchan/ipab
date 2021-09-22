import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as moment from 'moment';

import { IAuthUsuario } from '@interfaces/inicio.interface';
import { LocalStorageManagerService } from '@services/local-storage-manager.service';
import { Moment } from 'moment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly PERFIL_USUARIO = 'perfil';
  static readonly ID_USUARIO = 'idUsuario';
  static readonly USUARIO = 'usuario';
  static readonly TOKEN = 'token';
  static readonly EXPIRA = 'expiraEn';
  static readonly MODULOS = 'modulos'

  passworExpira = false;

  constructor(private _http: HttpClient,
    private _localStorage: LocalStorageManagerService) {
  }

  /**
   * Solicita al servidor la validación de los
   * datos del usuario para el inicio de sesión.
   * @param authData Datos de autenticación.
   */
  login(authData: IAuthUsuario): Observable<any> {

    return this._http.post<IAuthUsuario>('/IPABESB/rest/auth/login', authData).pipe(
      map(resp => {
        if (resp['header']['estatus']) {
          const decoded = jwt_decode(resp['token']);
          this._localStorage.saveSyncedSessionData(resp['token'], AuthService.TOKEN);
          this._localStorage.saveSyncedSessionData(decoded['sub'], AuthService.ID_USUARIO);
          this._localStorage.saveSyncedSessionData(decoded['user'], AuthService.USUARIO);
          this._localStorage.saveSyncedSessionData(decoded['exp'], AuthService.EXPIRA);
          return {
            header: {
              estatus: true
            },
            idUsuario: decoded['sub'],
            usuario: decoded['user'],
            mensaje: resp['header']['mensajeFuncional']
          };
        } return resp;
      })
    );
  }

  getPerfilUsuario(idUsuario: number): Observable<any> {
    return this._http.get(`/IPABESB/rest/auth/perfilUsuario?idUsuario=${idUsuario}`).pipe(map(res => {
      let modulos = [];
      res['perfilUsuario'].secciones.map((secc) => {
        secc.modulos.map((mod) => modulos.push(mod))
      })
      this._localStorage.saveSyncedSessionData(modulos, AuthService.MODULOS);
      return res
    }))
  }

  isAllowModulo(url: string): boolean {
    let band = false;
    const modulos = this._localStorage.getData(AuthService.MODULOS)
    modulos.map((mod) => {
      if (url == mod.url) band = true;
    })
    return band;
  }

  /**
   * Borra la sesión del usuario del navegador.
   */
  logout(): void {
    this._localStorage.deleteData(AuthService.ID_USUARIO);
    this._localStorage.deleteData(AuthService.USUARIO);
    this._localStorage.deleteData(AuthService.PERFIL_USUARIO);
    this._localStorage.deleteData(AuthService.TOKEN);
    this._localStorage.deleteData(AuthService.EXPIRA);
    this._localStorage.deleteData(AuthService.MODULOS);
  }

  /**
   * Devuelve verdadero si está dentro del tiempo de la sesión.
   */
  isLoggedInSessionTime(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getActiveUser(): number {
    return Number(this._localStorage.getData(AuthService.ID_USUARIO));
  }

  /**
   * Devuelve el tiempo de expiración del token actual.
   */
  private getExpiration(): Moment {
    const expiration = this._localStorage.getData(AuthService.EXPIRA);
    return moment.unix(expiration);
  }
}
