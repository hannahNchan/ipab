import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ICalendario, ICategoria, IParametro, ICatalogoNivelCuenta, ICatalogoClasificacion} from "@interfaces/parametros-categorias-holidays.interface";

@Injectable({
  providedIn: 'root'
})
export class ParametrosCategoriasHolidaysService {

  host: string;
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de parametros.
   * @param tipoParametro
   * @param idParametro
   */
  getListaParametros(tipoParametro: string, idParametro: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/param/parametros?tipoParametro=${tipoParametro}&idParametro=${idParametro}`);
  }

  /**
   * Obtiene la lista de categorias.
   * @param categoria
   */
  getListaCategorias(categoria: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/param/categorias?categoria=${categoria}`);
  }

  /**
   * Obtiene la lista de calendario.
   * @param anio
   */
  getListaCalendario(anio: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/param/calendario?anio=${anio}`);
  }

  /**
   * realiza la baja de un parametro.
   * @param parametro Objeto Parametro a eliminar.
   */
  removerParametro(parametro: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {
      headers: headers,
      body: parametro
    };
    return this.http.delete('/IPABESB/rest/param/deleteParametro', options);
  }

  /**
   * realiza la baja de un categoria.
   * @param categoria Objeto categoria a eliminar.
   */
  removerCategoria(categoria: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {
      headers: headers,
      body: categoria
    };
    return this.http.delete('/IPABESB/rest/param/deleteCategoria', options);
  }

  /**
   * realiza la baja de un calendario.
   * @param calendario Objeto Calendario a eliminar.
   */
  removerCalendario(calendario: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {
      headers: headers,
      body: calendario
    };
    return this.http.delete('/IPABESB/rest/param/deleteCalendario', options);
  }

  /**
   * Alta Parametro
   * @param uploadData
   */
  altaParametro(uploadData: IParametro): Observable<any> {
    return this.http.post<any>('/IPABESB/rest/param/altaParametro', uploadData);
  }

  /**
   * Alta Categoria
   * @param uploadData
   */
  altaCategoria(uploadData: ICategoria): Observable<any> {
    return this.http.post<any>('/IPABESB/rest/param/altaCategoria', uploadData);
  }

  /**
   * Alta Calendario
   * @param uploadData
   */
  altaCalendario(uploadData: ICalendario): Observable<any> {
    return this.http.post<any>('/IPABESB/rest/param/altaCalendario', uploadData);
  }

  /**
   * Actualiza Parametro
   * @param uploadData
   */
  updateParametro(uploadData: IParametro): Observable<any> {
    return this.http.put<any>('/IPABESB/rest/param/updateParametro', uploadData);
  }

  /**
   * Actualiza Categoria
   * @param uploadData
   */
  updateCategoria(uploadData: ICategoria): Observable<any> {
    return this.http.put<any>('/IPABESB/rest/param/updateCategoria', uploadData);
  }

  /**
   * Actualiza Calendario
   * @param uploadData
   */
  updateCalendario(uploadData: ICalendario): Observable<any> {
    return this.http.put<any>('/IPABESB/rest/param/updateCalendario', uploadData);
  }

  /**
   * Trae Catalogo por clasficacion
   */
  getCatalogoClasificacion(): Observable<any> {
    return this.http.get<any>('/IPABESB/rest/catalogo/CLASIFICACION');
  }

  /**
   * Trae Catalogo por nivel cuenta 
   */
  getCatalogoNivelCuenta(): Observable<any> {
    return this.http.get<any>('/IPABESB/rest/catalogo/NIVEL_CUENTA');
  }
}

