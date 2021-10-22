import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';

import { IBloqueo, ICliente, IPatrimonial, ICierreCuentas } from '@interfaces/operaciones-pasivas.interface';

import { AltaModificarExceptuadosComponent } from '@modules/datos-cliente/operaciones-pasivas/modals/alta-modificar-exceptuados/alta-modificar-exceptuados.component';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';

import { AltaModificacionClienteComponent } from './modals/alta-modificacion-cliente/alta-modificacion-cliente.component';
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
  selectedBloqueo: string;
  numeroCliente: string;
  nombreCliente: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  selectedCliente: number;
  patrimonialNumeroCliente: string;
  patrimonialNombreCliente: string;
  patrimonialApellidoPaterno: string;
  patrimonialApellidoMaterno: string;
  selectedPatrimonial: number;
  cierreCuentasNumeroCliente: string;
  cierreCuentasNombreCliente: string;
  cierreCuentasApellidoPaterno: string;
  cierreCuentasApellidoMaterno: string;
  selectedCierre: string;
  listaBloqueos: IBloqueo[];
  listaClientes: ICliente[];
  listaPatrimonial: IPatrimonial[];
  listaCierreCuentas: ICierreCuentas[];


  constructor(private modalService: NgbModal, private operacionesPasivasService: OperacionesPasivasService, private operacionesPasivasData$: OperacionesPasivasDataService) { }

  ngOnInit(): void {
    this.bloqueosNumeroCliente = '';
    this.bloqueosNombreCliente = '';
    this.bloqueosApellidoPaterno = '';
    this.bloqueosApellidoMaterno = '';
    this.selectedBloqueo = null;
    this.numeroCliente = '';
    this.nombreCliente = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.selectedCliente = null;
    this.patrimonialNumeroCliente = '';
    this.patrimonialNombreCliente = '';
    this.patrimonialApellidoPaterno = '';
    this.patrimonialApellidoMaterno = '';
    this.selectedPatrimonial = null;
    this.cierreCuentasNumeroCliente = '';
    this.cierreCuentasNombreCliente = '';
    this.cierreCuentasApellidoPaterno = '';
    this.cierreCuentasApellidoMaterno = '';
    this.selectedCierre = null;

  }

  searchBloqueos(): void {
    this.listaBloqueos = []
    this.selectedBloqueo = null;
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
          if (response["lista"].length <= 100) {
            this.listaBloqueos = response['lista'];
            swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
          }
          else {
            swal(PopUpMessage.getAppErrorMessage('Ocurrio un error', 'La busqueda regreso demasiadas coincidencias')).then();
          }
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
    // }
  }

  selectBloqueo(index): void {
    this.selectedBloqueo = index;
  }

  onClickEliminarBloqueo(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success btn-lg mx-3',
      cancelButtonClass: 'btn btn-danger btn-lg mx-3',
      buttonsStyling: false
    });
    swalWithBootstrapButtons({
      title: '¿Desea eliminar el bloqueo seleccionado?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {

    });
  }

  searchClientes(): void {
    // if (this.validaGuardar()) {
    this.listaClientes = []
    this.selectedCliente = null;
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.operacionesPasivasService.getClientes(this.numeroCliente, this.nombreCliente, this.apellidoPaterno, this.apellidoMaterno).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          if (response["lista"].length <= 100) {
            this.listaClientes = response['lista'];
            swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
          }
          else {
            swal(PopUpMessage.getAppErrorMessage('Ocurrio un error', 'La busqueda regreso demasiadas coincidencias')).then();
          }
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
    // }
  }

  selectClient(index): void {
    this.selectedCliente = index;
  }

  searchPatrimoniales(): void {
    this.listaPatrimonial = []
    this.selectedPatrimonial = null;
    // if (this.validaGuardar()) {
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.operacionesPasivasService.getPatrimoniales(this.patrimonialNumeroCliente, this.patrimonialNombreCliente, this.patrimonialApellidoPaterno, this.patrimonialApellidoMaterno).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          if (response["lista"].length <= 100) {
            this.listaPatrimonial = response['lista'];
            swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
          }
          else {
            swal(PopUpMessage.getAppErrorMessage('Ocurrio un error', 'La busqueda regreso demasiadas coincidencias')).then();
          }
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
    // }
  }

  selectPatrimonial(index): void {
    this.selectedPatrimonial = index;
  }

  searchCierreCuentas(): void {
    this.listaCierreCuentas = []
    this.selectedCierre = null;
    // if (this.validaGuardar()) {
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.operacionesPasivasService.getCierres(this.cierreCuentasNumeroCliente, this.cierreCuentasNombreCliente, this.cierreCuentasApellidoPaterno, this.cierreCuentasApellidoMaterno).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          if (response["lista"].length <= 100) {
            this.listaCierreCuentas = response['lista'];
            swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
          }
          else {
            swal(PopUpMessage.getAppErrorMessage('Ocurrio un error', 'La busqueda regreso demasiadas coincidencias')).then();
          }
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
    // }
  }

  selectCierre(index): void {
    this.selectedCierre = index;
  }

  onClickEliminarCierre(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success btn-lg mx-3',
      cancelButtonClass: 'btn btn-danger btn-lg mx-3',
      buttonsStyling: false
    });
    swalWithBootstrapButtons({
      title: '¿Desea eliminar el cierre seleccionado?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {

    });
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

  openModalCliente(type): void {
    if (type == 'edit') {
      let cliente = this.listaClientes[this.selectedCliente]
      this.operacionesPasivasData$.changeSelectedCliente(cliente);
    }
    else {
      this.operacionesPasivasData$.changeSelectedCliente(undefined);
    }
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificacionClienteComponent, ngbModalOptions);
  }

  openModalPatrimonial(type): void {
    if (type == 'edit') {
      let patrimonial = this.listaPatrimonial[this.selectedPatrimonial]
      this.operacionesPasivasData$.changeSelectedPatrimonial(patrimonial);
    }
    else {
      this.operacionesPasivasData$.changeSelectedPatrimonial(undefined);
    }
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
