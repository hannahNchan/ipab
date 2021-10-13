import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBloqueo } from '@interfaces/operaciones-pasivas.interface';

@Injectable({
  providedIn: 'root'
})
export class OperacionesPasivasDataService {
  selectedBloqueo: Observable<any>;

  private selectedBloqueoSource$ = new BehaviorSubject({});

  constructor() {
    this.selectedBloqueo = this.selectedBloqueoSource$.asObservable();
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de bloqueo
   * @param bloqueo
   */
  changeSelectedBloqueo(bloqueo: IBloqueo): void {
    this.selectedBloqueoSource$.next(bloqueo);
  }
}
