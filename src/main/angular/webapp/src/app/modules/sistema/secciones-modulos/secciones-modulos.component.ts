import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PopUpMessage } from '@helpers/PopUpMessage';
import swal from 'sweetalert2';

import { AltaModificarSeccionModalComponent } from './modals/alta-modificar-seccion/alta-modificar-seccion.modal.component';
import { AltaModificarModuloModalComponent } from './modals/alta-modificar-modulo/alta-modificar-modulo.modal.component';
import { SeccionesModulosService } from '@services/secciones-modulos.service';
import { IModulo, ISeccion } from '@interfaces/seccion-modulo.interface';
import { SeccionesModulosDataService } from '@services/secciones-modulos-data.service';
import { AuthService } from '@services/auth.service';




@Component({
  selector: 'app-secciones-modulos',
  templateUrl: './secciones-modulos.component.html',
  styleUrls: ['./secciones-modulos.component.scss']
})
export class SeccionesModulosComponent implements OnInit {

  nombre: String;
  code: number;
  listaSecciones: ISeccion[];
  listaModulos: IModulo[];
  selectedIdSeccion: number;
  selectedIdModulo: number;
  editarSeccionActivo: boolean;
  listaModulosActivo: boolean;
  editarModuloActivo: boolean;

  private _idUsuario: number;


  constructor(private modalService: NgbModal, private seccionesModulosService: SeccionesModulosService, private _dataService: SeccionesModulosDataService,
    private _authService: AuthService,) { }

  ngOnInit(): void {
    this._idUsuario = this._authService.getActiveUser();
    this.nombre = '';
    this.code = null;
    this.selectedIdSeccion = 0;
    this.editarSeccionActivo = false;
    this.listaModulosActivo = false;
    this.editarModuloActivo = false;
    this.getSecciones();

  }



  /**
   * Obtiene las secciones.
   */
  getSecciones(): void {
    if (this.code == null) {
      this.seccionesModulosService.getSecciones(this.nombre).subscribe(
        res => {
          if (res.header.estatus) {
            this.listaSecciones = res['seccion'];
          } else {
            res.header.mensajeFuncional = 'No se pudieron conseguir las secciones'
            swal(PopUpMessage.getAppErrorMessageReportId(res))
              .then();
          }
        });
    }
    else {
      this.seccionesModulosService.getSeccion(this.code).subscribe(
        res => {
          if (res.header.estatus) {
            this.listaSecciones = [];
            if (typeof res['seccion'] !== 'undefined') {
              this.listaSecciones.push({
                idSeccion: res['seccion'].idSeccion,
                descripcion: res['seccion'].descripcion,
              });
            }
          } else {
            res.header.mensajeFuncional = 'No se pudieron conseguir las secciones'
            swal(PopUpMessage.getAppErrorMessageReportId(res))
              .then();
          }
        });
    }
    this.selectedIdSeccion = 0;
    this.editarSeccionActivo = false;
    this.listaModulosActivo = false;
    this.editarModuloActivo = false;
    this.listaModulos = [];
  }

  changeHandler(type): void {
    if (type == 'code') {
      if (this.code != null) {
        this.nombre = '';
      }
    }
    else {
      if (this.nombre != '') {
        this.code = null
      }
    }
  }

  onSelectedSeccion(seccion: ISeccion): void {
    if (seccion.idSeccion === this.selectedIdSeccion) {
      return;
    }
    this.selectedIdSeccion = seccion.idSeccion;
    this.listaModulos = [];
    this.selectedIdModulo = 0;
    this._dataService.changeSelectedIdSeccion(seccion.idSeccion);
    this._dataService.changeSelectedIdModulo(0);
    this.listaModulosActivo = true;
    this.editarModuloActivo = false;
    this.editarSeccionActivo = true;


  }

  onClickEliminarSeccion(): void {
    console.log("onClickEliminarSeccion")
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success btn-lg mx-3',
      cancelButtonClass: 'btn btn-danger btn-lg mx-3',
      buttonsStyling: false
    });
    swalWithBootstrapButtons({
      title: '¿Desea eliminar la sección seleccionada?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.removerSeccion();
      }
    });
  }

  removerSeccion(): void {
    swal({
      title: 'Eliminando seccion...',
      text: 'Espere por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.seccionesModulosService.removerSeccion({
      idSeccion: this.selectedIdSeccion,
      idUsuario: this._idUsuario
    }).subscribe(res => {
      if (res.header['estatus']) {
        swal(PopUpMessage.getSuccesMessage(res, null, null)).then(() => {
          this.getSecciones();
        });
      } else {
        swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
      }
    },
      error => swal(PopUpMessage.getServerErrorMessage(error)).then());
  }

  onClickListarModulos(): void {
    this.seccionesModulosService.getModulos(this.selectedIdSeccion)
      .subscribe(result => {
        if (result.header.estatus) {
          this.listaModulos = result['listaModulos'];
        } else {
          swal(PopUpMessage.getAppErrorMessageReportId(result))
            .then();
        }
      });
    this.selectedIdModulo = 0;
    this.editarModuloActivo = false;
    this.listaModulos = [];
  }

  onSelectedModulo(modulo: IModulo): void {
    if (modulo.idModulo === this.selectedIdModulo) {
      return;
    }
    this._dataService.changeSelectedIdModulo(modulo.idModulo);
    this.selectedIdModulo = modulo.idModulo;
    this.editarModuloActivo = true;
  }

  onClickEliminarModulo(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success btn-lg mx-3',
      cancelButtonClass: 'btn btn-danger btn-lg mx-3',
      buttonsStyling: false
    });
    swalWithBootstrapButtons({
      title: '¿Desea eliminar el módulo seleccionado?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.removerModulo();
      }
    });
  }

  removerModulo(): void {
    swal({
      title: 'Eliminando modulo...',
      text: 'Espere por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.seccionesModulosService.removerModulo({
      idModulo: this.selectedIdModulo,
      idUsuario: this._idUsuario
    }).subscribe(res => {
      if (res.header['estatus']) {
        swal(PopUpMessage.getSuccesMessage(res, null, null)).then(() => {
          this.onClickListarModulos();
        });
      } else {
        swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
      }
    },
      error => swal(PopUpMessage.getServerErrorMessage(error)).then());
  }

  /**
   * Abre el modal para dar de alta seccion.
   */
  openModalAltaSeccion(): void {
    this._dataService.changeSelectedIdSeccion(0);
    this.editarSeccionActivo = false;
    this.listaModulosActivo = false;
    this.editarModuloActivo = false;
    this.listaModulos = [];
    this.selectedIdSeccion = 0;
    this.selectedIdModulo = 0;
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarSeccionModalComponent, ngbModalOptions).result.then(
      () => { },
      () => this.getSecciones()
    );
  }

  /**
   * Abre el modal para dar de modificar seccion.
   */
  openModalModificarSeccion(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarSeccionModalComponent, ngbModalOptions).result.then(
      () => { },
      () => this.getSecciones()
    );
  }

  /**
   * Abre el modal para dar de alta seccion.
   */
  openModalAltaModulo(): void {
    this._dataService.changeSelectedIdModulo(0);
    this.selectedIdModulo = 0;
    this.editarModuloActivo = false;
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarModuloModalComponent, ngbModalOptions).result.then(
      () => this.onClickListarModulos(),
      () => this.onClickListarModulos()
    );
  }

  /**
   * Abre el modal para dar de modificar seccion.
   */
  openModalModificarModulo(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarModuloModalComponent, ngbModalOptions).result.then(
      () => this.onClickListarModulos(),
      () => this.onClickListarModulos()
    );
  }

}
