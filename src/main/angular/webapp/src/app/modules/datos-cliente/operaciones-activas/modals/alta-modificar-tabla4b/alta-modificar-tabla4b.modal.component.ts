import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDate } from '@interfaces/date.interface';
import { OperacionesActivasDataService } from '@services/operaciones-activas-data.service';
import { ITabla4B } from '@interfaces/operaciones-activas.interface';
import { Subscription } from 'rxjs/Subscription';
import {ICatalogoGenerico} from "@interfaces/catalogos.interface";
import {DateHelper} from "@helpers/DateHelper";
import swal from "sweetalert2";
import {PopUpMessage} from "@helpers/PopUpMessage";
import {OperacionesActivasService} from "@services/operaciones-activas.service";

@Component({
  selector: 'app-alta-modificar-tabla4b',
  templateUrl: './alta-modificar-tabla4b.modal.component.html',
  styleUrls: ['./alta-modificar-tabla4b.modal.component.scss']
})
export class AltaModificarTabla4bModalComponent implements OnInit, OnDestroy {

  selectedAcreditadoTabla4B: ITabla4B;
  nuevaTabla4B: ITabla4B;
  fechaPeriodo: IDate;
  fechaInicio: IDate;
  fechaVencimiento: IDate;

  catalogoMonedat4: ICatalogoGenerico[];
  catalogoConSinRestricciones: ICatalogoGenerico[];
  catalogoTipoTasaCredito: ICatalogoGenerico[];
  catalogoTipoCobranza: ICatalogoGenerico[];
  catalogoClasificacionContabe: ICatalogoGenerico[];
  catalogoTipoCredito: ICatalogoGenerico[];
  catalogoEscalaPeriodos: ICatalogoGenerico[];
  catalogoTipoGarantiat4: ICatalogoGenerico[];

  selectedMonedat4: string;
  selectedConSinRestricciones: string;
  selectedTipoTasaCredito: string;
  selectedTipoCobranza: string;
  selectedClasificacionContabe: string;
  selectedTipoCredito: string;
  selectedEscalaPeriodos: string;
  selectedTipoGarantiat4: string;

  periodoPattern: string;

  private subscriptionCatMonedat4: Subscription;
  private subscriptionCatConSinRestricciones: Subscription;
  private subscriptionCatTipoTasaCredito: Subscription;
  private subscriptionCatTipoCobranza: Subscription;
  private subscriptionCatClasificacionContable: Subscription;
  private subscriptionCatTipoCredito: Subscription;
  private subscriptionCatEscalaPeriodos: Subscription;
  private subscriptionCatTipoGarantiat4: Subscription;
  private selectedTable4BSubscribe: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private _data$: OperacionesActivasDataService,
              private operacionesActivasService: OperacionesActivasService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.periodoPattern = '^\\d{4,4}(([0][1-9])|([1][0-2]))$';
    this.selectedAcreditadoTabla4B = AltaModificarTabla4bModalComponent.initAcreditado();
    this.subscriptionCatMonedat4 = this._data$.catalogoMonedat4.subscribe(catalogo => {
      this.catalogoMonedat4 = catalogo;
    });
    this.subscriptionCatConSinRestricciones = this._data$.catalogoConYSinRestriccion.subscribe(catalogo => {
      this.catalogoConSinRestricciones = catalogo;
    });
    this.subscriptionCatTipoTasaCredito = this._data$.catalogoTipoTasaCredito.subscribe(catalogo => {
      this.catalogoTipoTasaCredito = catalogo;
    });
    this.subscriptionCatTipoCobranza = this._data$.catalogoTipoCobranza.subscribe(catalogo => {
      this.catalogoTipoCobranza = catalogo;
    });
    this.subscriptionCatClasificacionContable = this._data$.catalogoClasificacionContable.subscribe(catalogo => {
      this.catalogoClasificacionContabe = catalogo;
    });
    this.subscriptionCatTipoCredito = this._data$.catalogoTipoCredito.subscribe(catalogo => {
      this.catalogoTipoCredito = catalogo;
    });
    this.subscriptionCatEscalaPeriodos = this._data$.catalogoEscalaPeriodos.subscribe(catalogo => {
      this.catalogoEscalaPeriodos = catalogo;
    });
    this.subscriptionCatTipoGarantiat4 = this._data$.catalogoTipoGarantiat4.subscribe(catalogo => {
      this.catalogoTipoGarantiat4 = catalogo;
    });
    this.selectedTable4BSubscribe = this._data$.selectedTable4b
      .subscribe((tabla4b) => {
        this.selectedAcreditadoTabla4B = tabla4b;
        if (this.selectedAcreditadoTabla4B.fechaVencimiento !== undefined) {
          if (this.selectedAcreditadoTabla4B.fechaVencimiento.trim().length !== 0) {
            const stringFechaVencimiento = this.selectedAcreditadoTabla4B.fechaVencimiento;
            this.fechaVencimiento = DateHelper.convertStringToIDate(stringFechaVencimiento);
          }
        }
        if (this.selectedAcreditadoTabla4B.fechaInicio !== undefined) {
          if (this.selectedAcreditadoTabla4B.fechaInicio.trim().length !== 0) {
            const stringFechaInicio = this.selectedAcreditadoTabla4B.fechaInicio;
            this.fechaInicio = DateHelper.convertStringToIDate(stringFechaInicio);
          }
        }
        this.selectedMonedat4 = this.selectedAcreditadoTabla4B.moneda;
        this.selectedConSinRestricciones = this.selectedAcreditadoTabla4B.conSinRestriccion;
        this.selectedTipoTasaCredito = this.selectedAcreditadoTabla4B.tipoTasaCredito;
        if (this.selectedAcreditadoTabla4B.tipoCobranza !== undefined) {
          if (this.selectedAcreditadoTabla4B.tipoCobranza !== 0) {
            this.selectedTipoCobranza = this.selectedAcreditadoTabla4B.tipoCobranza.toString();
          }
        }
        this.selectedClasificacionContabe = this.selectedAcreditadoTabla4B.clasificacionContable;
        this.selectedTipoCredito = this.selectedAcreditadoTabla4B.tipoCredito;
        this.selectedEscalaPeriodos = this.selectedAcreditadoTabla4B.escalaPeriodosFacturacion;
        this.selectedTipoGarantiat4 = this.selectedAcreditadoTabla4B.tipoGarantia;
      });
  }

  ngOnDestroy() {
    this.selectedTable4BSubscribe.unsubscribe();
    this.subscriptionCatMonedat4.unsubscribe();
    this.subscriptionCatConSinRestricciones.unsubscribe();
    this.subscriptionCatTipoTasaCredito.unsubscribe();
    this.subscriptionCatTipoCobranza.unsubscribe();
    this.subscriptionCatClasificacionContable.unsubscribe();
    this.subscriptionCatTipoCredito.unsubscribe();
    this.subscriptionCatEscalaPeriodos.unsubscribe();
    this.subscriptionCatTipoGarantiat4.unsubscribe();
  }

  onClickAceptar(): void {
    if (this.validaGuardar()) {
      let month;
      let day;
      let tempFecha;
      this.nuevaTabla4B = this.selectedAcreditadoTabla4B;

      if (this.fechaVencimiento['month'] < 10) {
        month = '0' + this.fechaVencimiento['month'].toString();
      } else { month = this.fechaVencimiento['month'].toString(); }
      if (this.fechaVencimiento['day'] < 10) {
        day = '0' + this.fechaVencimiento['day'].toString();
      } else { day = this.fechaVencimiento['day'].toString(); }
      tempFecha = this.fechaVencimiento['year'].toString() + month + day;
      this.nuevaTabla4B.fechaVencimiento = tempFecha;

      if (this.fechaInicio['month'] < 10) {
        month = '0' + this.fechaInicio['month'].toString();
      } else { month = this.fechaInicio['month'].toString(); }
      if (this.fechaInicio['day'] < 10) {
        day = '0' + this.fechaInicio['day'].toString();
      } else { day = this.fechaInicio['day'].toString(); }
      tempFecha = this.fechaInicio['year'].toString() + month + day;
      this.nuevaTabla4B.fechaInicio = tempFecha;

      swal({
        title: 'Obteniendo información...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.operacionesActivasService.updateTabla4B(this.nuevaTabla4B).subscribe(
        response => {
          if (response.header['estatus'] === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
          } else {
            swal(PopUpMessage.getSuccesMessage(response, 'Actualización exitosa.', null)).then(() => {
              this.activeModal.close('close');
            });
          }
        },
        err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });
    }
  }

  /**
   * Valida los datos antes de guardar la información
   */
  validaGuardar(): boolean {
    if (this.selectedAcreditadoTabla4B.periodoReporta === null || this.selectedAcreditadoTabla4B.periodoReporta.trim().length === 0) {
      swal('Ingrese el periodo.', '', 'warning');
      return false;
    }
    if (this.selectedAcreditadoTabla4B.periodoReporta.trim().length < 6) {
      swal('Ingrese el periodo a 6 dígitos.', '', 'warning');
      return false;
    }
    if (this.fechaVencimiento === null || this.fechaVencimiento === undefined) {
      swal('Ingrese fecha de vencimiento.', '', 'warning');
      return false;
    }
    if (this.fechaInicio === null || this.fechaVencimiento === undefined) {
      swal('Ingrese fecha de vencimiento.', '', 'warning');
      return false;
    }
    return true;
  }


  /**
   * Retorna un objeto para solicitudes
   */
  private static initAcreditado(): ITabla4B {
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
