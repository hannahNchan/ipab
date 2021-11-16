import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBloqueo, ICliente, IPatrimonial, IClienteCuentas, ICatalogoGenerico, IExceptuados } from '@interfaces/operaciones-pasivas.interface';

@Injectable({
  providedIn: 'root'
})
export class OperacionesPasivasDataService {
  catalogos: Observable<any>;
  selectedBloqueo: Observable<any>;
  selectedCliente: Observable<any>;
  selectedPatrimonial: Observable<any>;
  selectedClienteCuenta: Observable<any>;
  selectedExceptuado: Observable<any>;
  fechaReporte: Observable<any>;


  private catalogosSource$ = new BehaviorSubject({});
  private selectedBloqueoSource$ = new BehaviorSubject({});
  private selectedClienteSource$ = new BehaviorSubject({});
  private selectedPatrimonialSource$ = new BehaviorSubject({});
  private selectedClienteCuentaSource$ = new BehaviorSubject({});
  private selectedExceptuadoSource$ = new BehaviorSubject({});
  private fechaReporteSource$ = new BehaviorSubject({});



  constructor() {
    this.catalogos = this.catalogosSource$.asObservable();
    this.selectedBloqueo = this.selectedBloqueoSource$.asObservable();
    this.selectedCliente = this.selectedClienteSource$.asObservable();
    this.selectedPatrimonial = this.selectedPatrimonialSource$.asObservable();
    this.selectedClienteCuenta = this.selectedClienteCuentaSource$.asObservable();
    this.selectedExceptuado = this.selectedExceptuadoSource$.asObservable();
    this.fechaReporte = this.fechaReporteSource$.asObservable();
  }

  /**
   * Serviciolocal para guardar los catalogos
   * @param catalogos
   */
  saveCatalogos(catalogos: ICatalogoGenerico): void {
    this.catalogosSource$.next(catalogos);
  }

  /**
     * Serviciolocal para guardar la fecha
     * @param fecha
     */
  saveFechaReporte(fecha: string): void {
    this.fechaReporteSource$.next(fecha);
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de bloqueo
   * @param bloqueo
   */
  changeSelectedBloqueo(bloqueo: IBloqueo): void {
    this.selectedBloqueoSource$.next(bloqueo);
  }

  /**
  * Serviciolocal para cambiar el cliente seleccionado
  * @param cliente
  */
  changeSelectedCliente(cliente: ICliente): void {
    this.selectedClienteSource$.next(cliente);
  }

  /**
  * Serviciolocal para cambiar el patrimonial seleccionado
  * @param patrimonial
  */
  changeSelectedPatrimonial(patrimonial: IPatrimonial): void {
    this.selectedPatrimonialSource$.next(patrimonial);
  }

  /**
 * Serviciolocal para cambiar el clienteCuenta seleccionado
 * @param clienteCuenta
 */
  changeSelectedClienteCuenta(clienteCuenta: IClienteCuentas): void {
    this.selectedClienteCuentaSource$.next(clienteCuenta);
  }

  /**
 * Serviciolocal para cambiar el exceptuado seleccionado
 * @param exceptuado
 */
  changeSelectedExceptuado(exceptuado: IExceptuados): void {
    this.selectedExceptuadoSource$.next(exceptuado);
  }
}
