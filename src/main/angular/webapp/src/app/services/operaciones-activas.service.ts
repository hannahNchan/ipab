import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ITabla4, ITabla5, ITabla1, ITabla2, ITabla4B} from '@interfaces/operaciones-activas.interface';

@Injectable({
  providedIn: 'root'
})
export class OperacionesActivasService {

  constructor(private http: HttpClient) {
  }

  /**
   * Obtiene los creditos vencidos de los titulares.
   * @param numeroCredito
   * @param fecha
   *
   */
  getTabla4(fecha: String, numeroCredito: String): Observable<any> {
    return this.http.get(`/IPABESB/rest/activas/tabla4?fecha=${fecha}&credito=${numeroCredito}`);
  }

  /**
   * Obtiene los creditos vencidos de los titulares.
   * @param numeroCredito
   * @param fecha
   *
   */
  getTabla5(fecha: String, cliente: String, numeroCredito: String): Observable<any> {
    return this.http.get(`/IPABESB/rest/activas/tabla5?fecha=${fecha}&cliente=${cliente}&credito=${numeroCredito}`);
  }

  /**
   * Obtiene los creditos vencido de los titulares (vivienda).
   * @param fecha
   * @param cliente
   * @param numeroCredito
   *
   */
  getTabla1B(fecha: String, cliente: String, numeroCredito: String): Observable<any> {
    return this.http.get(`/IPABESB/rest/activas/tabla1B?fecha=${fecha}&cliente=${cliente}&credito=${numeroCredito}`);
  }

  /**
   * Obtiene los creditos vencido de los titulares (comercial).
   * @param fecha
   * @param cliente
   * @param numeroCredito
   *
   */
  getTabla2B(fecha: String, cliente: String, numeroCredito: String): Observable<any> {
    return this.http.get(`/IPABESB/rest/activas/tabla2B?fecha=${fecha}&cliente=${cliente}&credito=${numeroCredito}`);
  }

  /**
   * Obtiene los creditos vencidos de los titulares consumo (no revolvente).
   * @param fecha
   * @param cliente
   * @param numeroCredito
   *
   */
  getTabla4B(fecha: String, cliente: String, numeroCredito: String): Observable<any> {
    return this.http.get(`/IPABESB/rest/activas/tabla4B?fecha=${fecha}&cliente=${cliente}&credito=${numeroCredito}`);
  }

  /**
   * Servicio para actualizar tabla 4A
   * @param tabla
   */
  updateTabla4A(tabla: ITabla4): Observable<any> {
    return this.http.put<ITabla4>('/IPABESB/rest/activas/updateTabla4A', tabla);
  }

  /**
   * Servicio para actualizar tabla 5A
   * @param tabla
   */
  updateTabla5A(tabla: ITabla5): Observable<any> {
    return this.http.put<ITabla5>('/IPABESB/rest/activas/updateTabla5A', tabla);
  }

  /**
   * Servicio para actualizar tabla 1B
   * @param tabla
   */
  updateTabla1B(tabla: ITabla1): Observable<any> {
    return this.http.put<ITabla1>('/IPABESB/rest/activas/updateTabla1B', tabla);
  }

  /**
   * Servicio para actualizar tabla 2B
   * @param tabla
   */
  updateTabla2B(tabla: ITabla2): Observable<any> {
    return this.http.put<ITabla2>('/IPABESB/rest/activas/updateTabla2B', tabla);
  }

  /**
   * Servicio para actualizar tabla 4B
   * @param tabla
   */
  updateTabla4B(tabla: ITabla4B): Observable<any> {
    return this.http.put<ITabla4B>('/IPABESB/rest/activas/updateTabla4B', tabla);
  }
}
