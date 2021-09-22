import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioDataService {

  selectedIdPerfil: Observable<any>;

  private selectedIdPerfilSource$ = new BehaviorSubject(0);

  constructor() {
    this.selectedIdPerfil = this.selectedIdPerfilSource$.asObservable();
  }

  /**
   * Servicio local para cambiar el id de aseguradora activo
   * @param idAseguradora
   */
  changeSelectedIdPerfil(idPerfil: number): void {
    this.selectedIdPerfilSource$.next(idPerfil);
  }
}
