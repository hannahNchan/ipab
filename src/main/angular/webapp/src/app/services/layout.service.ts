import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  host: string;

  constructor(private http: HttpClient) {
    this.host = `${window.location.protocol}//${window.location.host}`;
    this.host.toString();
  }

  /**
   * Ejecuta el sp de layout
   */
  executeSpLayout(fecha: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/layout/layout?fecha=${fecha}`);
  }
}