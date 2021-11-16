import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    * Obtiene los catalogo de personalidad.
    */
  getCatalogoPersonalidad(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/PERSONALIDAD`);
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
     * Actualiza un cliente.
     * @param cliente
     */
  updateCliente(cliente: {}): Observable<any> {
    return this.http.put(`/IPABESB/rest/pasivas/updateCliente`, cliente);
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
     * Actualiza un patrimonial.
     * @param patrimonial
     */
  updatePatrimonial(patrimonial: {}): Observable<any> {
    return this.http.put(`/IPABESB/rest/pasivas/updatePatrimonial`, patrimonial);
  }
  /**
     * Nuevo un patrimonial.
     * @param patrimonial
     */
  newPatrimonial(patrimonial: {}): Observable<any> {
    return this.http.post(`/IPABESB/rest/pasivas/altaPatrimonial`, patrimonial);
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
     * Borra un ClienteCuenta.
     * @param clientecuenta
     */
  deleteClienteCuenta(clientecuenta: {}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const options = {
      headers: headers,
      body: clientecuenta
    };
    return this.http.delete(`/IPABESB/rest/pasivas/deleteCuenta`, options);
  }
  /**
     * Actualiza un clienteCuenta.
     * @param clienteCuenta
     */
  updateClienteCuenta(clienteCuenta: {}): Observable<any> {
    return this.http.put(`/IPABESB/rest/pasivas/updateCuenta`, clienteCuenta);
  }
  /**
     * Crea un clienteCuenta.
     * @param clienteCuenta
     */
  newClienteCuenta(clienteCuenta: {}): Observable<any> {
    return this.http.post(`/IPABESB/rest/pasivas/altaCuenta`, clienteCuenta);
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
     * Crea un bloqueo.
     * @param bloqueo
     */
  newBloqueo(bloqueo: {}): Observable<any> {
    return this.http.post(`/IPABESB/rest/pasivas/altaBloqueo`, bloqueo);
  }
  /**
     * Borra un bloqueo.
     * @param bloqueo
     */
  deleteBloqueo(bloqueo: {}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const options = {
      headers: headers,
      body: bloqueo
    };
    return this.http.delete(`/IPABESB/rest/pasivas/bajaBloqueo`, options);
  }
  /**
    * Obtiene los cierres.
    * @param fecha
    * @param cliente
    * @param cuenta
    */
  getCierres(fecha: string, cliente: string, cuenta: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/cierreCuentas?fechaReporte=${fecha}&numeroCliente=${cliente}&numeroCuenta=${cuenta}`);
  }
  /**
     * Crea un cierre.
     * @param cierre
     */
  newCierre(cierre: {}): Observable<any> {
    return this.http.post(`/IPABESB/rest/pasivas/altaCierreCuenta`, cierre);
  }
  /**
     * Borra un cierre.
     * @param cierre
     */
  deleteCierre(cierre: {}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const options = {
      headers: headers,
      body: cierre
    };
    return this.http.delete(`/IPABESB/rest/pasivas/deleteCierreCuenta`, options);
  }

  /**
    * Obtiene los exceptuados.
    * @param fecha
    * @param cliente
    */
  getExceptuados(fecha: string, cliente: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/exceptuados?fechaReporte=${fecha}&cliente=${cliente}`);
  }

  /**
    * Obtiene los exceptuados.
    * @param fecha
    * @param cliente
    */
  getExceptuado(fecha: string, cliente: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/pasivas/exceptuado?fechaReporte=${fecha}&cliente=${cliente}`);
  }

  /**
     * Actualiza un exceptuado.
     * @param exceptuado
     */
  updateExceptuado(exceptuado: {}): Observable<any> {
    return this.http.put(`/IPABESB/rest/pasivas/updateExceptuados`, exceptuado);
  }

  /**
     * Crea un exceptuado.
     * @param exceptuado
     */
  newExceptuado(exceptuado: {}): Observable<any> {
    return this.http.post(`/IPABESB/rest/pasivas/altaExceptuados`, exceptuado);
  }

  /**
     * Borra un cierre.
     * @param cierre
     */
  deleteExceptuado(cierre: {}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const options = {
      headers: headers,
      body: cierre
    };
    return this.http.delete(`/IPABESB/rest/pasivas/deleteExceptuados`, options);
  }
}
