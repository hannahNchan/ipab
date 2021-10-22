import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBloqueo, ICliente, IPatrimonial } from '@interfaces/operaciones-pasivas.interface';

@Injectable({
  providedIn: 'root'
})
export class OperacionesPasivasDataService {
  selectedBloqueo: Observable<any>;
  selectedCliente: Observable<any>;
  selectedPatrimonial: Observable<any>;


  private selectedBloqueoSource$ = new BehaviorSubject({});
  private selectedClienteSource$ = new BehaviorSubject({});
  private selectedPatrimonialSource$ = new BehaviorSubject({});


  constructor() {
    this.selectedBloqueo = this.selectedBloqueoSource$.asObservable();
    this.selectedCliente = this.selectedClienteSource$.asObservable();
    this.selectedPatrimonial = this.selectedPatrimonialSource$.asObservable();
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
}
