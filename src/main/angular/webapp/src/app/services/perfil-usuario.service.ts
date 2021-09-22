import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iperfil, IActualizarPermiso } from '@interfaces/perfiles-usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {
  host: string;
  constructor(private http: HttpClient) {
    this.host = `${window.location.protocol}//${window.location.host}`;
    this.host.toString();
  }
  /**
   * Obtiene hola mundo.
   */
  getPerfiles(): Observable<any> {
    return this.http.get(`/IPABESB/rest/perfiles/consultaPerfiles`);
  }

  /**
   * Obtiene los perfil.
   * @param idPerfil
   */
  getPerfil(idPerfil: number): Observable<any> {
    return this.http.get(`/IPABESB/rest/perfiles/consultaPerfil?idPerfil=${idPerfil}`);
  }

  /**
   * Servicio para la actualización de un perfil
   * @param perfil
   */
  updatePerfil(perfil: Iperfil): Observable<any> {
    return this.http.post<Iperfil>('/IPABESB/rest/perfiles/altaPerfil', perfil);
  }

  /**
   * Servicio para la actualización de un perfil
   * @param perfil
   */
  altaPerfil(perfil: Iperfil): Observable<any> {
    return this.http.post<Iperfil>('/IPABESB/rest/perfiles/altaPerfil', perfil);
  }

  /**
   * realiza la baja de un perfil.
   * @param perfil Objeto Perfil a eliminar.
   */
  removerPerfil(perfil: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {
      headers: headers,
      body: perfil
    };
    return this.http.delete('/IPABESB/rest/perfiles/bajaPerfil', options);
  }

  getArbol(idPerfil: number): Observable<any> {
    return this.http.get(`/IPABESB/rest/perfiles/consultaArbol?idPerfil=${idPerfil}`);
  }

  /**
   * Servicio para la actualización de un perfil
   * @param permisos
   */
  altaUpdatePermiso(permisos: IActualizarPermiso): Observable<any> {
    return this.http.post<IActualizarPermiso>('/IPABESB/rest/perfiles/altaPermiso', permisos);
  }
}
