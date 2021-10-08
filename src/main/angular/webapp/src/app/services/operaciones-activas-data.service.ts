import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperacionesActivasDataService {

  selectedTable2b: Observable<any>;

  private selectedTable2bSource$ = new BehaviorSubject({});

  constructor() {
    this.selectedTable2b = this.selectedTable2bSource$.asObservable();
  }

  /**
   * Servicio local para cambiar el id de aseguradora activo
   * @param table2
   */
  changeSelectedTable2b(table2: {}): void {
    this.selectedTable2bSource$.next(table2);
  }
}
