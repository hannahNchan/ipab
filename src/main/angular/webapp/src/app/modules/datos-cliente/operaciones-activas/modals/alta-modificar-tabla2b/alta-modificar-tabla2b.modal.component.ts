import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ITabla2 } from "@interfaces/operaciones-activas.interface";
import { Subscription } from 'rxjs';
import { OperacionesActivasDataService } from '@services/operaciones-activas-data.service';



@Component({
  selector: 'app-alta-modificar-tabla2b',
  templateUrl: './alta-modificar-tabla2b.modal.component.html',
  styleUrls: ['./alta-modificar-tabla2b.modal.component.scss']
})
export class AltaModificarTabla2bModalComponent implements OnInit, OnDestroy {

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private _data$: OperacionesActivasDataService) { }

  tabla2Form: FormGroup;
  tabla2b: ITabla2;
  decimalPattern: string = "^[0-9]+[.][0-9][0-9]$";
  enteroPattern: string = "^[0-9]+$";
  private _tabla2bSubscription: Subscription;

  ngOnInit(): void {
    this._tabla2bSubscription = this._data$.selectedTable2b
      .subscribe((tabla2b) => this.tabla2b = tabla2b);
    this.tabla2Form = new FormGroup({
      claveUnica: new FormControl(this.tabla2b.claveUnica, [
        Validators.required,
      ]),
      nombreAcreditado: new FormControl(this.tabla2b.nombreAcreditado, [
        Validators.required,
      ]),
      periodoReporta: new FormControl(this.tabla2b.periodoReporta, [
        Validators.required,
      ]),
      identificadorCredito: new FormControl(this.tabla2b.identificadorCredito, [
        Validators.required,
      ]),
      grupoRiesgo: new FormControl(this.tabla2b.grupoRiesgo, [
        Validators.required,
      ]),
      actividadEconomica: new FormControl(this.tabla2b.actividadEconomica, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      numeroEmpleados: new FormControl(this.tabla2b.numeroEmpleados, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      ingresosBrutosAnuales: new FormControl(this.tabla2b.ingresosBrutosAnuales, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      tipoAltaCredito: new FormControl(this.tabla2b.tipoAltaCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      montoLineaCreditoAutorizada: new FormControl(this.tabla2b.montoLineaCreditoAutorizada, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      monedaLineaCredito: new FormControl(this.tabla2b.monedaLineaCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      fechaVencimientoLineaCredito: new FormControl(this.tabla2b.fechaVencimientoLineaCredito, [
        Validators.required,
      ]),
      porcentajeGarantizadoCredito: new FormControl(this.tabla2b.porcentajeGarantizadoCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      tipoGarantia: new FormControl(this.tabla2b.tipoGarantia, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      numeroDisposicion: new FormControl(this.tabla2b.numeroDisposicion, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      gradoRiesgo: new FormControl(this.tabla2b.gradoRiesgo, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      situacionCredito: new FormControl(this.tabla2b.situacionCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      tasaInteresBrutaPeriodo: new FormControl(this.tabla2b.tasaInteresBrutaPeriodo, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      numeroDiasAtraso: new FormControl(this.tabla2b.numeroDiasAtraso, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      saldoInsoluto: new FormControl(this.tabla2b.saldoInsoluto, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      reservas: new FormControl(this.tabla2b.reservas, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      tipoCartera: new FormControl(this.tabla2b.tipoCartera, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      destinoCredito: new FormControl(this.tabla2b.destinoCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      tipoOperacion: new FormControl(this.tabla2b.tipoOperacion, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      porcentajeParticipacionesFederalesComprometidasFuentePagoCredito: new FormControl(this.tabla2b.porcentajeParticipacionesFederalesComprometidasFuentePagoCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      montoFondeadoBancoFondoFomento: new FormControl(this.tabla2b.montoFondeadoBancoFondoFomento, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      institucionBancaDesarrolloFondoFomentoOtorgoFondeo: new FormControl(this.tabla2b.institucionBancaDesarrolloFondoFomentoOtorgoFondeo, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      porcentajeBrutoNoCubiertoCredito: new FormControl(this.tabla2b.porcentajeBrutoNoCubiertoCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaSegmentoNoCubierto: new FormControl(this.tabla2b.severidadPerdidaSegmentoNoCubierto, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      montoBrutoExposicionIncumplimientoSinGarantia: new FormControl(this.tabla2b.montoBrutoExposicionIncumplimientoSinGarantia, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      porcentajeBrutoCoberturaGarantiaReal: new FormControl(this.tabla2b.porcentajeBrutoCoberturaGarantiaReal, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      valorContableGarantiaRealFinanciera: new FormControl(this.tabla2b.valorContableGarantiaRealFinanciera, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaAjustadaGarantiasRealesFinancieras: new FormControl(this.tabla2b.severidadPerdidaAjustadaGarantiasRealesFinancieras, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      exposicionIncumplimientoAjustadaGarantiasRealesFinancieras: new FormControl(this.tabla2b.exposicionIncumplimientoAjustadaGarantiasRealesFinancieras, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      porcentajeBrutoGarantiaRealNoFinanciada: new FormControl(this.tabla2b.porcentajeBrutoGarantiaRealNoFinanciada, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      valorGarantiaDerechosCobro: new FormControl(this.tabla2b.valorGarantiaDerechosCobro, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      valorGarantiaBienesInmuebles: new FormControl(this.tabla2b.valorGarantiaBienesInmuebles, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      valorGarantiaBienesMuebles: new FormControl(this.tabla2b.valorGarantiaBienesMuebles, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      valorGarantiaFideicomisosGarantiaAdministracionesParticipacionesFederalesAportacionesFederalesComoFP: new FormControl(this.tabla2b.valorGarantiaFideicomisosGarantiaAdministracionesParticipacionesFederalesAportacionesFederalesComoFP, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      valorGarantiaFideicomisosGarantiaAdministracionIngresosPropiosComoFuente: new FormControl(this.tabla2b.valorGarantiaFideicomisosGarantiaAdministracionIngresosPropiosComoFuente, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      valorGarantiaOtrasGarantiasRealesNoFinancieras: new FormControl(this.tabla2b.valorGarantiaOtrasGarantiasRealesNoFinancieras, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaAjustadaDerechosCobro: new FormControl(this.tabla2b.severidadPerdidaAjustadaDerechosCobro, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaAjustadaBienesInmuebles: new FormControl(this.tabla2b.severidadPerdidaAjustadaBienesInmuebles, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaAjustadaBienesMuebles: new FormControl(this.tabla2b.severidadPerdidaAjustadaBienesMuebles, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaAjustadaFideicomisosGarantiaAdministracionParticipacionesFederalesAportacionesFederalesComoFP: new FormControl(this.tabla2b.severidadPerdidaAjustadaFideicomisosGarantiaAdministracionParticipacionesFederalesAportacionesFederalesComoFP, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaAjustadaFideicomisosGarantiaAdministracionIngresosPropiosComoFP: new FormControl(this.tabla2b.severidadPerdidaAjustadaFideicomisosGarantiaAdministracionIngresosPropiosComoFP, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaAjustadaOtrasGarantiasRealesNoFinancieras: new FormControl(this.tabla2b.severidadPerdidaAjustadaOtrasGarantiasRealesNoFinancieras, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      totalSeveridadPerdidaGarantiasRealesNoFinancieras: new FormControl(this.tabla2b.totalSeveridadPerdidaGarantiasRealesNoFinancieras, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      porcentajeBrutoCubiertoGarantiasPersonales: new FormControl(this.tabla2b.porcentajeBrutoCubiertoGarantiasPersonales, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      porcentajeCubiertoObligadoSolidarioAvalDistintoEntidadFederativaMunicipio: new FormControl(this.tabla2b.porcentajeCubiertoObligadoSolidarioAvalDistintoEntidadFederativaMunicipio, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      montoCubiertoGarantiaPersonal: new FormControl(this.tabla2b.montoCubiertoGarantiaPersonal, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      valuacionMercadoDerivadoCredito: new FormControl(this.tabla2b.valuacionMercadoDerivadoCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      porcentajeCubiertoEsquemasPasoMedida: new FormControl(this.tabla2b.porcentajeCubiertoEsquemasPasoMedida, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      porcentajeCubiertoEsquemasPrimerasPerdidas: new FormControl(this.tabla2b.porcentajeCubiertoEsquemasPrimerasPerdidas, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      montoCubiertoEsquemasPasoMedida: new FormControl(this.tabla2b.montoCubiertoEsquemasPasoMedida, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      montoCubiertoEsquemasPrimerasPerdidas: new FormControl(this.tabla2b.montoCubiertoEsquemasPrimerasPerdidas, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaTotal: new FormControl(this.tabla2b.severidadPerdidaTotal, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaGarante: new FormControl(this.tabla2b.severidadPerdidaGarante, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdidaAcreditado: new FormControl(this.tabla2b.severidadPerdidaAcreditado, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      exposicionIncumplimientoTotal: new FormControl(this.tabla2b.exposicionIncumplimientoTotal, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      exposicionIncumplimientoGarante: new FormControl(this.tabla2b.exposicionIncumplimientoGarante, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      exposicionIncumplimientoAcreditado: new FormControl(this.tabla2b.exposicionIncumplimientoAcreditado, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      probabilidadIncumplimientoTotal: new FormControl(this.tabla2b.probabilidadIncumplimientoTotal, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      probabilidadIncumplimientoGarante: new FormControl(this.tabla2b.probabilidadIncumplimientoGarante, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      probabilidadIncumplimientoAcreditado: new FormControl(this.tabla2b.probabilidadIncumplimientoAcreditado, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      tipoCobranza: new FormControl(this.tabla2b.tipoCobranza, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      capitalVencidoOperativo: new FormControl(this.tabla2b.capitalVencidoOperativo, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      interesesOrdinariosExigibles: new FormControl(this.tabla2b.interesesOrdinariosExigibles, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      interesesMoratorios: new FormControl(this.tabla2b.interesesMoratorios, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      otrosAccesorios: new FormControl(this.tabla2b.otrosAccesorios, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      capitalVigenteOperativo: new FormControl(this.tabla2b.capitalVigenteOperativo, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      estado: new FormControl(this.tabla2b.estado, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      plazaTotalCredito: new FormControl(this.tabla2b.plazaTotalCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      plazaMesesVencimiento: new FormControl(this.tabla2b.plazaMesesVencimiento, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      tipoRecursos: new FormControl(this.tabla2b.tipoRecursos, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
    })
  }

  ngOnDestroy(): void {
    if (this._tabla2bSubscription) {
      this._tabla2bSubscription.unsubscribe();
    }
  }

  get claveUnica() {
    return this.tabla2Form.get("claveUnica");
  }
  get nombreAcreditado() {
    return this.tabla2Form.get("nombreAcreditado");
  }
  get periodoReporta() {
    return this.tabla2Form.get("periodoReporta");
  }
  get identificadorCredito() {
    return this.tabla2Form.get("identificadorCredito");
  }
  get grupoRiesgo() {
    return this.tabla2Form.get("grupoRiesgo");
  }
  get actividadEconomica() {
    return this.tabla2Form.get("actividadEconomica");
  }
  get numeroEmpleados() {
    return this.tabla2Form.get("numeroEmpleados");
  }
  get ingresosBrutosAnuales() {
    return this.tabla2Form.get("ingresosBrutosAnuales");
  }
  get tipoAltaCredito() {
    return this.tabla2Form.get("tipoAltaCredito");
  }
  get montoLineaCreditoAutorizada() {
    return this.tabla2Form.get("montoLineaCreditoAutorizada");
  }
  get monedaLineaCredito() {
    return this.tabla2Form.get("monedaLineaCredito");
  }
  get fechaVencimientoLineaCredito() {
    return this.tabla2Form.get("fechaVencimientoLineaCredito");
  }
  get porcentajeGarantizadoCredito() {
    return this.tabla2Form.get("porcentajeGarantizadoCredito");
  }
  get tipoGarantia() {
    return this.tabla2Form.get("tipoGarantia");
  }
  get numeroDisposicion() {
    return this.tabla2Form.get("numeroDisposicion");
  }
  get gradoRiesgo() {
    return this.tabla2Form.get("gradoRiesgo");
  }
  get situacionCredito() {
    return this.tabla2Form.get("situacionCredito");
  }
  get tasaInteresBrutaPeriodo() {
    return this.tabla2Form.get("tasaInteresBrutaPeriodo");
  }
  get numeroDiasAtraso() {
    return this.tabla2Form.get("numeroDiasAtraso");
  }
  get saldoInsoluto() {
    return this.tabla2Form.get("saldoInsoluto");
  }
  get reservas() {
    return this.tabla2Form.get("reservas");
  }
  get destinoCredito() {
    return this.tabla2Form.get("destinoCredito");
  }
  get tipoOperacion() {
    return this.tabla2Form.get("tipoOperacion");
  }
  get porcentajeParticipacionesFederalesComprometidasFuentePagoCredito() {
    return this.tabla2Form.get("porcentajeParticipacionesFederalesComprometidasFuentePagoCredito");
  }
  get montoFondeadoBancoFondoFomento() {
    return this.tabla2Form.get("montoFondeadoBancoFondoFomento");
  }
  get institucionBancaDesarrolloFondoFomentoOtorgoFondeo() {
    return this.tabla2Form.get("institucionBancaDesarrolloFondoFomentoOtorgoFondeo");
  }
  get porcentajeBrutoNoCubiertoCredito() {
    return this.tabla2Form.get("porcentajeBrutoNoCubiertoCredito");
  }
  get severidadPerdidaSegmentoNoCubierto() {
    return this.tabla2Form.get("severidadPerdidaSegmentoNoCubierto");
  }
  get montoBrutoExposicionIncumplimientoSinGarantia() {
    return this.tabla2Form.get("montoBrutoExposicionIncumplimientoSinGarantia");
  }
  get porcentajeBrutoCoberturaGarantiaReal() {
    return this.tabla2Form.get("porcentajeBrutoCoberturaGarantiaReal");
  }
  get valorContableGarantiaRealFinanciera() {
    return this.tabla2Form.get("valorContableGarantiaRealFinanciera");
  }
  get severidadPerdidaAjustadaGarantiasRealesFinancieras() {
    return this.tabla2Form.get("severidadPerdidaAjustadaGarantiasRealesFinancieras");
  }
  get exposicionIncumplimientoAjustadaGarantiasRealesFinancieras() {
    return this.tabla2Form.get("exposicionIncumplimientoAjustadaGarantiasRealesFinancieras");
  }
  get porcentajeBrutoGarantiaRealNoFinanciada() {
    return this.tabla2Form.get("porcentajeBrutoGarantiaRealNoFinanciada");
  }
  get valorGarantiaDerechosCobro() {
    return this.tabla2Form.get("valorGarantiaDerechosCobro");
  }
  get valorGarantiaBienesInmuebles() {
    return this.tabla2Form.get("valorGarantiaBienesInmuebles");
  }
  get valorGarantiaBienesMuebles() {
    return this.tabla2Form.get("valorGarantiaBienesMuebles");
  }
  get valorGarantiaFideicomisosGarantiaAdministracionesParticipacionesFederalesAportacionesFederalesComoFP() {
    return this.tabla2Form.get("valorGarantiaFideicomisosGarantiaAdministracionesParticipacionesFederalesAportacionesFederalesComoFP");
  }
  get valorGarantiaFideicomisosGarantiaAdministracionIngresosPropiosComoFuente() {
    return this.tabla2Form.get("valorGarantiaFideicomisosGarantiaAdministracionIngresosPropiosComoFuente");
  }
  get valorGarantiaOtrasGarantiasRealesNoFinancieras() {
    return this.tabla2Form.get("valorGarantiaOtrasGarantiasRealesNoFinancieras");
  }
  get severidadPerdidaAjustadaDerechosCobro() {
    return this.tabla2Form.get("severidadPerdidaAjustadaDerechosCobro");
  }
  get severidadPerdidaAjustadaBienesInmuebles() {
    return this.tabla2Form.get("severidadPerdidaAjustadaBienesInmuebles");
  }
  get severidadPerdidaAjustadaBienesMuebles() {
    return this.tabla2Form.get("severidadPerdidaAjustadaBienesMuebles");
  }
  get severidadPerdidaAjustadaFideicomisosGarantiaAdministracionParticipacionesFederalesAportacionesFederalesComoFP() {
    return this.tabla2Form.get("severidadPerdidaAjustadaFideicomisosGarantiaAdministracionParticipacionesFederalesAportacionesFederalesComoFP");
  }
  get severidadPerdidaAjustadaFideicomisosGarantiaAdministracionIngresosPropiosComoFP() {
    return this.tabla2Form.get("severidadPerdidaAjustadaFideicomisosGarantiaAdministracionIngresosPropiosComoFP");
  }
  get severidadPerdidaAjustadaOtrasGarantiasRealesNoFinancieras() {
    return this.tabla2Form.get("severidadPerdidaAjustadaOtrasGarantiasRealesNoFinancieras");
  }
  get totalSeveridadPerdidaGarantiasRealesNoFinancieras() {
    return this.tabla2Form.get("totalSeveridadPerdidaGarantiasRealesNoFinancieras");
  }
  get porcentajeBrutoCubiertoGarantiasPersonales() {
    return this.tabla2Form.get("porcentajeBrutoCubiertoGarantiasPersonales");
  }
  get porcentajeCubiertoObligadoSolidarioAvalDistintoEntidadFederativaMunicipio() {
    return this.tabla2Form.get("porcentajeCubiertoObligadoSolidarioAvalDistintoEntidadFederativaMunicipio");
  }
  get montoCubiertoGarantiaPersonal() {
    return this.tabla2Form.get("montoCubiertoGarantiaPersonal");
  }
  get valuacionMercadoDerivadoCredito() {
    return this.tabla2Form.get("valuacionMercadoDerivadoCredito");
  }
  get porcentajeCubiertoEsquemasPasoMedida() {
    return this.tabla2Form.get("porcentajeCubiertoEsquemasPasoMedida");
  }
  get porcentajeCubiertoEsquemasPrimerasPerdidas() {
    return this.tabla2Form.get("porcentajeCubiertoEsquemasPrimerasPerdidas");
  }
  get montoCubiertoEsquemasPasoMedida() {
    return this.tabla2Form.get("montoCubiertoEsquemasPasoMedida");
  }
  get montoCubiertoEsquemasPrimerasPerdidas() {
    return this.tabla2Form.get("montoCubiertoEsquemasPrimerasPerdidas");
  }
  get severidadPerdidaTotal() {
    return this.tabla2Form.get("severidadPerdidaTotal");
  }
  get severidadPerdidaGarante() {
    return this.tabla2Form.get("severidadPerdidaGarante");
  }
  get severidadPerdidaAcreditado() {
    return this.tabla2Form.get("severidadPerdidaAcreditado");
  }
  get exposicionIncumplimientoTotal() {
    return this.tabla2Form.get("exposicionIncumplimientoTotal");
  }
  get exposicionIncumplimientoGarante() {
    return this.tabla2Form.get("exposicionIncumplimientoGarante");
  }
  get exposicionIncumplimientoAcreditado() {
    return this.tabla2Form.get("exposicionIncumplimientoAcreditado");
  }
  get probabilidadIncumplimientoTotal() {
    return this.tabla2Form.get("probabilidadIncumplimientoTotal");
  }
  get probabilidadIncumplimientoGarante() {
    return this.tabla2Form.get("probabilidadIncumplimientoGarante");
  }
  get probabilidadIncumplimientoAcreditado() {
    return this.tabla2Form.get("probabilidadIncumplimientoAcreditado");
  }
  get tipoCobranza() {
    return this.tabla2Form.get("tipoCobranza");
  }
  get capitalVencidoOperativo() {
    return this.tabla2Form.get("capitalVencidoOperativo");
  }
  get interesesOrdinariosExigibles() {
    return this.tabla2Form.get("interesesOrdinariosExigibles");
  }
  get interesesMoratorios() {
    return this.tabla2Form.get("interesesMoratorios");
  }
  get otrosAccesorios() {
    return this.tabla2Form.get("otrosAccesorios");
  }
  get capitalVigenteOperativo() {
    return this.tabla2Form.get("capitalVigenteOperativo");
  }
  get estado() {
    return this.tabla2Form.get("estado");
  }
  get plazaTotalCredito() {
    return this.tabla2Form.get("plazaTotalCredito");
  }
  get plazaMesesVencimiento() {
    return this.tabla2Form.get("plazaMesesVencimiento");
  }
  get tipoRecursos() {
    return this.tabla2Form.get("tipoRecursos");
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
