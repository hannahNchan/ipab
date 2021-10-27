import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperacionesPasivasService {

  constructor(private http: HttpClient) { }
  /**
     * Obtiene los catalogos de pasivas.
     */
  getCatalogos(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/catalogosPasivas?orden=DA`);
  }
  /**
     * Obtiene los clientes.
     * @param cliente
     * @param nombre
     * @param apellidoPat
     * @param apellidoMat
     */
  getClientes(cliente: string, nombre: string, apellidoPat: string, apellidoMat: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/clientes?cliente=${cliente}&nombre=${nombre}&apellidoMat=${apellidoMat}&apellidoPat=${apellidoPat}`);
  }
  /**
     * Obtiene un cliente.
     * @param cliente
     */
  getCliente(cliente: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/cliente?cliente=${cliente}`);
  }

  /**
    * Obtiene los patrimoniales.
    * @param fecha
    * @param cliente
    * @param cuenta
    * @param inversion
    */
  getPatrimoniales(fecha: string, cliente: string, cuenta: string, inversion: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/patrimoniales?fechaReporte=${fecha}&numeroCliente=${cliente}&numeroCuenta=${cuenta}&numeroInversion=${inversion}`);
  }
  /**
    * Obtiene un patrimonial.
    * @param cliente
    * @param cuenta
    * @param fecha
    */
  getPatrimonial(cliente: string, cuenta: string, fecha: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/patrimonial?cliente=${cliente}&cuenta=${cuenta}&fechaReporte=${fecha}`);
  }
  /**
    * Obtiene los clientes y cuentas.
    * @param fecha
    * @param cliente
    * @param cuenta
    */
  getClientesCuentas(fecha: string, cliente: string, cuenta: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/cuentas?fechaReporte=${fecha}&numeroCliente=${cliente}&numeroCuenta=${cuenta}`);
  }
  /**
    * Obtiene un cliente y cuenta.
    * @param fecha
    * @param cliente
    * @param cuenta
    */
  getClienteCuenta(fecha: string, cliente: string, cuenta: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/cuenta?fechaReporte=${fecha}&numeroCliente=${cliente}&numeroCuenta=${cuenta}`);
  }
  /**
   * Obtiene los bloqueos.
    * @param fecha
    * @param cliente
    * @param bloqueo
   */
  getBloqueos(fecha: string, cliente: string, bloqueo: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/bloqueos?fechaReporte=${fecha}&numeroCuenta=${cliente}&numeroBloqueo=${bloqueo}`);
  }
  /**
   * Obtiene bloqueo.
   * @param cuenta
   * @param bloqueo
   */
  getBloqueo(cuenta: string, bloqueo: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/bloqueo?cuenta=${cuenta}&bloqueo=${bloqueo}`);
  }

  /**
    * Obtiene los patrimoniales.
    * @param cliente
    * @param nombre
    * @param apellidoPat
    * @param apellidoMat
    */
  getCierres(cliente: string, nombre: string, apellidoPat: string, apellidoMat: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/cierreCuentas?cliente=${cliente}&nombre=${nombre}&apellidoMat=${apellidoMat}&apellidoPat=${apellidoPat}`);
  }
}
