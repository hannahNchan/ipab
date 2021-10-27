import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';

import { IBloqueo, ICliente, IPatrimonial, ICierreCuentas, IClienteCuentas, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';

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

  dictCatalogos: ICatalogoGenerico;
  bloqueosFechaReporte: string;
  bloqueosNumeroCuenta: string;
  bloqueosNumeroBloqueo: string;
  selectedBloqueo: string;
  numeroCliente: string;
  nombreCliente: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  selectedCliente: number;
  patrimonialFechaReporte: string;
  patrimonialNumeroCliente: string;
  patrimonialNumeroCuenta: string;
  patrimonialNumeroInversion: string;
  selectedPatrimonial: number;
  clienteCuentaFechaReporte: string;
  clienteCuentaNumeroCliente: string;
  clienteCuentaNumeroCuenta: string;
  selectedClienteCuenta: number;
  cierreCuentasNumeroCliente: string;
  cierreCuentasNombreCliente: string;
  cierreCuentasApellidoPaterno: string;
  cierreCuentasApellidoMaterno: string;
  selectedCierre: string;
  listaBloqueos: IBloqueo[];
  listaClientes: ICliente[];
  listaPatrimonial: IPatrimonial[];
  listaClientesCuentas: IClienteCuentas[];
  listaCierreCuentas: ICierreCuentas[];


  constructor(private modalService: NgbModal, private operacionesPasivasService: OperacionesPasivasService, private operacionesPasivasData$: OperacionesPasivasDataService) { }

  ngOnInit(): void {
    this.bloqueosFechaReporte = '';
    this.bloqueosNumeroCuenta = '';
    this.bloqueosNumeroBloqueo = '';
    this.selectedBloqueo = null;
    this.numeroCliente = '';
    this.nombreCliente = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.selectedCliente = null;
    this.patrimonialFechaReporte = '';
    this.patrimonialNumeroCliente = '';
    this.patrimonialNumeroCuenta = '';
    this.patrimonialNumeroInversion = '';
    this.selectedPatrimonial = null;
    this.clienteCuentaFechaReporte = "";
    this.clienteCuentaNumeroCliente = "";
    this.clienteCuentaNumeroCuenta = "";
    this.selectedClienteCuenta = null;
    this.cierreCuentasNumeroCliente = '';
    this.cierreCuentasNombreCliente = '';
    this.cierreCuentasApellidoPaterno = '';
    this.cierreCuentasApellidoMaterno = '';
    this.selectedCierre = null;
    this.dictCatalogos = {};
    swal({
      title: 'Obteniendo catalogos...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.operacionesPasivasService.getCatalogos().subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
          console.log(Object.keys(response));
          this.dictCatalogos = response
          this.operacionesPasivasData$.saveCatalogos(this.dictCatalogos);
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
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
    let fecha = ''
    if (this.bloqueosFechaReporte['month'] > 9 && this.bloqueosFechaReporte['day'] > 9) {
      fecha = this.bloqueosFechaReporte['day'] + '/' + this.bloqueosFechaReporte['month'] + '/' + this.bloqueosFechaReporte['year']
    }
    else if (this.bloqueosFechaReporte['month'] < 10 && this.bloqueosFechaReporte['day'] > 9) {
      fecha = this.bloqueosFechaReporte['day'] + '/0' + this.bloqueosFechaReporte['month'] + '/' + this.bloqueosFechaReporte['year']
    }
    else if (this.bloqueosFechaReporte['month'] > 9 && this.bloqueosFechaReporte['day'] < 10) {
      fecha = '0' + this.bloqueosFechaReporte['day'] + '/' + this.bloqueosFechaReporte['month'] + '/' + this.bloqueosFechaReporte['year']
    }
    else {
      fecha = '0' + this.bloqueosFechaReporte['day'] + '/0' + this.bloqueosFechaReporte['month'] + '/' + this.bloqueosFechaReporte['year']
    }
    this.operacionesPasivasService.getBloqueos(fecha, this.bloqueosNumeroCuenta, this.bloqueosNumeroBloqueo).subscribe(
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
    let fecha = ''
    if (this.patrimonialFechaReporte['month'] > 9 && this.patrimonialFechaReporte['day'] > 9) {
      fecha = this.patrimonialFechaReporte['day'] + '/' + this.patrimonialFechaReporte['month'] + '/' + this.patrimonialFechaReporte['year']
    }
    else if (this.patrimonialFechaReporte['month'] < 10 && this.patrimonialFechaReporte['day'] > 9) {
      fecha = this.patrimonialFechaReporte['day'] + '/0' + this.patrimonialFechaReporte['month'] + '/' + this.patrimonialFechaReporte['year']
    }
    else if (this.patrimonialFechaReporte['month'] > 9 && this.patrimonialFechaReporte['day'] < 10) {
      fecha = '0' + this.patrimonialFechaReporte['day'] + '/' + this.patrimonialFechaReporte['month'] + '/' + this.patrimonialFechaReporte['year']
    }
    else {
      fecha = '0' + this.patrimonialFechaReporte['day'] + '/0' + this.patrimonialFechaReporte['month'] + '/' + this.patrimonialFechaReporte['year']
    }
    this.operacionesPasivasService.getPatrimoniales(fecha, this.patrimonialNumeroCliente, this.patrimonialNumeroCuenta, this.patrimonialNumeroInversion).subscribe(
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

  searchClientesCuentas(): void {
    // if (this.validaGuardar()) {
    this.listaClientesCuentas = []
    this.selectedClienteCuenta = null;
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    let fecha = ''
    if (this.clienteCuentaFechaReporte['month'] > 9 && this.clienteCuentaFechaReporte['day'] > 9) {
      fecha = this.clienteCuentaFechaReporte['day'] + '/' + this.clienteCuentaFechaReporte['month'] + '/' + this.clienteCuentaFechaReporte['year']
    }
    else if (this.clienteCuentaFechaReporte['month'] < 10 && this.clienteCuentaFechaReporte['day'] > 9) {
      fecha = this.clienteCuentaFechaReporte['day'] + '/0' + this.clienteCuentaFechaReporte['month'] + '/' + this.clienteCuentaFechaReporte['year']
    }
    else if (this.clienteCuentaFechaReporte['month'] > 9 && this.clienteCuentaFechaReporte['day'] < 10) {
      fecha = '0' + this.clienteCuentaFechaReporte['day'] + '/' + this.clienteCuentaFechaReporte['month'] + '/' + this.clienteCuentaFechaReporte['year']
    }
    else {
      fecha = '0' + this.clienteCuentaFechaReporte['day'] + '/0' + this.clienteCuentaFechaReporte['month'] + '/' + this.clienteCuentaFechaReporte['year']
    }
    this.operacionesPasivasService.getClientesCuentas(fecha, this.clienteCuentaNumeroCliente, this.clienteCuentaNumeroCuenta).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          if (response["lista"].length <= 100) {
            this.listaClientesCuentas = response['lista'];
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

  selectClienteCuenta(index): void {
    this.selectedClienteCuenta = index;
  }

  onClickEliminarClienteCuenta(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success btn-lg mx-3',
      cancelButtonClass: 'btn btn-danger btn-lg mx-3',
      buttonsStyling: false
    });
    swalWithBootstrapButtons({
      title: '¿Desea eliminar el cliente-cuenta seleccionado?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {

    });
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

  openModalAltaCuenta(type): void {
    if (type == 'edit') {
      let clienteCuenta = this.listaClientesCuentas[this.selectedClienteCuenta]
      this.operacionesPasivasData$.changeSelectedClienteCuenta(clienteCuenta);
    }
    else {
      this.operacionesPasivasData$.changeSelectedClienteCuenta(undefined);
    }
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false
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
