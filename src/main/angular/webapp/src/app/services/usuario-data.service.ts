import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDataService {

  selectedIdUsuario: Observable<any>;

  private selectedIdUsuarioSource$ = new BehaviorSubject(0);

  constructor() {
    this.selectedIdUsuario = this.selectedIdUsuarioSource$.asObservable();
  }

  /**
   * Servicio local para cambiar el id de aseguradora activo
   * @param idUsuario
   */
  changeSelectedIdUsuario(idUsuario: number): void {
    this.selectedIdUsuarioSource$.next(idUsuario);
  }
}
