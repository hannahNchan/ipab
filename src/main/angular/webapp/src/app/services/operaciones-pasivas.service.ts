import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperacionesPasivasService {

  constructor(private http: HttpClient) { }
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
    * @param cliente
    * @param nombre
    * @param apellidoPat
    * @param apellidoMat
    */
  getPatrimoniales(cliente: string, nombre: string, apellidoPat: string, apellidoMat: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/patrimoniales?cliente=${cliente}&nombre=${nombre}&apellidoMat=${apellidoMat}&apellidoPat=${apellidoPat}`);
  }
  /**
    * Obtiene un patrimonial.
    * @param cliente
    * @param cuenta
    */
  getPatrimonial(cliente: string, cuenta: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/patrimonial?cliente=${cliente}&cuenta=${cuenta}`);
  }
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

  /**
    * Obtiene los patrimoniales.
    * @param fechaReporte
    * @param numeroCliente
    * @param numeroCuenta
    */
  getCierres(fechaReporte: string, numeroCliente: string, numeroCuenta: string): Observable<any> {
    console.log(`/IPABESB/rest/pasivas/cierreCuentas?fechaReporte=${fechaReporte}&numeroCliente=${numeroCliente}&numeroCuenta=${numeroCuenta}`)
    return this.http.get(`/IPABESB/rest/pasivas/cierreCuentas?fechaReporte=${fechaReporte}&numeroCliente=${numeroCliente}&numeroCuenta=${numeroCuenta}`);
  }

    /**
    * Obtiene los exceptuados IPAB.
    * @param fechaReporte
    * @param numeroCliente
    */
  getExceptuadosIPAB(fechaReporte: string, numeroCliente: string): Observable<any> {
    console.log(`/IPABESB/rest/pasivas/exceptuados?fechaReporte=${fechaReporte}=&cliente=${numeroCliente}`)
    return this.http.get(`/IPABESB/rest/pasivas/exceptuados?fechaReporte=${fechaReporte}=&cliente=${numeroCliente}`);
  }
}
