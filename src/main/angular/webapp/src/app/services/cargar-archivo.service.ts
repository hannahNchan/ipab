import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CargarArchivoService {
  host: string;

  constructor(private http: HttpClient) {
    this.host = `${window.location.protocol}//${window.location.host}`;
    this.host.toString();
  }

  /**
   * Ejecuta el sp de carga
   */
  executeSpLoadData(fecha: string, layout: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/archivost24/cargar-archivo?fecha=${fecha}&layout=${layout}`);
  }

  /**
   * Obtener catalogo tipo archivo
   */
  getCatalogoTipoArchivoLayout(): Observable<any> {
    return this.http.get(
      `/IPABESB/rest/catalogo/consultar?tipoCatalogo=TipoArchivoLayout`
    );
  }
}
