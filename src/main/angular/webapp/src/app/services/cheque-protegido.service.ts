import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChequeProtegidoProcesarArchivo, IPassword } from "@interfaces/cheque-protegido.interface";
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChequeProtegidoService {
  host: string;
  constructor(private http: HttpClient) {
    this.host = `${window.location.protocol}//${window.location.host}`;
    this.host.toString();
  }
  /**
   * Llama al servicio que haga el update de un archivo.
   * @param uploadArchivo
   */
  updateArchivo(uploadData: FormData): Observable<any> {
    return this.http.post( '/ChequeProtegidoESB/rest/chequeProtegido/uploadArchivo', uploadData);
  }
  /**
   * Llama al servicio que haga el reprocesar de un archivo.
   * @param cheque
   */
  procesarArchivo(cheque: IChequeProtegidoProcesarArchivo): Observable<any> {
    return this.http.post<IChequeProtegidoProcesarArchivo>('/ChequeProtegidoESB/rest/chequeProtegido/procesarArchivo', cheque);
  }
  /**
   * Llama al servicio que actualiza parametro.
   * @param parametro
   */
  updateParametro(parametro: any): Observable<any> {
    return this.http.put<any>('/ChequeProtegidoESB/rest/chequeProtegido/parametro', parametro);
  }
  /**
   * Obtiene la lista de Parametros del archivo.
   */
  getParametros(): Observable<any> {
    return this.http.get(`/ChequeProtegidoESB/rest/chequeProtegido/parametros`);
  }
  /**
   * Llama al servicio de cambio de contraseña.
   * @param password
   */
  updatePassword(password: IPassword): Observable<any> {
    return this.http.post<IPassword>('/ChequeProtegidoESB/rest/chequeProtegido/password', password);
  }
  /**
   * Obtiene la lista de Parametros del archivo.
   */
  getPassDes(idTipoParametro: any): Observable<any> {
    return this.http.get(`/ChequeProtegidoESB/rest/chequeProtegido/passwordDes?idTipoParametro=${idTipoParametro}`);
  }
}
