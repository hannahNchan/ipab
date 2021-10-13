import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperacionesPasivasService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los bloqueos.
   * @param cliente
   * @param nombre
   * @param apellidoPat
   * @param apellidoMat
   */
  getBloqueos(cliente: string, nombre: string, apellidoPat: string, apellidoMat: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/bloqueos?cliente=${cliente}&nombre=${nombre}&apellidoMat=${apellidoMat}&apellidoPat=${apellidoPat}`);
  }
  /**
   * Obtiene bloqueo.
   * @param cuenta
   * @param bloqueo
   */
  getBloqueo(cuenta: string, bloqueo: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/bloqueo?cuenta=${cuenta}&bloqueo=${bloqueo}`);
  }
}
