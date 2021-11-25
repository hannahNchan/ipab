import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITabla2 } from '@interfaces/operaciones-activas.interface';
import { Subscription } from 'rxjs';
import { OperacionesActivasDataService } from '@services/operaciones-activas-data.service';
import { ICatalogoGenerico } from '@interfaces/catalogos.interface';
import { IDate } from '@interfaces/date.interface';
import { DateHelper } from '@helpers/DateHelper';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';
import { OperacionesActivasService } from '@services/operaciones-activas.service';

@Component({
  selector: 'app-alta-modificar-tabla2b',
  templateUrl: './alta-modificar-tabla2b.modal.component.html',
  styleUrls: ['./alta-modificar-tabla2b.modal.component.scss']
})
export class AltaModificarTabla2bModalComponent implements OnInit, OnDestroy {

  catalogoActividadEconomica: ICatalogoGenerico[];
  catalogoTipoAltaCredito2: ICatalogoGenerico[];
  catalogoMonedaLinea: ICatalogoGenerico[];
  catalogoTipoGarantia: ICatalogoGenerico[];
  catalogoGradoRiesgo: ICatalogoGenerico[];
  catalogoTipoCartera: ICatalogoGenerico[];
  catalogoDestinoCredito2: ICatalogoGenerico[];
  catalogoTipoOperacion: ICatalogoGenerico[];
  catalogoInstitucionFondeadora: ICatalogoGenerico[];
  catalogoTipoCobranza: ICatalogoGenerico[];
  catalogoEstado: ICatalogoGenerico[];
  catalogoTipoRecursos: ICatalogoGenerico[];
  catalogoSituacionCredito: ICatalogoGenerico[];

  localTabla2B: ITabla2;
  nuevaTabla2B: ITabla2;

  selectedActividadEconomica: string;
  selectedTipoAltaCredito: string;
  selectedMonedaLinea: string;
  selectedTipoGarantia: string;
  selectedGradoRiesgo: string;
  selectedTipoCartera: string;
  selectedDestinoCredito2: string;
  selectedTipoOperacion: string;
  selectedInstitucionFondeadora: string;
  selectedTipoCobranza: string;
  selectedEstado: string;
  selectedTipoRecursos: string;
  selectedSituacionCredito: string;

  today; IDate;
  fechaVencimientoLineaCredito: IDate;

  private subscriptionCatActividadEconomica: Subscription;
  private subscriptionCatMonedaLinea: Subscription;
  private subscriptionCatTipoAltaCredito2: Subscription;
  private subscriptionCatTipoGarantia: Subscription;
  private subscriptionCatGradoRiesgo: Subscription;
  private subscriptionCatTipoCartera: Subscription;
  private subscriptionCatDestinoCredito2: Subscription;
  private subscriptionCatTipoOperacion: Subscription;
  private subscriptionCatInstitucionFondeadora: Subscription;
  private subscriptionCatTipoCobranza: Subscription;
  private subscriptionCatEstado: Subscription;
  private subscriptionCatTipoRecursos: Subscription;
  private subscriptionCatSituacionCredito: Subscription;
  private _tabla2bSubscription: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private _data$: OperacionesActivasDataService,
    private operacionesActivasService: OperacionesActivasService,
    private _calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.subscriptionCatActividadEconomica = this._data$.catalogoActividadEconomica.subscribe(catalogo => {
      this.catalogoActividadEconomica = catalogo;
    });
    this.subscriptionCatMonedaLinea = this._data$.catalogoMonedaLinea.subscribe(catalogo => {
      this.catalogoMonedaLinea = catalogo;
    });
    this.subscriptionCatTipoAltaCredito2 = this._data$.catalogoTipoAltaCredito2.subscribe(catalogo => {
      this.catalogoTipoAltaCredito2 = catalogo;
    });
    this.subscriptionCatTipoGarantia = this._data$.catalogoTipoGarantia.subscribe(catalogo => {
      this.catalogoTipoGarantia = catalogo;
    });
    this.subscriptionCatGradoRiesgo = this._data$.catalogoGradoRiesgo.subscribe(catalogo => {
      this.catalogoGradoRiesgo = catalogo;
    });
    this.subscriptionCatTipoCartera = this._data$.catalogoTipoCartera.subscribe(catalogo => {
      this.catalogoTipoCartera = catalogo;
    });
    this.subscriptionCatDestinoCredito2 = this._data$.catalogoDestinoCredito2.subscribe(catalogo => {
      this.catalogoDestinoCredito2 = catalogo;
    });
    this.subscriptionCatTipoOperacion = this._data$.catalogoTipoOperacion.subscribe(catalogo => {
      this.catalogoTipoOperacion = catalogo;
    });
    this.subscriptionCatInstitucionFondeadora = this._data$.catalogoInstitucionFondeadora.subscribe(catalogo => {
      this.catalogoInstitucionFondeadora = catalogo;
    });
    this.subscriptionCatTipoCobranza = this._data$.catalogoTipoCobranza.subscribe(catalogo => {
      this.catalogoTipoCobranza = catalogo;
    });
    this.subscriptionCatEstado = this._data$.catalogoEstado.subscribe(catalogo => {
      this.catalogoEstado = catalogo;
    });
    this.subscriptionCatTipoRecursos = this._data$.catalogoTipoRecursos.subscribe(catalogo => {
      this.catalogoTipoRecursos = catalogo;
    });
    this.subscriptionCatSituacionCredito = this._data$.catalogoSituacionCredito.subscribe(catalogo => {
      this.catalogoSituacionCredito = catalogo;
    });
    this._tabla2bSubscription = this._data$.selectedTable2b
      .subscribe((tabla2b) => {
        this.localTabla2B = tabla2b;
        if (this.localTabla2B.fechaVencimientoLineaCredito !== undefined) {
          if (this.localTabla2B.fechaVencimientoLineaCredito.trim().length !== 0) {
            const stringFechaVencimientoLineaCredito = this.localTabla2B.fechaVencimientoLineaCredito;
            this.fechaVencimientoLineaCredito = DateHelper.convertString2ToIDate(stringFechaVencimientoLineaCredito);
          }
        }
        this.selectedActividadEconomica = this.localTabla2B.actividadEconomica.toString();
        this.selectedTipoAltaCredito = this.localTabla2B.tipoAltaCredito.toString();
        this.selectedMonedaLinea = this.localTabla2B.monedaLineaCredito.toString();
        this.selectedTipoGarantia = this.localTabla2B.tipoGarantia.toString();
        this.selectedGradoRiesgo = this.localTabla2B.gradoRiesgo.toString();
        this.selectedTipoCartera = this.localTabla2B.tipoCartera.toString();
        this.selectedDestinoCredito2 = this.localTabla2B.destinoCredito.toString();
        this.selectedTipoOperacion = this.localTabla2B.tipoOperacion.toString();
        this.selectedInstitucionFondeadora = this.localTabla2B.institucionBancaDesarrolloFondoFomentoOtorgoFondeo.toString();
        this.selectedTipoCobranza = this.localTabla2B.tipoCobranza.toString();
        this.selectedEstado = this.localTabla2B.estado.toString();
        this.selectedTipoRecursos = this.localTabla2B.tipoRecursos.toString();
        this.selectedSituacionCredito = this.localTabla2B.situacionCredito.toString();
      });
  }

  ngOnDestroy(): void {
    if (this._tabla2bSubscription) {
      this._tabla2bSubscription.unsubscribe();
    }
    this.subscriptionCatActividadEconomica.unsubscribe();
    this.subscriptionCatMonedaLinea.unsubscribe();
    this.subscriptionCatTipoAltaCredito2.unsubscribe();
    this.subscriptionCatTipoGarantia.unsubscribe();
    this.subscriptionCatGradoRiesgo.unsubscribe();
    this.subscriptionCatTipoCartera.unsubscribe();
    this.subscriptionCatDestinoCredito2.unsubscribe();
    this.subscriptionCatTipoOperacion.unsubscribe();
    this.subscriptionCatInstitucionFondeadora.unsubscribe();
    this.subscriptionCatTipoCobranza.unsubscribe();
    this.subscriptionCatEstado.unsubscribe();
    this.subscriptionCatTipoRecursos.unsubscribe();
    this.subscriptionCatSituacionCredito.unsubscribe();
  }

  onClickAceptar(): void {
    if (this.validaGuardar()) {
      let month;
      let day;
      let tempFecha;
      this.nuevaTabla2B = this.localTabla2B;

      if (this.fechaVencimientoLineaCredito['month'] < 10) {
        month = '0' + this.fechaVencimientoLineaCredito['month'].toString();
      } else { month = this.fechaVencimientoLineaCredito['month'].toString(); }
      if (this.fechaVencimientoLineaCredito['day'] < 10) {
        day = '0' + this.fechaVencimientoLineaCredito['day'].toString();
      } else { day = this.fechaVencimientoLineaCredito['day'].toString(); }
      tempFecha = this.fechaVencimientoLineaCredito['year'].toString() + month + day;
      this.nuevaTabla2B.fechaVencimientoLineaCredito = tempFecha;

      swal({
        title: 'Obteniendo información...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.operacionesActivasService.updateTabla2B(this.nuevaTabla2B).subscribe(
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
    if (this.localTabla2B.periodoReporta === null || this.localTabla2B.periodoReporta.trim().length === 0) {
      swal('Ingrese el periodo.', '', 'warning');
      return false;
    }
    if (this.localTabla2B.periodoReporta.trim().length < 6) {
      swal('Ingrese el periodo a 6 dígitos.', '', 'warning');
      return false;
    }
    if (this.fechaVencimientoLineaCredito === null || this.fechaVencimientoLineaCredito === undefined) {
      swal('Ingrese fecha vencimiento linea crédito.', '', 'warning');
      return false;
    }
    return true;
  }

  // initTabla2() {
  //   // this.tabla2b = {
  //   //   claveUnica: null,
  //   //   nombreAcreditado: null,
  //   //   periodoReporta: null,
  //   //   identificadorCredito: null,
  //   //   grupoRiesgo: null,
  //   //   actividadEconomica: null,
  //   //   numeroEmpleados: null,
  //   //   ingresosBrutosAnuales: null,
  //   //   tipoAltaCredito: null,
  //   //   montoLineaCreditoAutorizada: null,
  //   //   monedaLineaCredito: null,
  //   //   fechaVencimientoLineaCredito: null,
  //   //   porcentajeGarantizadoCredito: null,
  //   //   tipoGarantia: null,
  //   //   numeroDisposicion: null,
  //   //   gradoRiesgo: null,
  //   //   situacionCredito: null,
  //   //   tasaInteresBrutaPeriodo: null,
  //   //   numeroDiasAtraso: null,
  //   //   saldoInsoluto: null,
  //   //   reservas: null,
  //   //   tipoCartera: null,
  //   //   destinoCredito: null,
  //   //   tipoOperacion: null,
  //   //   porcentajeParticipacionesFederalesComprometidasFuentePagoCredito: null,
  //   //   montoFondeadoBancoFondoFomento: null,
  //   //   institucionBancaDesarrolloFondoFomentoOtorgoFondeo: null,
  //   //   porcentajeBrutoNoCubiertoCredito: null,
  //   //   severidadPerdidaSegmentoNoCubierto: null,
  //   //   montoBrutoExposicionIncumplimientoSinGarantia: null,
  //   //   porcentajeBrutoCoberturaGarantiaReal: null,
  //   //   valorContableGarantiaRealFinanciera: null,
  //   //   severidadPerdidaAjustadaGarantiasRealesFinancieras: null,
  //   //   exposicionIncumplimientoAjustadaGarantiasRealesFinancieras: null,
  //   //   porcentajeBrutoGarantiaRealNoFinanciada: null,
  //   //   valorGarantiaDerechosCobro: null,
  //   //   valorGarantiaBienesInmuebles: null,
  //   //   valorGarantiaBienesMuebles: null,
  //   //   valorGarantiaFideicomisosGarantiaAdministracionesParticipacionesFederalesAportacionesFederalesComoFP: null,
  //   //   valorGarantiaFideicomisosGarantiaAdministracionIngresosPropiosComoFuente: null,
  //   //   valorGarantiaOtrasGarantiasRealesNoFinancieras: null,
  //   //   severidadPerdidaAjustadaDerechosCobro: null,
  //   //   severidadPerdidaAjustadaBienesInmuebles: null,
  //   //   severidadPerdidaAjustadaBienesMuebles: null,
  //   //   severidadPerdidaAjustadaFideicomisosGarantiaAdministracionParticipacionesFederalesAportacionesFederalesComoFP: null,
  //   //   severidadPerdidaAjustadaFideicomisosGarantiaAdministracionIngresosPropiosComoFP: null,
  //   //   severidadPerdidaAjustadaOtrasGarantiasRealesNoFinancieras: null,
  //   //   totalSeveridadPerdidaGarantiasRealesNoFinancieras: null,
  //   //   porcentajeBrutoCubiertoGarantiasPersonales: null,
  //   //   porcentajeCubiertoObligadoSolidarioAvalDistintoEntidadFederativaMunicipio: null,
  //   //   montoCubiertoGarantiaPersonal: null,
  //   //   valuacionMercadoDerivadoCredito: null,
  //   //   porcentajeCubiertoEsquemasPasoMedida: null,
  //   //   porcentajeCubiertoEsquemasPrimerasPerdidas: null,
  //   //   montoCubiertoEsquemasPasoMedida: null,
  //   //   montoCubiertoEsquemasPrimerasPerdidas: null,
  //   //   severidadPerdidaTotal: null,
  //   //   severidadPerdidaGarante: null,
  //   //   severidadPerdidaAcreditado: null,
  //   //   exposicionIncumplimientoTotal: null,
  //   //   exposicionIncumplimientoGarante: null,
  //   //   exposicionIncumplimientoAcreditado: null,
  //   //   probabilidadIncumplimientoTotal: null,
  //   //   probabilidadIncumplimientoGarante: null,
  //   //   probabilidadIncumplimientoAcreditado: null,
  //   //   tipoCobranza: null,
  //   //   capitalVencidoOperativo: null,
  //   //   interesesOrdinariosExigibles: null,
  //   //   interesesMoratorios: null,
  //   //   otrosAccesorios: null,
  //   //   capitalVigenteOperativo: null,
  //   //   estado: null,
  //   //   plazaTotalCredito: null,
  //   //   plazaMesesVencimiento: null,
  //   //   tipoRecursos: null,
  //   // };
  // }

}
