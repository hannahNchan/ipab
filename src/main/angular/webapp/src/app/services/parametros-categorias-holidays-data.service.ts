import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICategoria, IParametro, ICalendario } from '@interfaces/parametros-categorias-holidays.interface';

@Injectable({
  providedIn: 'root'
})
export class ParametrosCategoriasHolidaysDataService {
  selectedParametro: Observable<any>;
  selectedCategoria: Observable<any>;
  selectedCalendario: Observable<any>;

  private selectedParametroSource$ = new BehaviorSubject({});
  private selectedCategoriaSource$ = new BehaviorSubject({});
  private selectedCalendarioSource$ = new BehaviorSubject({});

  constructor() {
    this.selectedParametro = this.selectedParametroSource$.asObservable();
    this.selectedCategoria = this.selectedCategoriaSource$.asObservable();
    this.selectedCalendario = this.selectedCalendarioSource$.asObservable();
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de parametro
   * @param parametro
   */
  changeSelectedParametro(parametro: IParametro): void {
    this.selectedParametroSource$.next(parametro);
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de categoria
   * @param categoria
   */
  changeSelectedCategoria(categoria: ICategoria): void {
    this.selectedCategoriaSource$.next(categoria);
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de calendario
   * @param calendario
   */
  changeSelectedCalendario(calendario: ICalendario): void {
    this.selectedCalendarioSource$.next(calendario);
  }
}
