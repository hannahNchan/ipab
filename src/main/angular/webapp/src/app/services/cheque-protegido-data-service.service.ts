import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { IParametro } from "@interfaces/cheque-protegido.interface";

@Injectable({
  providedIn: 'root'
})
export class ChequeProtegidoDataServiceService {

  parametros: Observable<IParametro[]>;
  parametro: Observable<IParametro>;
  file: Observable<any>;

  private parametrosSource$ = new BehaviorSubject(null);
  private parametroSource$ = new BehaviorSubject(null);
  private fileSource$ = new BehaviorSubject(null);
  constructor() {
    this.parametros = this.parametrosSource$.asObservable();
    this.parametro = this.parametroSource$.asObservable();
    this.file = this.fileSource$.asObservable();
  }
  /**
   * Servicio local para pasar parametros entre pantallas.
   * @param parametros
   */
  pasaParametetros( parametros: IParametro[] ): void {
    this.parametrosSource$.next( parametros );
  }
  /**
   * Servicio local para pasar parametro a modificar.
   * @param parametros
   */
  pasaParametro( parametro: IParametro ): void {
    this.parametroSource$.next( parametro );
  }
  /**
   * Servicio local para pasar archivo entre pantallas.
   * @param file
   */
  pasaFile( file: any ): void {
    this.fileSource$.next( file );
  }
}
