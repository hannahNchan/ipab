import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';

import { IBloqueo, ICliente, IPatrimonial, ICierreCuentas, IClienteCuentas, ICatalogoGenerico, IExceptuados } from '@interfaces/operaciones-pasivas.interface';

import { AltaModificarExceptuadosComponent } from './modals/alta-modificar-exceptuados/alta-modificar-exceptuados.component';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';

import { AltaModificacionClienteComponent } from './modals/alta-modificacion-cliente/alta-modificacion-cliente.component';
import { EdicionPatrimonialComponent } from './modals/edicion-patrimonial/edicion-patrimonial.component';

import { AltaModificarBloqueoModalComponent } from './modals/alta-modificar-bloqueo/alta-modificar-bloqueo.modal.component';
import { AltaModificarCierreModalComponent } from './modals/alta-modificar-cierre/alta-modificar-cierre.modal.component';
import { AltaModificarDuplicadoModalComponent } from './modals/alta-modificar-duplicado/alta-modificar-duplicado.modal.component';
import { AltaEditarCuentaComponent } from './alta-editar-cuenta/alta-editar-cuenta.component';
import { CargarFechaReportePasivasModalComponent } from './modals/cargar-fecha-reporte-pasivas/cargar-fecha-reporte-pasivas.modal.component';

@Component({
  selector: 'app-operaciones-pasivas',
  templateUrl: './operaciones-pasivas.component.html',
  styleUrls: ['./operaciones-pasivas.component.scss']
})
export class OperacionesPasivasComponent implements OnInit {

  isReady: boolean;
  dictCatalogos: ICatalogoGenerico;
  bloqueosNumeroCuenta: string;
  bloqueosNumeroBloqueo: string;
  selectedBloqueo: string;
  fechaReporte: string;
  numeroCliente: string;
  nombreCliente: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  selectedCliente: string;
  patrimonialNumeroCliente: string;
  patrimonialNumeroCuenta: string;
  patrimonialNumeroInversion: string;
  selectedPatrimonial: string;
  clienteCuentaNumeroCliente: string;
  clienteCuentaNumeroCuenta: string;
  selectedClienteCuenta: string;
  cierreCuentasNumeroCliente: string;
  cierreCuentasNumeroCuenta: string;
  selectedCierre: string;
  exceptuadosNumeroCliente: string;
  selectedExceptuado: string;
  listaBloqueos: IBloqueo[];
  listaClientes: ICliente[];
  listaPatrimonial: IPatrimonial[];
  listaClientesCuentas: IClienteCuentas[];
  listaCierreCuentas: ICierreCuentas[];
  listaExceptuados: IExceptuados[];


  constructor(private modalService: NgbModal, private operacionesPasivasService: OperacionesPasivasService, private operacionesPasivasData$: OperacionesPasivasDataService) { }

  ngOnInit(): void {
    this.isReady = false;
    this.fechaReporte = '';
    this.bloqueosNumeroCuenta = '';
    this.bloqueosNumeroBloqueo = '';
    this.selectedBloqueo = null;
    this.numeroCliente = '';
    this.nombreCliente = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.selectedCliente = null;
    this.patrimonialNumeroCliente = '';
    this.patrimonialNumeroCuenta = '';
    this.patrimonialNumeroInversion = '';
    this.selectedPatrimonial = null;
    this.clienteCuentaNumeroCliente = "";
    this.clienteCuentaNumeroCuenta = "";
    this.selectedClienteCuenta = null;
    this.cierreCuentasNumeroCliente = '';
    this.cierreCuentasNumeroCuenta = '';
    this.selectedCierre = null;
    this.exceptuadosNumeroCliente = '';
    this.dictCatalogos = {};
    swal({
      title: 'Obteniendo catálogos...',
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
          swal.close();
          this.isReady = true;
          this.dictCatalogos = response
          this.operacionesPasivasData$.saveCatalogos(this.dictCatalogos);
          this.openModalFechaReporte()
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
  }

  onClickCambiarFechaReporte(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success btn-lg mx-3',
      cancelButtonClass: 'btn btn-danger btn-lg mx-3',
      buttonsStyling: false
    });
    swalWithBootstrapButtons({
      title: '¿Desea cambiar la fecha de reporte seleccionada?',
      text: '¡Se borrarán las busquedas realizadas!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.openModalFechaReporte()
      }
    });
  }

  openModalFechaReporte(): void {
    this.listaBloqueos = []
    this.listaCierreCuentas = []
    this.listaClientes = []
    this.listaClientesCuentas = []
    this.listaExceptuados = []
    this.listaPatrimonial = []
    this.selectedBloqueo = null
    this.selectedCierre = null
    this.selectedCliente = null
    this.selectedClienteCuenta = null
    this.selectedExceptuado = null
    this.selectedPatrimonial = null
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(CargarFechaReportePasivasModalComponent, ngbModalOptions).result.then(
      () => { },
      () => {
        this.operacionesPasivasData$.fechaReporte.subscribe(fechaReporte => {
          this.fechaReporte = fechaReporte
        })
      }
    );
  }

  changeDataCliente(band) {
    this.listaClientes = [];
    this.selectedCliente = null
    if (band) {
      this.apellidoPaterno = ''
      this.apellidoMaterno = ''
      this.nombreCliente = ''
    }
  }

  changeDataPatrimonial(band) {
    this.listaPatrimonial = [];
    this.selectedPatrimonial = null
    if (band) {
      this.patrimonialNumeroCuenta = ''
      this.patrimonialNumeroInversion = ''
    }
  }

  changeDataClienteCuentas(band) {
    this.listaClientesCuentas = [];
    this.selectedClienteCuenta = null
    if (band) {
      this.clienteCuentaNumeroCuenta = ''
    }
  }

  changeDataBloqueos(band) {
    this.listaBloqueos = [];
    this.selectedBloqueo = null
    if (band) {
      this.bloqueosNumeroBloqueo = ''
    }
  }

  changeDataCierres(band) {
    this.listaCierreCuentas = [];
    this.selectedCierre = null
    if (band) {
      this.cierreCuentasNumeroCuenta = ''
    }
  }

  changeDataExceptuados() {
    this.listaExceptuados = [];
    this.selectedExceptuado = null
  }

  searchBloqueos(): void {
    this.listaBloqueos = []
    this.selectedBloqueo = null;
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    let fecha = ''
    if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] < 10 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] < 10) {
      fecha = '0' + this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else {
      fecha = '0' + this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
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
      if (result.value) {
        let bloqueo = this.listaBloqueos[this.selectedBloqueo]
        let json = {
          alta: false,
          idBloqueo: bloqueo.idBloqueo,
          idCuenta: bloqueo.idCuenta,
        }
        this.operacionesPasivasService.deleteBloqueo(json).subscribe(resp => {
          if (resp['header'].estatus === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
          }
          else {
            swal(PopUpMessage.getSuccesMessage(resp, null, null)).then();
          }
        }, err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });

      }
    });
  }

  searchClientes(): void {
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
    let fecha = ''
    if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] < 10 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] < 10) {
      fecha = '0' + this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else {
      fecha = '0' + this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    this.operacionesPasivasService.getClientes(fecha, this.numeroCliente, this.nombreCliente, this.apellidoPaterno, this.apellidoMaterno).subscribe(
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
  }

  selectClient(index): void {
    this.selectedCliente = index;
  }

  searchPatrimoniales(): void {
    this.listaPatrimonial = []
    this.selectedPatrimonial = null;
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    let fecha = ''
    if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] < 10 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] < 10) {
      fecha = '0' + this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else {
      fecha = '0' + this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
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
  }

  selectPatrimonial(index): void {
    this.selectedPatrimonial = index;
  }

  searchClientesCuentas(): void {
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
    if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] < 10 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] < 10) {
      fecha = '0' + this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else {
      fecha = '0' + this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
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
      if (result.value) {
        let clienteCuenta = this.listaClientesCuentas[this.selectedClienteCuenta]
        let json = {
          alta: false,
          titular: clienteCuenta.titular,
          idCuenta: clienteCuenta.idCuenta,
        }
        this.operacionesPasivasService.deleteClienteCuenta(json).subscribe(resp => {
          if (resp['header'].estatus === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
          }
          else {
            swal(PopUpMessage.getSuccesMessage(resp, null, null)).then();
          }
        }, err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });
      }
    });
  }

  searchCierreCuentas(): void {
    this.listaCierreCuentas = []
    this.selectedCierre = null;
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    let fecha = ''
    if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] < 10 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] < 10) {
      fecha = '0' + this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else {
      fecha = '0' + this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    this.operacionesPasivasService.getCierres(fecha, this.cierreCuentasNumeroCliente, this.cierreCuentasNumeroCuenta).subscribe(
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
      if (result.value) {
        let cierre = this.listaCierreCuentas[this.selectedCierre]
        let json = {
          alta: false,
          idTitular: cierre.idTitular,
          idCuenta: cierre.idCuenta,
        }
        this.operacionesPasivasService.deleteCierre(json).subscribe(resp => {
          if (resp['header'].estatus === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
          }
          else {
            swal(PopUpMessage.getSuccesMessage(resp, null, null)).then();
          }
        }, err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });
      }
    });
  }

  searchExceptuados(): void {
    this.listaExceptuados = []
    this.selectedExceptuado = null;
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    let fecha = ''
    if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] < 10 && this.fechaReporte['day'] > 9) {
      fecha = this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else if (this.fechaReporte['month'] > 9 && this.fechaReporte['day'] < 10) {
      fecha = '0' + this.fechaReporte['day'] + '/' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    else {
      fecha = '0' + this.fechaReporte['day'] + '/0' + this.fechaReporte['month'] + '/' + this.fechaReporte['year']
    }
    this.operacionesPasivasService.getExceptuados(fecha, this.exceptuadosNumeroCliente).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          if (response["lista"].length <= 100) {
            this.listaExceptuados = response['lista'];
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
  }

  selectExceptuado(index): void {
    this.selectedExceptuado = index;
  }

  onClickEliminarExceptuado(): void {
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
      if (result.value) {
        let exceptuado = this.listaExceptuados[this.selectedExceptuado]
        let json = {
          alta: false,
          numeroCliente: exceptuado.numeroCliente,
        }
        this.operacionesPasivasService.deleteExceptuado(json).subscribe(resp => {
          if (resp['header'].estatus === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
          }
          else {
            swal(PopUpMessage.getSuccesMessage(resp, null, null)).then();
          }
        }, err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });
      }
    });
  }

  openModalAltaExceptuados(type): void {
    if (type == 'edit') {
      let exceptuado = this.listaExceptuados[this.selectedExceptuado]
      this.operacionesPasivasData$.changeSelectedExceptuado(exceptuado);
    }
    else {
      this.operacionesPasivasData$.changeSelectedExceptuado(undefined);
    }
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
