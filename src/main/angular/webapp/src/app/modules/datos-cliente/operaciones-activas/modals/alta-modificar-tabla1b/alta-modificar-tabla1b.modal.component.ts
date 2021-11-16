import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITabla1, ITabla4} from "@interfaces/operaciones-activas.interface";
import {NgbActiveModal, NgbCalendar, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OperacionesActivasDataService} from "@services/operaciones-activas-data.service";
import {ICatalogoGenerico} from "@interfaces/catalogos.interface";
import {Subscription} from "rxjs/Subscription";
import {IDate} from "@interfaces/date.interface";
import {DateHelper} from "@helpers/DateHelper";
import swal from "sweetalert2";
import {PopUpMessage} from "@helpers/PopUpMessage";
import {OperacionesActivasService} from "@services/operaciones-activas.service";

@Component({
  selector: 'app-alta-modificar-tabla1b',
  templateUrl: './alta-modificar-tabla1b.modal.component.html',
  styleUrls: ['./alta-modificar-tabla1b.modal.component.scss']
})
export class AltaModificarTabla1bModalComponent implements OnInit, OnDestroy {

  catalogoCategoriaCredito: ICatalogoGenerico[];
  catalogoTipoAltaCredito: ICatalogoGenerico[];
  catalogoTipoTasaCredito: ICatalogoGenerico[];
  catalogoDenominacionCredito: ICatalogoGenerico[];
  catalogoDestinoCredito: ICatalogoGenerico[];
  catalogoConvenioJudicial: ICatalogoGenerico[];
  catalogoSegmentoVivienda: ICatalogoGenerico[];
  catalogoEstadoCredito: ICatalogoGenerico[];
  catalogoTipoCobranza: ICatalogoGenerico[];
  catalogoTipoRecursos: ICatalogoGenerico[];

  localTabla1B: ITabla1;
  nuevaTabla1B: ITabla1;

  selectedCategoriaCredito: string;
  selectedTipoAltaCredito: string;
  selectedDestinoCredito: string;
  selectedTipoTasaIntCredito: string;
  selectedDenominacionCredito: string;
  selectedConvenioJudicial: string;
  selectedSegmentoVivienda: string;
  selectedTipoCobranza: string;
  selectedEstadoCredito: string;
  selectedTipoRecurso: string;

  today: IDate;
  fechaOtorgamiento: IDate;
  fechaUltimoPago: IDate;
  fechaVencimiento: IDate;
  periodo: IDate;

  decimalPattern: string;
  decimal6Pattern: string;
  enteroPattern: string;

  private subscriptionCatEstadoCredito: Subscription;
  private subscriptionCatTipoTasaCredito: Subscription;
  private subscriptionCatTipoAltaCredito: Subscription;
  private subscriptionCatDenominacionCredito: Subscription;
  private subscriptionCatDestinoCredito: Subscription;
  private subscriptionCatConvenioJudicial: Subscription;
  private subscriptionCatSegmentoVivienda: Subscription;
  private subscriptionCatTipoCobranza: Subscription;
  private subscriptionCatTipoRecursos: Subscription;
  private subscriptionCatCategoriaCredito: Subscription;

  private subscriptionSelectedTabla1B: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private _data$: OperacionesActivasDataService,
              private operacionesActivasService: OperacionesActivasService,
              private _calendar: NgbCalendar) { }

  ngOnInit() {
    this.decimalPattern = '^[0-9]+[.][0-9][0-9]$';
    this.decimal6Pattern = '^[0-9]+[.]\\d{2,6}$';
    this.enteroPattern = '^[0-9]+$';
    this.subscriptionCatTipoAltaCredito = this._data$.catalogoTipoAltaCredito.subscribe(catalogo => {
      this.catalogoTipoAltaCredito = catalogo;
    });
    this.subscriptionCatTipoTasaCredito = this._data$.catalogoTipoTasaCredito.subscribe(catalogo => {
      this.catalogoTipoTasaCredito = catalogo;
    });
    this.subscriptionCatDenominacionCredito = this._data$.catalogoDenominacionCredito.subscribe(catalogo => {
      this.catalogoDenominacionCredito = catalogo;
    });
    this.subscriptionCatDestinoCredito = this._data$.catalogoDestinoCredito.subscribe(catalogo => {
      this.catalogoDestinoCredito = catalogo;
    });
    this.subscriptionCatConvenioJudicial = this._data$.catalogoConvenioJudicial.subscribe(catalogo => {
      this.catalogoConvenioJudicial = catalogo;
    });
    this.subscriptionCatSegmentoVivienda = this._data$.catalogoSegmentoVivienda.subscribe(catalogo => {
      this.catalogoSegmentoVivienda = catalogo;
    });
    this.subscriptionCatEstadoCredito = this._data$.catalogoEstadoCredito.subscribe(catalogo => {
      this.catalogoEstadoCredito = catalogo;
    });
    this.subscriptionCatTipoCobranza = this._data$.catalogoTipoCobranza.subscribe(catalogo => {
      this.catalogoTipoCobranza = catalogo;
    });
    this.subscriptionCatTipoRecursos = this._data$.catalogoTipoRecursos.subscribe(catalogo => {
      this.catalogoTipoRecursos = catalogo;
    });
    this.subscriptionCatCategoriaCredito = this._data$.catalogoCategoriaCredito.subscribe(catalogo => {
      this.catalogoCategoriaCredito = catalogo;
    });
    this.subscriptionSelectedTabla1B = this._data$.selectedTable1b.subscribe(tabla1 => {
      this.localTabla1B = tabla1;
      if (this.localTabla1B.fechaVencimiento !== undefined) {
        if (this.localTabla1B.fechaVencimiento.trim().length !== 0) {
          const stringfechaVencimiento = this.localTabla1B.fechaVencimiento;
          this.fechaVencimiento = DateHelper.convertStringToIDate(stringfechaVencimiento);
        }
      }
      if (this.localTabla1B.fechaOtorgamiento !== undefined) {
        if (this.localTabla1B.fechaOtorgamiento.trim().length !== 0) {
          const stringfechaOtorgamiento = this.localTabla1B.fechaOtorgamiento;
          this.fechaOtorgamiento = DateHelper.convertStringToIDate(stringfechaOtorgamiento);
        }
      }
      if (this.localTabla1B.fechaUltimoPago !== undefined) {
        if (this.localTabla1B.fechaUltimoPago.trim().length !== 0) {
          const stringfechaUltimoPago = this.localTabla1B.fechaUltimoPago;
          this.fechaUltimoPago = DateHelper.convertStringToIDate(stringfechaUltimoPago);
        }
      }
      this.selectedTipoAltaCredito = this.localTabla1B.tipoAltaCredito;
      this.selectedTipoTasaIntCredito = this.localTabla1B.tipoTasaInteresCredito;
      this.selectedDenominacionCredito = this.localTabla1B.denominacionCredito;
      this.selectedDestinoCredito = this.localTabla1B.destinoCredito;
      this.selectedConvenioJudicial = this.localTabla1B.convenioJudicialFideicomisoGar;
      this.selectedSegmentoVivienda = this.localTabla1B.segmentoVivienda;
      this.selectedEstadoCredito = this.localTabla1B.estado;
      this.selectedTipoCobranza = this.localTabla1B.tipoCobranza.toString();
      this.selectedTipoRecurso = this.localTabla1B.tipoRecursos;
      this.selectedCategoriaCredito = this.localTabla1B.categoriaCredito;
    });
  }

  ngOnDestroy() {
    this.subscriptionCatEstadoCredito.unsubscribe();
    this.subscriptionCatTipoTasaCredito.unsubscribe();
    this.subscriptionCatTipoAltaCredito.unsubscribe();
    this.subscriptionCatDenominacionCredito.unsubscribe();
    this.subscriptionCatDestinoCredito.unsubscribe();
    this.subscriptionCatConvenioJudicial.unsubscribe();
    this.subscriptionCatSegmentoVivienda.unsubscribe();
    this.subscriptionCatTipoCobranza.unsubscribe();
    this.subscriptionCatTipoRecursos.unsubscribe();
    this.subscriptionSelectedTabla1B.unsubscribe();
    this.subscriptionCatCategoriaCredito.unsubscribe();
  }

  onClickAceptar(): void {
    if (this.validaGuardar()) {
      let month;
      let day;
      let tempFecha;
      this.nuevaTabla1B = this.localTabla1B;

      if (this.fechaOtorgamiento['month'] < 10) {
        month = '0' + this.fechaOtorgamiento['month'].toString();
      } else { month = this.fechaOtorgamiento['month'].toString(); }
      if (this.fechaOtorgamiento['day'] < 10) {
        day = '0' + this.fechaOtorgamiento['day'].toString();
      } else { day = this.fechaOtorgamiento['day'].toString(); }
      tempFecha = this.fechaOtorgamiento['year'].toString() + month + day;
      this.nuevaTabla1B.fechaOtorgamiento = tempFecha;

      if (this.fechaVencimiento['month'] < 10) {
        month = '0' + this.fechaVencimiento['month'].toString();
      } else { month = this.fechaVencimiento['month'].toString(); }
      if (this.fechaVencimiento['day'] < 10) {
        day = '0' + this.fechaVencimiento['day'].toString();
      } else { day = this.fechaVencimiento['day'].toString(); }
      tempFecha = this.fechaVencimiento['year'].toString() + month + day;
      this.nuevaTabla1B.fechaVencimiento = tempFecha;

      if (this.fechaUltimoPago['month'] < 10) {
        month = '0' + this.fechaUltimoPago['month'].toString();
      } else { month = this.fechaUltimoPago['month'].toString(); }
      if (this.fechaUltimoPago['day'] < 10) {
        day = '0' + this.fechaUltimoPago['day'].toString();
      } else { day = this.fechaUltimoPago['day'].toString(); }
      tempFecha = this.fechaUltimoPago['year'].toString() + month + day;
      this.nuevaTabla1B.fechaUltimoPago = tempFecha;

      swal({
        title: 'Obteniendo información...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.operacionesActivasService.updateTabla1B(this.nuevaTabla1B).subscribe(
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
    if (this.localTabla1B.periodoReporta === null || this.localTabla1B.periodoReporta.trim().length === 0) {
      swal('Ingrese el periodo.', '', 'warning');
      return false;
    }
    if (this.localTabla1B.periodoReporta.trim().length < 6) {
      swal('Ingrese el periodo a 6 dígitos.', '', 'warning');
      return false;
    }
    if (this.fechaUltimoPago === null || this.fechaUltimoPago === undefined) {
      swal('Ingrese fecha último pago.', '', 'warning');
      return false;
    }
    if (this.fechaOtorgamiento === null || this.fechaOtorgamiento === undefined) {
      swal('Ingrese fecha de otorgamiento.', '', 'warning');
      return false;
    }
    if (this.fechaVencimiento === null || this.fechaVencimiento === undefined) {
      swal('Ingrese fecha de vencimiento.', '', 'warning');
      return false;
    }
    return true;
  }
}
