import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { OperacionesActivasService } from '@services/operaciones-activas.service';
import { OperacionesActivasDataService } from '@services/operaciones-activas-data.service';
import { CatalogosService } from '@services/catalogos.service';
import { ICatalogoGenerico } from '@interfaces/catalogos.interface';

import { IDate } from '@interfaces/date.interface';
import { ITabla4, ITabla1, ITabla2, ITabla4B, ITabla5 } from '@interfaces/operaciones-activas.interface';

import { AltaModificarTabla4bModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla4b/alta-modificar-tabla4b.modal.component';
import { AltaModificarTabla2bModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla2b/alta-modificar-tabla2b.modal.component';
import { AltaModificarTabla4aModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla4a/alta-modificar-tabla4a.modal.component';
import { AltaModificarTabla5aModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla5a/alta-modificar-tabla5a.modal.component';
import { AltaModificarTabla1bModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla1b/alta-modificar-tabla1b.modal.component';
import { CargarFechaReporteActivasModalComponent } from './modals/cargar-fecha-reporte-activas/cargar-fecha-reporte-activas.modal.component';


@Component({
  selector: 'app-operaciones-activas',
  templateUrl: './operaciones-activas.component.html',
  styleUrls: ['./operaciones-activas.component.scss']
})
export class OperacionesActivasComponent implements OnInit, AfterViewInit {

  listaTabla4A: ITabla4[];
  listaTabla5A: ITabla5[];
  listaTabla1B: ITabla1[];
  listaTabla2B: ITabla2[];
  listaTabla4B: ITabla4B[];

  decimalPattern = '^[0-9]+[.][0-9][0-9]$';
  enteroPattern = '^[0-9]+$';

  fechaReporte: string;

  creditoTabla4A: string;
  creditoTabla5A: string;
  creditoTabla1B: string;
  creditoTabla2B: string;
  creditoTabla4B: string;

  clienteTabla5A: string;
  clienteTabla1B: string;
  clienteTabla2B: string;
  clienteTabla4B: string;

  catalogoTipoCobranza: ICatalogoGenerico[];
  catalogoSegmento: ICatalogoGenerico[];
  catalogoMonedaLinea: ICatalogoGenerico[];
  catalogoCategoriaCredito: ICatalogoGenerico[];
  catalogoTipoAltaCredito: ICatalogoGenerico[];
  catalogoDenominacionCredito: ICatalogoGenerico[];
  catalogoDestinoCredito: ICatalogoGenerico[];
  catalogoConvenioJudicial: ICatalogoGenerico[];
  catalogoSegmentoVivienda: ICatalogoGenerico[];
  catalogoEstadoCredito: ICatalogoGenerico[];
  catalogoTipoRecursos: ICatalogoGenerico[];
  catalogoActividadEconomica: ICatalogoGenerico[];
  catalogoTipoAltaCredito2: ICatalogoGenerico[];
  catalogoTipoGarantia: ICatalogoGenerico[];
  catalogoGradoRiesgo: ICatalogoGenerico[];
  catalogoTipoCartera: ICatalogoGenerico[];
  catalogoDestinoCredito2: ICatalogoGenerico[];
  catalogoTipoOperacion: ICatalogoGenerico[];
  catalogoInstitucionFondeadora: ICatalogoGenerico[];
  catalogoEstado: ICatalogoGenerico[];
  catalogoMoneda: ICatalogoGenerico[];
  catalogoMonedat4: ICatalogoGenerico[];
  catalogoTipoTasaCredito: ICatalogoGenerico[];
  catalogoTipoTasa: ICatalogoGenerico[];
  catalogoSituacionCredito: ICatalogoGenerico[];
  catalogoConSinRestriccion: ICatalogoGenerico[];
  catalogoClasificacionContable: ICatalogoGenerico[];
  catalogoTipoCredito: ICatalogoGenerico[];
  catalogoEscalaPeriodos: ICatalogoGenerico[];
  catalogoTipoGarantiat4: ICatalogoGenerico[];

  selectedTabla4A: ITabla4;
  selectedTabla5A: ITabla5;
  selectedTabla1B: ITabla1;
  selectedTabla2B: ITabla2;
  selectedTabla4B: ITabla4B;

  tabla4AselectedFlag: boolean;
  tabla5AselectedFlag: boolean;
  tabla1BselectedFlag: boolean;
  tabla2BselectedFlag: boolean;
  tabla4BselectedFlag: boolean;

  selectedTipoCobranzaTabla4A: string;
  selectedSegmentoTabla4A: string;
  selectedMonedaLineaTabla4A: string;

  gridCreditos: { claveUnica: number, numeroCredito: number }[] = [];

  fechaPeriodo: IDate;
  fechaInicio: IDate;
  fechaVencimiento: IDate;

  catalogsCorrectFlag: boolean;

  constructor(
    private modalService: NgbModal,
    private operacionesActivasService: OperacionesActivasService,
    private _dataService: OperacionesActivasDataService,
    private catalogosService: CatalogosService) { }

  ngOnInit(): void {
    swal({
      title: 'Cargando información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    });
    this.selectedTabla4A = OperacionesActivasComponent.initTabla4A();
    this.selectedTabla5A = OperacionesActivasComponent.initTabla5A();
    this.selectedTabla1B = OperacionesActivasComponent.initTabla1B();
    this.selectedTabla2B = OperacionesActivasComponent.initTabla2B();
    this.selectedTabla4B = OperacionesActivasComponent.initTabla4B();

    this.creditoTabla4A = '';
    this.creditoTabla5A = '';
    this.creditoTabla1B = '';
    this.creditoTabla2B = '';
    this.creditoTabla4B = '';

    this.clienteTabla5A = '';
    this.clienteTabla1B = '';
    this.clienteTabla2B = '';
    this.clienteTabla4B = '';

    this.tabla4AselectedFlag = false;
    this.tabla5AselectedFlag = false;
    this.tabla1BselectedFlag = false;
    this.tabla2BselectedFlag = false;
    this.tabla4BselectedFlag = false;

    const orden = 'DA';
    this.catalogsCorrectFlag = true;
    this.catalogosService.getCatalogosActivas(orden).subscribe(response => {
      if (response.header['estatus']) {
        this.catalogoTipoCobranza = response['tipoCobranza'];
        this.catalogoSegmento = response['segmento'];
        this.catalogoMonedaLinea = response['monedaLinea'];
        this.catalogoCategoriaCredito = response['categoriaCredito'];
        this.catalogoTipoAltaCredito = response['tipoAltaCredito'];
        this.catalogoDenominacionCredito = response['denominacionCredito'];
        this.catalogoDestinoCredito = response['destinoCredito'];
        this.catalogoConvenioJudicial = response['convenioJudicial'];
        this.catalogoSegmentoVivienda = response['segmentoVivienda'];
        this.catalogoEstadoCredito = response['estadoCredito'];
        this.catalogoTipoRecursos = response['tipoRecursos'];
        this.catalogoActividadEconomica = response['actividadEconomica'];
        this.catalogoTipoAltaCredito2 = response['tipoAltaCredito2'];
        this.catalogoTipoGarantia = response['tipoGarantia'];
        this.catalogoGradoRiesgo = response['gradoRiesgo'];
        this.catalogoTipoCartera = response['tipoCartera'];
        this.catalogoDestinoCredito2 = response['destinoCredito2'];
        this.catalogoTipoOperacion = response['tipoOperacion'];
        this.catalogoInstitucionFondeadora = response['institucionFondeadora'];
        this.catalogoEstado = response['estado'];
        this.catalogoSituacionCredito = response['situacionCredito'];
        this.catalogoConSinRestriccion = response['conSinRestriccion'];
        this.catalogoClasificacionContable = response['clasificacionContable'];
        this.catalogoTipoCredito = response['tipoCredito'];
        this.catalogoEscalaPeriodos = response['escalaPeriodos'];
        this.catalogoTipoGarantiat4 = response['tipoGarantiaT4'];
        this.catalogoMonedat4 = response['monedaT4'];
        this.catalogoTipoTasaCredito = response['tipoTasaCredito'];

        this.catalogsCorrectFlag = true;
        this.openModalFechaReporte()
        swal.close();
      } else {
        this.catalogsCorrectFlag = false;
        swal(PopUpMessage.getAppErrorMessageReportId(response))
          .then();
      }
    },
      error => {
        this.catalogsCorrectFlag = false;
        swal(PopUpMessage.getServerErrorMessage(error)).then(() => {
          console.error(error);
        });
      });
    /*this.catalogosService.getCatalogoTipoCobranza().subscribe(response => {
      this.catalogoTipoCobranza = response['catalogo'];
    });
    this.catalogosService.getCatalogoSegmento().subscribe(response => {
      this.catalogoSegmento = response['catalogo'];
    });
    this.catalogosService.getCatalogoMonedaLinea().subscribe(response => {
      this.catalogoMonedaLinea = response['catalogo'];
    });
    this.catalogosService.getCatalogoCategoriaCredito().subscribe(response => {
      this.catalogoCategoriaCredito = response['catalogo'];
    });
    this.catalogosService.getCatalogoTipoAltaCredito().subscribe(response => {
      this.catalogoTipoAltaCredito = response['catalogo'];
    });
    this.catalogosService.getCatalogoDestinoCredito().subscribe(response => {
      this.catalogoDestinoCredito = response['catalogo'];
    });
    this.catalogosService.getCatalogoSegmentoVivienda().subscribe(response => {
      this.catalogoSegmentoVivienda = response['catalogo'];
    });
    this.catalogosService.getCatalogoEstadoCredito().subscribe(response => {
      this.catalogoEstadoCredito = response['catalogo'];
    });
    this.catalogosService.getCatalogoTipoRecursos().subscribe(response => {
      this.catalogoTipoRecursos = response['catalogo'];
    });
    this.catalogosService.getCatalogoActivdadEconomica().subscribe(response => {
      this.catalogoActividadEconomica = response['catalogo'];
    });
    this.catalogosService.getCatalogoTipoAltaCredito2().subscribe(response => {
      this.catalogoTipoAltaCredito2 = response['catalogo'];
    });
    this.catalogosService.getCatalogoTipoGarantia().subscribe(response => {
      this.catalogoTipoGarantia = response['catalogo'];
    });
    this.catalogosService.getCatalogoGradoRiesgo().subscribe(response => {
      this.catalogoGradoRiesgo = response['catalogo'];
    });
    this.catalogosService.getCatalogoTipoCartera().subscribe(response => {
      this.catalogoTipoCartera = response['catalogo'];
    });
    this.catalogosService.getCatalogoDestinoCredito2().subscribe(response => {
      this.catalogoDestinoCredito2 = response['catalogo'];
    });
    this.catalogosService.getCatalogoTipoOperacion().subscribe(response => {
      this.catalogoTipoOperacion = response['catalogo'];
    });
    this.catalogosService.getCatalogoInstitucionFondeadora().subscribe(response => {
      this.catalogoInstitucionFondeadora = response['catalogo'];
    });
    this.catalogosService.getCatalogoEstado().subscribe(response => {
      this.catalogoEstado = response['catalogo'];
    });
    this.catalogosService.getCatalogoMoneda().subscribe(response => {
      this.catalogoMoneda = response['catalogo'];
    });
    this.catalogosService.getCatalogoMonedaT4().subscribe(response => {
      this.catalogoMonedat4 = response['catalogo'];
    });
    this.catalogosService.getCatalogoTipoTasaCredito().subscribe(response => {
      this.catalogoTipoTasaCredito = response['catalogo'];
    });
    this.catalogosService.getCatalogoTipoTasa().subscribe(response => {
      this.catalogoTipoTasa = response['catalogo'];
    });*/
  }

  onKeydown(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  formatter = (x: { nombreAcreditado: string }) => x.nombreAcreditado;

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200), map(txt => txt === '' ? [] :
        this.listaTabla4B
          .filter(obj => obj.nombreAcreditado.toLowerCase()
            .indexOf(txt.toLowerCase()) === 0)
          .slice(0, 10)
      )
    );
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
    this.selectedTabla4A = OperacionesActivasComponent.initTabla4A();
    this.selectedTabla5A = OperacionesActivasComponent.initTabla5A();
    this.selectedTabla1B = OperacionesActivasComponent.initTabla1B();
    this.selectedTabla2B = OperacionesActivasComponent.initTabla2B();
    this.selectedTabla4B = OperacionesActivasComponent.initTabla4B();

    this.tabla4AselectedFlag = false;
    this.tabla5AselectedFlag = false;
    this.tabla1BselectedFlag = false;
    this.tabla2BselectedFlag = false;
    this.tabla4BselectedFlag = false;

    this.listaTabla4A = [];
    this.listaTabla5A = [];
    this.listaTabla1B = [];
    this.listaTabla2B = [];
    this.listaTabla4B = [];

    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(CargarFechaReporteActivasModalComponent, ngbModalOptions).result.then(
      () => { },
      () => {
        this._dataService.fechaReporte.subscribe(fechaReporte => {
          this.fechaReporte = fechaReporte
        })
      }
    );
  }

  /**
   * Abre la ventana de edición de la Tabla 4A
   * @param tabla
   */
  openModalTabla4A(tabla: ITabla4): void {
    this.selectedTabla4A = tabla;
    this._dataService.changeSelectedTable4a(this.selectedTabla4A);
    this._dataService.setCatalogoMonedaLinea(this.catalogoMonedaLinea);
    this._dataService.setCatalogoSegmento(this.catalogoSegmento);
    this._dataService.setCatalogoTipoCobranza(this.catalogoTipoCobranza);
    this.selectedTabla4A = OperacionesActivasComponent.initTabla4A();
    this.tabla4AselectedFlag = false;
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    };
    this.modalService.open(AltaModificarTabla4aModalComponent, ngbModalOptions).result.then();
  }

  /**
   * Abre la ventana de edición de la Tabla 5A
   * @param tabla
   */
  openModalTabla5A(tabla: ITabla5): void {
    this.selectedTabla5A = tabla;
    this._dataService.changeSelectedTable5a(this.selectedTabla5A);
    this.selectedTabla5A = OperacionesActivasComponent.initTabla5A();
    this.tabla5AselectedFlag = false;
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      windowClass: 'modal-md'
    };
    this.modalService.open(AltaModificarTabla5aModalComponent, ngbModalOptions).result.then();
  }

  /**
   * Abre la ventana de edición de la Tabla 1B
   * @param tabla
   */
  openModalTabla1B(tabla: ITabla1): void {
    this.selectedTabla1B = tabla;
    this._dataService.setCatalogoCategoriaCredito(this.catalogoCategoriaCredito);
    this._dataService.setCatalogoTipoAltaCredito(this.catalogoTipoAltaCredito);
    this._dataService.setCatalogoTipoTasaCredito(this.catalogoTipoTasaCredito);
    this._dataService.setCatalogoDenominacionCredito(this.catalogoDenominacionCredito);
    this._dataService.setCatalogoDestinoCredito(this.catalogoDestinoCredito);
    this._dataService.setCatalogoConvenioJudicial(this.catalogoConvenioJudicial);
    this._dataService.setCatalogoSegmentoVivienda(this.catalogoSegmentoVivienda);
    this._dataService.setCatalogoTipoCobranza(this.catalogoTipoCobranza);
    this._dataService.setCatalogoEstadoCredito(this.catalogoEstadoCredito);
    this._dataService.setCatalogoTipoRecursos(this.catalogoTipoRecursos);
    this._dataService.changeSelectedTable1b(this.selectedTabla1B);
    this.selectedTabla1B = OperacionesActivasComponent.initTabla1B();
    this.tabla1BselectedFlag = false;
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    };
    this.modalService.open(AltaModificarTabla1bModalComponent, ngbModalOptions).result.then();
  }

  /**
   * Abre la ventana de edición de la Tabla 4B
   * @param tabla
   */
  openModalTabla4B(tabla: ITabla4B): void {
    this.selectedTabla4B = tabla;
    this._dataService.setCatalogoMonedat4(this.catalogoMonedat4);
    this._dataService.setCatalogoTipoTasaCredito(this.catalogoTipoTasaCredito);
    this._dataService.setCatalogoTipoCobranza(this.catalogoTipoCobranza);
    this._dataService.setCatalogoClasificacionContable(this.catalogoClasificacionContable);
    this._dataService.setCatalogoTipoCredito(this.catalogoTipoCredito);
    this._dataService.setCatalogoEscalaPeriodos(this.catalogoEscalaPeriodos);
    this._dataService.setCatalogoTipoGarantiat4(this.catalogoTipoGarantiat4);
    this._dataService.setCatalogoConYSinRestriccion(this.catalogoConSinRestriccion);
    this._dataService.changeSelectedTable4b(this.selectedTabla4B);
    this.selectedTabla4B = OperacionesActivasComponent.initTabla4B();
    this.tabla4BselectedFlag = false;
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    };
    this.modalService.open(AltaModificarTabla4bModalComponent, ngbModalOptions).result.then();
  }

  /**
   * Abre la ventana de edición de la Tabla 2B
   * @param tabla
   */
  openModalTabla2B(tabla: ITabla2): void {
    this.selectedTabla2B = tabla;
    this._dataService.setCatalogoActividadEconomica(this.catalogoActividadEconomica);
    this._dataService.setCatalogoTipoAltaCredito2(this.catalogoTipoAltaCredito2);
    this._dataService.setCatalogoMonedaLinea(this.catalogoMonedaLinea);
    this._dataService.setCatalogoTipoGarantia(this.catalogoTipoGarantia);
    this._dataService.setCatalogoGradoRiesgo(this.catalogoGradoRiesgo);
    this._dataService.setCatalogoTipoCartera(this.catalogoTipoCartera);
    this._dataService.setCatalogoDestinoCredito2(this.catalogoDestinoCredito2);
    this._dataService.setCatalogoTipoOperacion(this.catalogoTipoOperacion);
    this._dataService.setCatalogoTipoCobranza(this.catalogoTipoCobranza);
    this._dataService.setCatalogoEstado(this.catalogoEstado);
    this._dataService.setCatalogoTipoRecursos(this.catalogoTipoRecursos);
    this._dataService.setCatalogoSituacionCredito(this.catalogoSituacionCredito);
    this._dataService.setCatalogoInstitucionFondeadora(this.catalogoInstitucionFondeadora);
    this._dataService.changeSelectedTable2b(this.selectedTabla2B);
    this.selectedTabla2B = OperacionesActivasComponent.initTabla2B();
    this.tabla2BselectedFlag = false;
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    };
    this.modalService.open(AltaModificarTabla2bModalComponent, ngbModalOptions).result.then();
  }

  getTabla4A() {
    let month;
    let day;
    let tempFecha;
    if (this.fechaReporte !== undefined) {
      if (this.fechaReporte['month'] < 10) {
        month = '0' + this.fechaReporte['month'].toString();
      } else { month = this.fechaReporte['month'].toString(); }
      if (this.fechaReporte['day'] < 10) {
        day = '0' + this.fechaReporte['day'].toString();
      } else { day = this.fechaReporte['day'].toString(); }
      tempFecha = this.fechaReporte['year'].toString() + month + day;
      swal({
        title: 'Obteniendo información...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();

      this.operacionesActivasService.getTabla4(tempFecha, this.creditoTabla4A).subscribe(res => {
        this.selectedTabla4A = OperacionesActivasComponent.initTabla4A();
        this.tabla4AselectedFlag = false;
        if (res.header.estatus) {
          if (res.tabla4A.length > 0) {
            this.listaTabla4A = res['tabla4A'];
            swal(PopUpMessage.getSuccesMessage(res, null, null)).then();
          } else {
            swal(PopUpMessage.getAppErrorMessage('Sin resultado', 'La búsqueda retorno 0 coincidencias'))
              .then();
          }
        } else {
          swal(PopUpMessage.getAppErrorMessageReportId(res))
            .then();
        }
      });
    } else {
      swal(PopUpMessage.getValidateErrorMessage('Fecha'))
        .then();
    }
  }

  getTabla5A() {
    let month;
    let day;
    let tempFecha;
    if (this.fechaReporte !== undefined) {
      if (this.fechaReporte['month'] < 10) {
        month = '0' + this.fechaReporte['month'].toString();
      } else { month = this.fechaReporte['month'].toString(); }
      if (this.fechaReporte['day'] < 10) {
        day = '0' + this.fechaReporte['day'].toString();
      } else { day = this.fechaReporte['day'].toString(); }
      tempFecha = this.fechaReporte['year'].toString() + month + day;
      swal({
        title: 'Obteniendo información...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.operacionesActivasService.getTabla5(tempFecha, this.clienteTabla5A, this.creditoTabla5A).subscribe(res => {
        this.selectedTabla5A = OperacionesActivasComponent.initTabla5A();
        this.tabla5AselectedFlag = false;
        if (res.header.estatus) {
          if (res.lista.length > 0) {
            this.listaTabla5A = res['lista'];
            swal(PopUpMessage.getSuccesMessage(res, null, null)).then();
          } else {
            swal(PopUpMessage.getAppErrorMessage('Sin resultado', 'La búsqueda retorno 0 coincidencias'))
              .then();
          }
        } else {
          swal(PopUpMessage.getAppErrorMessageReportId(res))
            .then();
        }
      });
    } else {
      swal(PopUpMessage.getValidateErrorMessage('Fecha'))
        .then();
    }
  }

  getTabla1B() {
    let month;
    let day;
    let tempFecha;
    if (this.fechaReporte !== undefined) {
      if (this.fechaReporte['month'] < 10) {
        month = '0' + this.fechaReporte['month'].toString();
      } else { month = this.fechaReporte['month'].toString(); }
      if (this.fechaReporte['day'] < 10) {
        day = '0' + this.fechaReporte['day'].toString();
      } else { day = this.fechaReporte['day'].toString(); }
      tempFecha = this.fechaReporte['year'].toString() + month + day;
      swal({
        title: 'Obteniendo información...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();

      this.operacionesActivasService.getTabla1B(tempFecha, this.clienteTabla1B, this.creditoTabla1B).subscribe(res => {
        this.selectedTabla1B = OperacionesActivasComponent.initTabla1B();
        this.tabla1BselectedFlag = false;
        if (res.header.estatus) {
          if (res.lista.length > 0) {
            this.listaTabla1B = res['lista'];
            swal(PopUpMessage.getSuccesMessage(res, null, null)).then();
          } else {
            swal(PopUpMessage.getAppErrorMessage('Sin resultado', 'La búsqueda retorno 0 coincidencias'))
              .then();
          }
        } else {
          swal(PopUpMessage.getAppErrorMessageReportId(res))
            .then();
        }
      });
    } else {
      swal(PopUpMessage.getValidateErrorMessage('Fecha'))
        .then();
    }

  }

  getTabla2BR() {
    let month;
    let day;
    let tempFecha;
    if (this.fechaReporte !== undefined) {
      if (this.fechaReporte['month'] < 10) {
        month = '0' + this.fechaReporte['month'].toString();
      } else { month = this.fechaReporte['month'].toString(); }
      if (this.fechaReporte['day'] < 10) {
        day = '0' + this.fechaReporte['day'].toString();
      } else { day = this.fechaReporte['day'].toString(); }
      tempFecha = this.fechaReporte['year'].toString() + month + day;
      swal({
        title: 'Obteniendo información...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();

      this.operacionesActivasService.getTabla2B(tempFecha, this.clienteTabla2B, this.creditoTabla2B).subscribe(res => {
        this.selectedTabla2B = OperacionesActivasComponent.initTabla2B();
        this.tabla2BselectedFlag = false;
        if (res.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(res)).then(() => { });
        } else {
          if (res.lista.length > 0) {
            this.listaTabla2B = res['lista'];
            swal(PopUpMessage.getSuccesMessage(res, null, null)).then();
          } else {
            swal(PopUpMessage.getAppErrorMessage('Sin resultado', 'La búsqueda retorno 0 coincidencias'))
              .then();
          }
        }
      });
    } else {
      swal(PopUpMessage.getValidateErrorMessage('Fecha'))
        .then();
    }

  }

  getTabla4B() {
    if (this.validaGuardar()) {
      let month;
      let day;
      let tempFecha;
      if (this.fechaReporte !== undefined) {
        if (this.fechaReporte['month'] < 10) {
          month = '0' + this.fechaReporte['month'].toString();
        } else { month = this.fechaReporte['month'].toString(); }
        if (this.fechaReporte['day'] < 10) {
          day = '0' + this.fechaReporte['day'].toString();
        } else { day = this.fechaReporte['day'].toString(); }
        tempFecha = this.fechaReporte['year'].toString() + month + day;
        swal({
          title: 'Obteniendo información...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.operacionesActivasService.getTabla4B(tempFecha, this.clienteTabla4B, this.creditoTabla4B).subscribe(
          response => {
            this.selectedTabla4B = OperacionesActivasComponent.initTabla4B();
            this.tabla4BselectedFlag = false;
            if (response.header['estatus'] === false) {
              swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
            } else {
              if (response.lista.length > 0) {
                this.listaTabla4B = response['lista'];
                swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
              } else {
                swal(PopUpMessage.getAppErrorMessage('Sin resultado', 'La búsqueda retorno 0 coincidencias'))
                  .then();
              }
            }
          },
          err => {
            swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
              console.error(err);
            });
          });
      } else {
        swal(PopUpMessage.getValidateErrorMessage('Fecha'))
          .then();
      }
    }
  }

  onSelectedTabla4A(tabla: ITabla4) {
    this.tabla4AselectedFlag = true;
    this.selectedTabla4A = tabla;
  }

  onSelectedTabla5A(tabla: ITabla5) {
    this.tabla5AselectedFlag = true;
    this.selectedTabla5A = tabla;
  }

  onSelectedTabla1B(tabla: ITabla1) {
    this.tabla1BselectedFlag = true;
    this.selectedTabla1B = tabla;
  }

  onSelectedTabla2B(tabla: ITabla2) {
    this.tabla2BselectedFlag = true;
    this.selectedTabla2B = tabla;
  }

  onSelectedTabla4B(tabla: ITabla4B) {
    this.tabla4BselectedFlag = true;
    this.selectedTabla4B = tabla;
  }

  ngAfterViewInit() {
    const element = document.querySelectorAll<HTMLElement>('.nav-tabs');
    element[0].style.flexWrap = 'nowrap';
  }

  /**
   * Sólo permite la escritura de números
   * @param event Evento desencadenador
   */
  onKeyPressCodigo(event: KeyboardEvent): void {
    const pattern = /[0-9\b]/;
    const inputChar = event.key;

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  onSelectedSeccion(row: ITabla2): void {
    this._dataService.changeSelectedTable2b(row);
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificarTabla2bModalComponent, ngbModalOptions);
  }

  /**
   * Valida los datos antes de guardar la información
   */
  validaGuardar(): boolean {
    if (this.clienteTabla4B === null || this.clienteTabla4B.trim().length === 0) {
      swal('Ingrese el cliente.', '', 'warning');
      return false;
    }
    return true;
  }

  /**
   * Retorna un objeto para tabla 4A
   */
  private static initTabla4A(): ITabla4 {
    return {
      numeroCredito: '',
      moneda: 0,
      segmento: 0,
      tipoCobranza: 0,
      capitalVigente: '',
      capitalVencido: '',
      interesesOrdinariosExigibles: '',
      interesesMoratorios: '',
      otrosAccesorios: '',
      fecha: ''
    };
  }

  /**
   * Retorna un objeto para tabla 5A
   */
  private static initTabla5A(): ITabla5 {
    return {
      fecha: '',
      claveUnica: '',
      numeroCredito: ''
    };
  }

  /**
   * Retorna un objeto para tabla 1B
   */
  private static initTabla1B(): ITabla1 {
    return {
      claveUnica: '',
      nombreAcreditado: '',
      periodoReporta: '',
      identificadorCredito: '',
      categoriaCredito: '',
      tipoAltaCredito: '',
      destinoCredito: '',
      fechaOtorgamiento: '',
      fechaVencimiento: '',
      montoOriginalCredito: '',
      valorVivienda: '',
      tipoTasaInteresCredito: '',
      denominacionCredito: '',
      tasaInteresAplicadaPeriodo: '',
      responsabilidadTotalFinalPeriodo: '',
      fechaUltimoPago: '',
      situacionCredito: 0,
      probabilidadIncumplimiento: '',
      severidadPerdida: '',
      diasAtraso: '',
      montoSubcuentaGarantiaCred: '',
      convenioJudicialFideicomisoGar: '',
      reservas: '',
      segmentoVivienda: '',
      tipoCobranza: 0,
      capitalVencidoOperativo: '',
      interesOrdinariosExigibles: '',
      interesesMoratorios: '',
      capitalVigenteOperativo: '',
      otrosAccesorios: '',
      estado: '',
      tipoRecursos: '',
      loadDate: ''
    };
  }

  /**
   * Retorna un objeto para tabla 2B
   */
  private static initTabla2B(): ITabla2 {
    return {
      fecha: '',
      claveUnica: '',
      nombreAcreditado: '',
      periodoReporta: '',
      identificadorCredito: '',
      grupoRiesgo: '',
      actividadEconomica: '',
      numeroEmpleados: 0,
      ingresosBrutosAnuales: 0,
      tipoAltaCredito: '',
      montoLineaCreditoAutorizada: 0,
      monedaLineaCredito: '',
      fechaVencimientoLineaCredito: '',
      porcentajeGarantizadoCredito: 0,
      tipoGarantia: '',
      numeroDisposicion: '',
      gradoRiesgo: '',
      situacionCredito: '',
      tasaInteresBrutaPeriodo: '',
      numeroDiasAtraso: '',
      saldoInsoluto: '',
      reservas: '',
      tipoCartera: '',
      destinoCredito: '',
      tipoOperacion: '',
      porcentajeParticipacionesFederalesComprometidasFuentePagoCredito: '',
      montoFondeadoBancoFondoFomento: '',
      institucionBancaDesarrolloFondoFomentoOtorgoFondeo: '',
      porcentajeBrutoNoCubiertoCredito: '',
      severidadPerdidaSegmentoNoCubierto: '',
      montoBrutoExposicionIncumplimientoSinGarantia: '',
      porcentajeBrutoCoberturaGarantiaReal: '',
      valorContableGarantiaRealFinanciera: '',
      severidadPerdidaAjustadaGarantiasRealesFinancieras: '',
      exposicionIncumplimientoAjustadaGarantiasRealesFinancieras: '',
      porcentajeBrutoGarantiaRealNoFinanciada: '',
      valorGarantiaDerechosCobro: '',
      valorGarantiaBienesInmuebles: '',
      valorGarantiaBienesMuebles: '',
      valorGarantiaFideicomisosGarantiaAdministracionesParticipacionesFederalesAportacionesFederalesComoFP: '',
      valorGarantiaFideicomisosGarantiaAdministracionIngresosPropiosComoFuente: '',
      valorGarantiaOtrasGarantiasRealesNoFinancieras: '',
      severidadPerdidaAjustadaDerechosCobro: '',
      severidadPerdidaAjustadaBienesInmuebles: '',
      severidadPerdidaAjustadaBienesMuebles: '',
      severidadPerdidaAjustadaFideicomisosGarantiaAdministracionParticipacionesFederalesAportacionesFederalesComoFP: '',
      severidadPerdidaAjustadaFideicomisosGarantiaAdministracionIngresosPropiosComoFP: '',
      severidadPerdidaAjustadaOtrasGarantiasRealesNoFinancieras: '',
      totalSeveridadPerdidaGarantiasRealesNoFinancieras: '',
      porcentajeBrutoCubiertoGarantiasPersonales: '',
      porcentajeCubiertoObligadoSolidarioAvalDistintoEntidadFederativaMunicipio: '',
      montoCubiertoGarantiaPersonal: '',
      valuacionMercadoDerivadoCredito: '',
      porcentajeCubiertoEsquemasPasoMedida: '',
      porcentajeCubiertoEsquemasPrimerasPerdidas: '',
      montoCubiertoEsquemasPasoMedida: '',
      montoCubiertoEsquemasPrimerasPerdidas: '',
      severidadPerdidaTotal: '',
      severidadPerdidaGarante: '',
      severidadPerdidaAcreditado: '',
      exposicionIncumplimientoTotal: '',
      exposicionIncumplimientoGarante: '',
      exposicionIncumplimientoAcreditado: '',
      probabilidadIncumplimientoTotal: '',
      probabilidadIncumplimientoGarante: '',
      probabilidadIncumplimientoAcreditado: '',
      tipoCobranza: 0,
      capitalVencidoOperativo: 0,
      interesesOrdinariosExigibles: 0,
      interesesMoratorios: 0,
      otrosAccesorios: 0,
      capitalVigenteOperativo: 0,
      estado: '',
      plazoTotalCredito: 0,
      plazoMesesVencimiento: 0,
      tipoRecursos: ''
    };
  }

  /**
   * Retorna un objeto para tabla 4B
   */
  private static initTabla4B(): ITabla4B {
    return {
      claveUnica: '',
      nombreAcreditado: '',
      periodoReporta: '',
      identificadorCredito: '',
      clasificacionContable: '',
      tipoCredito: '',
      moneda: '',
      conSinRestriccion: '',
      escalaPeriodosFacturacion: '',
      tipoTasaCredito: '',
      fechaInicio: '',
      fechaVencimiento: '',
      plazoTotal: '',
      importeOriginalCredito: '',
      tasaInteres: '',
      plazoRemanente: '',
      saldoTotalCredito: '',
      montoExigible: '',
      pagoRealizado: '',
      diasAtraso: '',
      tipoGarantia: '',
      importeGarantia: '',
      probabilidadIncumplimiento: '',
      severidadPerdidaCubierta: '',
      severidadPerdidaNoCubierta: '',
      reservas: '',
      tipoCobranza: 0,
      capitalVencidoOperativo: 0,
      interesesOrdinariosExigibles: 0,
      interesesMoratorios: 0,
      otrosAccesorios: 0,
      capitalVigenteOperativo: 0,
      loadDate: ''
    };
  }
}
