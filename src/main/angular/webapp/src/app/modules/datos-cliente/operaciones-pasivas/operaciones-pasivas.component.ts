import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import { AltaModificacionComponent } from './modals/alta-modificacion/alta-modificacion.component';
import { EdicionPatrimonialComponent } from './modals/edicion-patrimonial/edicion-patrimonial.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { AltaModificarBloqueoModalComponent } from './modals/alta-modificar-bloqueo/alta-modificar-bloqueo.modal.component';
import { AltaModificarDuplicadoModalComponent } from './modals/alta-modificar-duplicado/alta-modificar-duplicado.modal.component';
import { AltaEditarCuentaComponent } from './alta-editar-cuenta/alta-editar-cuenta.component';
import { AltaUsuarioModalComponent } from '@modules/sistema/usuarios/modals/alta-usuarios/alta-usuarios.modal.component';

@Component({
  selector: 'app-operaciones-pasivas',
  templateUrl: './operaciones-pasivas.component.html',
  styleUrls: ['./operaciones-pasivas.component.scss']
})
export class OperacionesPasivasComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  /**
   * Abre el modal para la alta de usuario
   */
  openModalAltaCuenta(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
    };
    this.modalService.open(AltaEditarCuentaComponent, ngbModalOptions).result.then();
  }

  /**
   * Abre el modal para modificarperfil.
   */
  openModalEditarCuenta(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      windowClass: 'modal-md'
    };
    this.modalService.open(AltaEditarCuentaComponent, ngbModalOptions).result.then();
  }

  /**
  * Abre el modal para dar de alta seccion.
  */
  openModalAltaBloqueo(): void {
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarBloqueoModalComponent, ngbModalOptions)
  }
  /**
  * Abre el modal para dar de alta seccion.
  */
  openModalAltDuplicado(): void {
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarDuplicadoModalComponent, ngbModalOptions)
  }

  openModalAltaModificacion(): void {
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificacionComponent, ngbModalOptions);
  }

  openModalPatrimonial(): void {
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(EdicionPatrimonialComponent, ngbModalOptions);
  }

}
