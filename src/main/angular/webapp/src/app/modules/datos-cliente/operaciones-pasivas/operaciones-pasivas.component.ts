import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';

import { IBloqueo } from '@interfaces/operaciones-pasivas.interface';

import { AltaModificarExceptuadosComponent } from '@modules/datos-cliente/operaciones-pasivas/modals/alta-modificar-exceptuados/alta-modificar-exceptuados.component';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';

import { AltaModificacionComponent } from './modals/alta-modificacion/alta-modificacion.component';
import { EdicionPatrimonialComponent } from './modals/edicion-patrimonial/edicion-patrimonial.component';

import { AltaModificarBloqueoModalComponent } from './modals/alta-modificar-bloqueo/alta-modificar-bloqueo.modal.component';
import { AltaModificarCierreModalComponent } from './modals/alta-modificar-cierre/alta-modificar-cierre.modal.component';
import { AltaModificarDuplicadoModalComponent } from './modals/alta-modificar-duplicado/alta-modificar-duplicado.modal.component';
import { AltaEditarCuentaComponent } from './alta-editar-cuenta/alta-editar-cuenta.component';
// import { AltaUsuarioModalComponent } from '@modules/sistema/usuarios/modals/alta-usuarios/alta-usuarios.modal.component';

@Component({
  selector: 'app-operaciones-pasivas',
  templateUrl: './operaciones-pasivas.component.html',
  styleUrls: ['./operaciones-pasivas.component.scss']
})
export class OperacionesPasivasComponent implements OnInit {

  bloqueosNumeroCliente: string;
  bloqueosNombreCliente: string;
  bloqueosApellidoPaterno: string;
  bloqueosApellidoMaterno: string;
  listaBloqueos: IBloqueo[];

  constructor(private modalService: NgbModal, private operacionesPasivasService: OperacionesPasivasService, private operacionesPasivasData$: OperacionesPasivasDataService) { }

  ngOnInit(): void {
    this.bloqueosNumeroCliente = '';
    this.bloqueosNombreCliente = '';
    this.bloqueosApellidoPaterno = '';
    this.bloqueosApellidoMaterno = '';
  }

  searchBloqueos(): void {
    // if (this.validaGuardar()) {
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.operacionesPasivasService.getBloqueos(this.bloqueosNumeroCliente, this.bloqueosNombreCliente, this.bloqueosApellidoPaterno, this.bloqueosApellidoMaterno).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          this.listaBloqueos = response['lista'];
          swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
    // }
  }

  openModalAltaExceptuados(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    };
    this.modalService.open(AltaModificarExceptuadosComponent, ngbModalOptions).result.then();
  }

  openModalEditarExceptuados(): void {
    // Dado que es una edición se da por hecho que habrá un Data$
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    };
    this.modalService.open(AltaModificarExceptuadosComponent, ngbModalOptions).result.then();
  }

  openModalAltaCuenta(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false
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

  openModalAltaBloqueo(bloqueo: IBloqueo): void {
    if (bloqueo !== undefined) {
      this.operacionesPasivasData$.changeSelectedBloqueo(bloqueo);
    } else {
      this.operacionesPasivasData$.changeSelectedBloqueo(undefined);
    }
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarBloqueoModalComponent, ngbModalOptions);
  }

  openModalAltDuplicado(): void {
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarDuplicadoModalComponent, ngbModalOptions);
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
    this.modalService.open(AltaModificarCierreModalComponent, ngbModalOptions);
  }

}
