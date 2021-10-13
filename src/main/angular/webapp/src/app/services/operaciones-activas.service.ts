import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperacionesActivasService {

  constructor(private http: HttpClient) { }

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
  getTabla4B(fecha: String, cliente: String, credito: String): Observable<any> {
    return this.http.get(`/IPABESB/rest/activas/tabla4B?fecha=${fecha}&cliente=${cliente}&credito=${credito}`);
  }

  /**
   * Obtiene los creditos vencidos de los titulares.
   * @param numeroCredito
   * @param fecha
   * @param cliente
   *
   */
  getTabla2B(fecha: String, cliente: String, numeroCredito: String): Observable<any> {
    return this.http.get(`/IPABESB/rest/activas/tabla2B?fecha=${fecha}&cliente=${cliente}&credito=${numeroCredito}`);
  }
}
