import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IModulo, ISeccion } from '@interfaces/seccion-modulo.interface';

@Injectable({
  providedIn: 'root'
})
export class SeccionesModulosService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene las secciones por nombre, vacio todos.
   * @param nombre
   */
  getSecciones(nombre: String): Observable<any> {
    return this.http.get(`/IPABESB/rest/seccion-modulo-facultad/consulta-secciones?nombre=${nombre}`);
  }

  /**
   * Obtiene los perfiles.
   * @param idEmpresa
   * @param idSeccion
   */
  getSeccion(idSeccion: number): Observable<any> {
    return this.http.get(`/IPABESB/rest/seccion-modulo-facultad/consulta-seccion?idSeccion=${idSeccion}`);
  }

  /**
   * Servicio para la alta seccion
   * @param seccion
   */
  editaSeccion(seccion: any): Observable<any> {
    return this.http.post<ISeccion>('/IPABESB/rest/seccion-modulo-facultad/Seccion', seccion);
  }

  /**
   * Servicio para la alta seccion
   * @param seccion
   */
  altaSeccion(seccion: any): Observable<any> {
    return this.http.post<ISeccion>('/IPABESB/rest/seccion-modulo-facultad/Seccion', seccion);
  }

  /**
   * realiza la baja de un perfil.
   * @param seccion Objeto Perfil a eliminar.
   */
  removerSeccion(seccion: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {
      headers: headers,
      body: seccion
    };
    return this.http.delete('/IPABESB/rest/seccion-modulo-facultad/bajaSeccion', options);
  }

  /**
   * Obtiene los perfiles.
   * @param idEmpresa
   * 
   */
  getModulos(idSeccion: number): Observable<any> {
    return this.http.get(`/IPABESB/rest/seccion-modulo-facultad/consulta-modulos?idSeccion=${idSeccion}`);
  }

  /**
   * Obtiene los perfiles.
   * @param idModulo
   */
  getModulo(idModulo: number): Observable<any> {
    return this.http.get(`/IPABESB/rest/seccion-modulo-facultad/consulta-modulo?idModulo=${idModulo}`);
  }

  /**
   * Servicio para la alta modulo
   * @param modulo
   */
  altaModulo(modulo: any): Observable<any> {
    return this.http.post<IModulo>('/IPABESB/rest/seccion-modulo-facultad/Modulo', modulo);
  }

  /**
   * Servicio para la edita modulo
   * @param modulo
   */
  editaModulo(modulo: any): Observable<any> {
    return this.http.post<IModulo>('/IPABESB/rest/seccion-modulo-facultad/Modulo', modulo);
  }

  /**
   * realiza la baja de un perfil.
   * @param modulo Objeto Perfil a eliminar.
   */
  removerModulo(modulo: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {
      headers: headers,
      body: modulo
    };
    return this.http.delete('/IPABESB/rest/seccion-modulo-facultad/bajaModulo', options);
  }
}
