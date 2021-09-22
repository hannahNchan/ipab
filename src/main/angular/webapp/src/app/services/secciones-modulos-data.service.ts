import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeccionesModulosDataService {

  nombreUsuario: Observable<any>;
  selectedIdSeccion: Observable<any>;
  idUsuario: Observable<any>;
  selectedIdModulo: Observable<any>;

  private nombreUsuarioSource$ = new BehaviorSubject('');
  private selectedIdSeccionSource$ = new BehaviorSubject(0);
  private idUsuarioSource$ = new BehaviorSubject(0);
  private selectedIdModuloSource$ = new BehaviorSubject(0);

  constructor() {
    this.nombreUsuario = this.nombreUsuarioSource$.asObservable();
    this.selectedIdSeccion = this.selectedIdSeccionSource$.asObservable();
    this.idUsuario = this.idUsuarioSource$.asObservable();
    this.selectedIdModulo = this.selectedIdModuloSource$.asObservable();
  }

  /**
   * Servicio local para cambiar un nombre de usuario activo
   * @param nombreUsuario
   */
  changeNombreUsuario(nombreUsuario: string): void {
    this.nombreUsuarioSource$.next(nombreUsuario);
  }

  /**
   * Servicio local para cambiar el id de aseguradora activo
   * @param idSeccion
   */
  changeSelectedIdSeccion(idSeccion: number): void {
    this.selectedIdSeccionSource$.next(idSeccion);
  }

  changeIdUsuario(idUsuario: number): void {
    this.idUsuarioSource$.next(idUsuario);
  }

  /**
   * Servicio local para cambiar el id de aseguradora activo
   * @param idModulo
   */
  changeSelectedIdModulo(idModulo: number): void {
    this.selectedIdModuloSource$.next(idModulo);
  }
}
