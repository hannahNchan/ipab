import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoCambioService {
  host: string;
  constructor(private http: HttpClient) {
    this.host = `${window.location.protocol}//${window.location.host}`;
    this.host.toString();
  }
  /**
   * Obtiene hola mundo.
   */
  getHolaMundo(): Observable<any> {
    return this.http.get(`/TipoCambioESB/rest/tipocambio/hola`);
  }
}
