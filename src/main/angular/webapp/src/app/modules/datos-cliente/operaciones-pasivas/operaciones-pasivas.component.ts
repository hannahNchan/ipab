import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { AltaModificacionComponent } from './modals/alta-modificacion/alta-modificacion.component';
import { EdicionPatrimonialComponent } from './modals/edicion-patrimonial/edicion-patrimonial.component';

import { AltaModificarBloqueoModalComponent } from './modals/alta-modificar-bloqueo/alta-modificar-bloqueo.modal.component';
import { AltaModificarCierreModalComponent } from './modals/alta-modificar-cierre/alta-modificar-cierre.modal.component';
import { AltaModificarDuplicadoModalComponent } from './modals/alta-modificar-duplicado/alta-modificar-duplicado.modal.component';
import { AltaEditarCuentaComponent } from './alta-editar-cuenta/alta-editar-cuenta.component';
//import { AltaUsuarioModalComponent } from '@modules/sistema/usuarios/modals/alta-usuarios/alta-usuarios.modal.component';

@Component({
  selector: 'app-operaciones-pasivas',
  templateUrl: './operaciones-pasivas.component.html',
  styleUrls: ['./operaciones-pasivas.component.scss']
})
export class OperacionesPasivasComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


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


  openModalAltaBloqueo(): void {
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarBloqueoModalComponent, ngbModalOptions)
  }

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

  openModalAltaCierre(): void {
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarCierreModalComponent, ngbModalOptions)
  }

}
