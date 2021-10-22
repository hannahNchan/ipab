import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperacionesActivasDataService {

  selectedTable2b: Observable<any>;
  selectedTable4b: Observable<any>;

  private selectedTable2bSource$ = new BehaviorSubject({});
  private selectedTable4bSource$ = new BehaviorSubject({});

  constructor() {
    this.selectedTable2b = this.selectedTable2bSource$.asObservable();
    this.selectedTable4b = this.selectedTable4bSource$.asObservable();
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de la tabla 2B
   * @param table2
   */
  changeSelectedTable2b(table2: {}): void {
    this.selectedTable2bSource$.next(table2);
  }
  /**
   * Servicio local para cambiar el objeto seleccionado de la tabla 4B
   * @param table2
   */
  changeSelectedTable4b(table4: {}): void {
    this.selectedTable4bSource$.next(table4);
  }
}
