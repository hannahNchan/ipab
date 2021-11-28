import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';

import { ICalendario, ICategoria, IParametro, IYearSelected } from '@interfaces/parametros-categorias-holidays.interface';
import { IDate } from '@interfaces/date.interface';

import { ParametrosCategoriasHolidaysService } from '@services/parametros-categorias-holidays.service';
import { ParametrosCategoriasHolidaysDataService } from '@services/parametros-categorias-holidays-data.service';

import { AltaEditarHolidayComponent } from '@modules/datos-cliente/parametros-categorias-holidays/modals/alta-editar-holiday/alta-editar-holiday.component';

import { AltaEditarCategoriasComponent } from './modals/alta-editar-categorias/alta-editar-categorias.component';
import { AltaEditarParametrosComponent } from './modals/alta-editar-parametros/alta-editar-parametros.component';

@Component({
  selector: 'parametros-categorias-holidays',
  templateUrl: './parametros-categorias-holidays.component.html',
  styleUrls: ['./parametros-categorias-holidays.component.scss']
})
export class ParametrosCategoriasHolidaysComponent implements OnInit {
  tipoParametro: string;
  idParametro: string;

  categoria: string;

  anio: string;
  selectedIndex: number;
  selectedIndexCat: number;
  selectedRow: IYearSelected; 
  selectedRowCategoria: ICategoria; 

  selectedParametro: IParametro;
  selectedCategoria: ICategoria;
  selectedCalendario: ICalendario;

  selectedParametroIndex: Number;

  isActiveBtnEditarParametro: boolean;
  isActiveBtnEliminarParametro: boolean;
  isActiveBtnEditarCategoria: boolean;
  isActiveBtnEliminarCategoria: boolean;
  isActiveBtnEditarCalendario: boolean;
  isActiveBtnEliminarCalendario: boolean;

  listaParametros: IParametro[];
  listaCategorias: ICategoria[];
  listaCalendario: ICalendario[];
  anios: string[];
  fecha: IDate;
  parametrosDisableButtons: boolean = true;
  categoriasDisableButtons: boolean = true;

  constructor(
      private modalService: NgbModal,
      private _calendar: NgbCalendar,
      private paramService: ParametrosCategoriasHolidaysService,
      private  paramData$: ParametrosCategoriasHolidaysDataService) {}

  ngOnInit(): void {
    this.isActiveBtnEditarParametro = false;
    this.isActiveBtnEliminarParametro = false;
    this.tipoParametro = '';
    this.idParametro = '';
    this.categoria = '';
    this.anio = '';
    this.anios = [];
    this.fecha = this._calendar.getToday();
    let anioArray = [];
    let anioActualInt: number;
    let anioLimiteInferior: number;
    let anioLimiteSuperior: number;
    anioActualInt = this.fecha.year;
    anioLimiteInferior = anioActualInt - 20;
    anioLimiteSuperior = anioActualInt + 20;
    for (let aux; anioLimiteSuperior > anioLimiteInferior; anioLimiteInferior++) {
      anioArray.push(anioLimiteInferior);
    }
    this.anios = anioArray;
  }

  /**
   * Abre el modal para la alta de usuario
   */
  openModalAltaParametro(): void {
    this.paramData$.changeSelectedParametro(undefined);
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    const activeModal = this.modalService
      .open(AltaEditarParametrosComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = false;
  }

  /**
   * Abre el modal para la edicion de usuario
   */
  openModalEditarParametro(): void {
    this.paramData$.changeSelectedParametro(this.selectedParametro);
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    const activeModal = this.modalService
      .open(AltaEditarParametrosComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = true;
  }

  /**
   * Abre el modal para la alta de categoria 
   */
  openModalAltaCategoria(): void {
    this.paramData$.changeSelectedCategoria(undefined);
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    const activeModal = this.modalService
      .open(AltaEditarCategoriasComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = false;
  }

  /**
   * Abre el modal para la edicion de categoria
   */
  openModalEditarCategoria(): void {
    this.paramData$.changeSelectedCategoria(this.selectedCategoria);
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    const activeModal = this.modalService
      .open(AltaEditarCategoriasComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = true; 
    activeModal.componentInstance.selectedRow = this.selectedRowCategoria; 
  }

  /**
   * Abre el modal para la alta de holiday 
   */
  openModalAltaHoliday(): void {
    this.paramData$.changeSelectedCalendario(undefined);
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    const activeModal = this.modalService
      .open(AltaEditarHolidayComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = false; 
  }

  /**
   * Abre el modal para la edicion de holiday
   */
  openModalEditarHoliday(): void {
    this.paramData$.changeSelectedCalendario(this.selectedCalendario);
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    const activeModal = this.modalService
      .open(AltaEditarHolidayComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = true; 
    activeModal.componentInstance.selectedRow= this.selectedRow;
  }

  onClickSearchParametros(): void {
    if (this.tipoParametro.trim().length === 0 && this.idParametro.trim().length === 0) {
      return;
    }
    swal({
      title: 'Consultando parametros...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.paramService.getListaParametros(this.tipoParametro, this.idParametro).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          this.listaParametros = response['lista'];
          this.parametrosDisableButtons = response.lista.length !== 0 ? false : true;
          swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
  }

  onClickSearchCategorias(): void {
    if (this.categoria.trim().length === 0) {
      swal(PopUpMessage.getValidateErrorMessage('Categoria')).then();
      return;
    }
    swal({
      title: 'Consultando categorías...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.paramService.getListaCategorias(this.categoria).subscribe(
      response => {
        if (!response.header.estatus) {
          return swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        }

        if (response.lista && response.lista.length !== 0) {
          this.categoriasDisableButtons = false;
          this.listaCategorias = response.lista;
          return swal(PopUpMessage.getSuccesMessage(response, null, null)).then(); 
        }

        return swal(PopUpMessage.getAppErrorMessage('Mensaje', 'No se encontro ninguna informacion')).then();
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
  }

  onClickSearchCalendario(): void {
    if (this.anio.length === 0) {
      swal(PopUpMessage.getValidateErrorMessage('Año')).then();
      return;
    }
    swal({
      title: 'Consultando calendario...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.paramService.getListaCalendario(this.anio).subscribe(
      response => {
        if (!response.header.estatus) {
          return swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        }
   
        if (response.lista && response.lista.length !== 0) {
          this.listaCalendario = [response.lista[0]];
          return swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
        }
 
        return swal(PopUpMessage.getAppErrorMessage('Mensaje', 'No se encontro ninguna informacion')).then();
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
  }

  /**
   * ventana de confirmación para eliminación
   */
  onDeleteParametro(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-danger btn-lg mx-3',
      cancelButtonClass: 'btn btn-success btn-lg mx-3',
      buttonsStyling: false
    });

    swalWithBootstrapButtons({
      title: '¿Desea eliminar el parámetro seleccionado?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.removerParametro();
      }
    });
  }

  /**
   * Elimina un parametro
   */
  removerParametro(): void {
    swal({
      title: 'Eliminando parámetro...',
      text: 'Espere por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.paramService.removerParametro(this.selectedParametro)
      .subscribe(res => {
        if (res.header['estatus']) {
          swal(PopUpMessage.getSuccesMessage(res, null , null)).then(() => {});
        } else {
          swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
        }
      });
  }

  /**
   * ventana de confirmación para eliminación de categorias
   */
  onDeleteCategorias(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-danger btn-lg mx-3',
      cancelButtonClass: 'btn btn-success btn-lg mx-3',
      buttonsStyling: false
    });

    swalWithBootstrapButtons({
      title: '¿Desea eliminar la categoría seleccionada?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.removerCategoria();
      }
    });
  }

  /**
   * Elimina un categoria
   */
  removerCategoria(): void {
    swal({
      title: 'Eliminando categoría...',
      text: 'Espere por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.paramService.removerCategoria(this.selectedCategoria)
      .subscribe(res => {
        if (res.header['estatus']) {
          swal(PopUpMessage.getSuccesMessage(res, null , null)).then(() => {});
        } else {
          swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
        }
      });
  }

  /**
   * ventana de confirmación para eliminación de calendario
   */
  onDeleteCalendario(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-danger btn-lg mx-3',
      cancelButtonClass: 'btn btn-success btn-lg mx-3',
      buttonsStyling: false
    });

    swalWithBootstrapButtons({
      title: '¿Desea eliminar el calendario seleccionado?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.removerCalendario();
      }
    });
  }

  /**
   * Elimina un categoria
   */
  removerCalendario(): void {
    swal({
      title: 'Eliminando calendario...',
      text: 'Espere por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.paramService.removerCalendario(this.selectedCalendario)
      .subscribe(res => {
        if (res.header['estatus']) {
          swal(PopUpMessage.getSuccesMessage(res, null , null)).then(() => {});
        } else {
          swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
        }
      });
  }

  /**
   * Elige globalmente el parametro seleccionado
   * @param parametro
   */
  onSelectedParametro(parametro: IParametro, index: Number): void {
    this.paramData$.changeSelectedParametro(parametro);
    this.selectedParametro = parametro;
    this.selectedParametroIndex = index;
    this.inicializarBotonesParametros();
  }
  // *ngFor="let parametro of listaParametros; let i=index"
  // (click)="onSelectedParameterIndex(i)"
  /**
   * Elige globalmente de la categoria seleccionado
   * @param parametro
   */
  onSelectedCategoria(categoria: ICategoria): void {
    this.selectedCategoria = categoria;
    this.inicializarBotonesCategoria();
  }

  /**
   * Elige globalmente el calendario seleccionado
   * @param parametro
   */
  onSelectedCalendario(calendario: ICalendario): void {
    this.selectedCalendario = calendario;
    this.inicializarBotonesCalendario();
  }

  /**
   * Guarda el ano elegido al dar click
   * @param index
   */
  onSelectedRowAnio(index: number): void {
    this.selectedIndex = index; 
    this.selectedRow = {
      anio: this.listaCalendario[index].paramName,
      descripcion: this.listaCalendario[index].descripcion,
    };
  }

  /**
   * Guarda la categoria elegida al dar click
   * @param index
   */
  onSelectedRowCategoria(categoria: ICategoria, index: number): void {
    this.paramData$.changeSelectedCategoria(categoria);
    this.selectedCategoria = categoria;
    this.selectedIndexCat = index; 
    this.selectedRowCategoria = this.listaCategorias[index];
  }

  private inicializarBotonesCategoria(): void {
    this.isActiveBtnEditarCategoria = true;
    this.isActiveBtnEliminarCategoria = true;
  }
  private inicializarBotonesCalendario(): void {
    this.isActiveBtnEditarCalendario = true;
    this.isActiveBtnEliminarCalendario = true;
  }
  private inicializarBotonesParametros(): void {
    this.isActiveBtnEditarParametro = true;
    this.isActiveBtnEliminarParametro = true;
  }
}
