import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICatalogoGenerico } from '@interfaces/catalogos.interface';

@Injectable({
  providedIn: 'root'
})
export class OperacionesActivasDataService {

  selectedTable4a: Observable<any>;
  selectedTable5a: Observable<any>;
  selectedTable1b: Observable<any>;
  selectedTable2b: Observable<any>;
  selectedTable4b: Observable<any>;
  fechaReporte: Observable<any>;

  catalogoTipoCobranza: Observable<any>;
  catalogoSegmento: Observable<any>;
  catalogoMonedaLinea: Observable<any>;
  catalogoCategoriaCredito: Observable<any>;
  catalogoTipoAltaCredito: Observable<any>;
  catalogoDestinoCredito: Observable<any>;
  catalogoSegmentoVivienda: Observable<any>;
  catalogoEstadoCredito: Observable<any>;
  catalogoTipoRecursos: Observable<any>;
  catalogoActividadEconomica: Observable<any>;
  catalogoTipoAltaCredito2: Observable<any>;
  catalogoTipoGarantia: Observable<any>;
  catalogoGradoRiesgo: Observable<any>;
  catalogoTipoCartera: Observable<any>;
  catalogoDestinoCredito2: Observable<any>;
  catalogoTipoOperacion: Observable<any>;
  catalogoInstitucionFondeadora: Observable<any>;
  catalogoEstado: Observable<any>;
  catalogoMoneda: Observable<any>;
  catalogoMonedat4: Observable<any>;
  catalogoTipoTasaCredito: Observable<any>;
  catalogoConYSinRestriccion: Observable<any>;
  catalogoDenominacionCredito: Observable<any>;
  catalogoConvenioJudicial: Observable<any>;
  catalogoSituacionCredito: Observable<any>;
  catalogoClasificacionContable: Observable<any>;
  catalogoTipoCredito: Observable<any>;
  catalogoEscalaPeriodos: Observable<any>;
  catalogoTipoGarantiat4: Observable<any>;

  private selectedTable4aSource$ = new BehaviorSubject({});
  private selectedTable5aSource$ = new BehaviorSubject({});
  private selectedTable1bSource$ = new BehaviorSubject({});
  private selectedTable2bSource$ = new BehaviorSubject({});
  private selectedTable4bSource$ = new BehaviorSubject({});
  private fechaReporteSource$ = new BehaviorSubject({});

  private catalogoTipoCobranzaSource$ = new BehaviorSubject({});
  private catalogoSegmentoSource$ = new BehaviorSubject({});
  private catalogoMonedaLineaSource$ = new BehaviorSubject({});
  private catalogoCategoriaCreditoSource$ = new BehaviorSubject({});
  private catalogoTipoAltaCreditoSource$ = new BehaviorSubject({});
  private catalogoDestinoCreditoSource$ = new BehaviorSubject({});
  private catalogoSegmentoViviendaSource$ = new BehaviorSubject({});
  private catalogoEstadoCreditoSource$ = new BehaviorSubject({});
  private catalogoTipoRecursosSource$ = new BehaviorSubject({});
  private catalogoActividadEconomicaSource$ = new BehaviorSubject({});
  private catalogoTipoAltaCredito2Source$ = new BehaviorSubject({});
  private catalogoTipoGarantiaSource$ = new BehaviorSubject({});
  private catalogoGradoRiesgoSource$ = new BehaviorSubject({});
  private catalogoTipoCarteraSource$ = new BehaviorSubject({});
  private catalogoDestinoCredito2Source$ = new BehaviorSubject({});
  private catalogoTipoOperacionSource$ = new BehaviorSubject({});
  private catalogoInstitucionFondeadoraSource$ = new BehaviorSubject({});
  private catalogoEstadoSource$ = new BehaviorSubject({});
  private catalogoMonedaSource$ = new BehaviorSubject({});
  private catalogoMonedat4Source$ = new BehaviorSubject({});
  private catalogoTipoTasaCreditoSource$ = new BehaviorSubject({});
  private catalogoConYSinRestriccionSource$ = new BehaviorSubject({});
  private catalogoDenominacionCreditoSource$ = new BehaviorSubject({});
  private catalogoConvenioJudicialSource$ = new BehaviorSubject({});
  private catalogoSituacionCreditoSource$ = new BehaviorSubject({});
  private catalogoClasificacionContableSource$ = new BehaviorSubject({});
  private catalogoTipoCreditoSource$ = new BehaviorSubject({});
  private catalogoEscalaPeriodosSource$ = new BehaviorSubject({});
  private catalogoTipoGarantiat4Source$ = new BehaviorSubject({});

  constructor() {
    this.selectedTable4a = this.selectedTable4aSource$.asObservable();
    this.selectedTable5a = this.selectedTable5aSource$.asObservable();
    this.selectedTable1b = this.selectedTable1bSource$.asObservable();
    this.selectedTable2b = this.selectedTable2bSource$.asObservable();
    this.selectedTable4b = this.selectedTable4bSource$.asObservable();
    this.fechaReporte = this.fechaReporteSource$.asObservable();

    this.catalogoTipoCobranza = this.catalogoTipoCobranzaSource$.asObservable();
    this.catalogoSegmento = this.catalogoSegmentoSource$.asObservable();
    this.catalogoMonedaLinea = this.catalogoMonedaLineaSource$.asObservable();
    this.catalogoCategoriaCredito = this.catalogoCategoriaCreditoSource$.asObservable();
    this.catalogoTipoAltaCredito = this.catalogoTipoAltaCreditoSource$.asObservable();
    this.catalogoDestinoCredito = this.catalogoDestinoCreditoSource$.asObservable();
    this.catalogoSegmentoVivienda = this.catalogoSegmentoViviendaSource$.asObservable();
    this.catalogoEstadoCredito = this.catalogoEstadoCreditoSource$.asObservable();
    this.catalogoTipoRecursos = this.catalogoTipoRecursosSource$.asObservable();
    this.catalogoActividadEconomica = this.catalogoActividadEconomicaSource$.asObservable();
    this.catalogoTipoAltaCredito2 = this.catalogoTipoAltaCredito2Source$.asObservable();
    this.catalogoTipoGarantia = this.catalogoTipoGarantiaSource$.asObservable();
    this.catalogoGradoRiesgo = this.catalogoGradoRiesgoSource$.asObservable();
    this.catalogoTipoCartera = this.catalogoTipoCarteraSource$.asObservable();
    this.catalogoDestinoCredito2 = this.catalogoDestinoCredito2Source$.asObservable();
    this.catalogoTipoOperacion = this.catalogoTipoOperacionSource$.asObservable();
    this.catalogoInstitucionFondeadora = this.catalogoInstitucionFondeadoraSource$.asObservable();
    this.catalogoEstado = this.catalogoEstadoSource$.asObservable();
    this.catalogoMoneda = this.catalogoMonedaSource$.asObservable();
    this.catalogoMonedat4 = this.catalogoMonedat4Source$.asObservable();
    this.catalogoTipoTasaCredito = this.catalogoTipoTasaCreditoSource$.asObservable();
    this.catalogoConYSinRestriccion = this.catalogoConYSinRestriccionSource$.asObservable();
    this.catalogoDenominacionCredito = this.catalogoDenominacionCreditoSource$.asObservable();
    this.catalogoConvenioJudicial = this.catalogoConvenioJudicialSource$.asObservable();
    this.catalogoSituacionCredito = this.catalogoSituacionCreditoSource$.asObservable();
    this.catalogoClasificacionContable = this.catalogoClasificacionContableSource$.asObservable();
    this.catalogoTipoCredito = this.catalogoTipoCreditoSource$.asObservable();
    this.catalogoEscalaPeriodos = this.catalogoEscalaPeriodosSource$.asObservable();
    this.catalogoTipoGarantiat4 = this.catalogoTipoGarantiat4Source$.asObservable();
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de la tabla 4A
   * @param table4
   */
  changeSelectedTable4a(table4: {}): void {
    this.selectedTable4aSource$.next(table4);
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de la tabla 5A
   * @param table5
   */
  changeSelectedTable5a(table5: {}): void {
    this.selectedTable5aSource$.next(table5);
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de la tabla 1B
   * @param table1
   */
  changeSelectedTable1b(table1: {}): void {
    this.selectedTable1bSource$.next(table1);
  }

  /**
   * Serviciolocal para cambiar el objeto seleccionado de la tabla 2B
   * @param table2
   */
  changeSelectedTable2b(table2: {}): void {
    this.selectedTable2bSource$.next(table2);
  }

  /**
   * Servicio local para cambiar el objeto seleccionado de la tabla 4B
   * @param table4
   */
  changeSelectedTable4b(table4: {}): void {
    this.selectedTable4bSource$.next(table4);
  }

  /**
     * Serviciolocal para guardar la fecha
     * @param fecha
     */
  saveFechaReporte(fecha: string): void {
    this.fechaReporteSource$.next(fecha);
  }

  // Pasa catalogos a sus respectivos modales.

  /**
   * Servicio local para cambiar el catalogo Tipo Cobranza
   * @param catalogo
   */
  setCatalogoTipoCobranza(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoCobranzaSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Segmento
   * @param catalogo
   */
  setCatalogoSegmento(catalogo: ICatalogoGenerico[]): void {
    this.catalogoSegmentoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Moneda Linea
   * @param catalogo
   */
  setCatalogoMonedaLinea(catalogo: ICatalogoGenerico[]): void {
    this.catalogoMonedaLineaSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Categoria Credito
   * @param catalogo
   */
  setCatalogoCategoriaCredito(catalogo: ICatalogoGenerico[]): void {
    this.catalogoCategoriaCreditoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Tipo Alta Credito
   * @param catalogo
   */
  setCatalogoTipoAltaCredito(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoAltaCreditoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Destino Crédito
   * @param catalogo
   */
  setCatalogoDestinoCredito(catalogo: ICatalogoGenerico[]): void {
    this.catalogoDestinoCreditoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Segmento Vivienda
   * @param catalogo
   */
  setCatalogoSegmentoVivienda(catalogo: ICatalogoGenerico[]): void {
    this.catalogoSegmentoViviendaSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Estado Crédito
   * @param catalogo
   */
  setCatalogoEstadoCredito(catalogo: ICatalogoGenerico[]): void {
    this.catalogoEstadoCreditoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Tipo Recursos
   * @param catalogo
   */
  setCatalogoTipoRecursos(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoRecursosSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Actividad Economica
   * @param catalogo
   */
  setCatalogoActividadEconomica(catalogo: ICatalogoGenerico[]): void {
    this.catalogoActividadEconomicaSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Tipo Alta Credito 2
   * @param catalogo
   */
  setCatalogoTipoAltaCredito2(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoAltaCredito2Source$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Tipo Granatia
   * @param catalogo
   */
  setCatalogoTipoGarantia(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoGarantiaSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Grado Riesgo
   * @param catalogo
   */
  setCatalogoGradoRiesgo(catalogo: ICatalogoGenerico[]): void {
    this.catalogoGradoRiesgoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Tipo Cartera
   * @param catalogo
   */
  setCatalogoTipoCartera(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoCarteraSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Destino Crédito 2
   * @param catalogo
   */
  setCatalogoDestinoCredito2(catalogo: ICatalogoGenerico[]): void {
    this.catalogoDestinoCredito2Source$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Tipo operacion
   * @param catalogo
   */
  setCatalogoTipoOperacion(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoOperacionSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Institución Fondeadora
   * @param catalogo
   */
  setCatalogoInstitucionFondeadora(catalogo: ICatalogoGenerico[]): void {
    this.catalogoInstitucionFondeadoraSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Estado
   * @param catalogo
   */
  setCatalogoEstado(catalogo: ICatalogoGenerico[]): void {
    this.catalogoEstadoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Moneda
   * @param catalogo
   */
  setCatalogoMoneda(catalogo: ICatalogoGenerico[]): void {
    this.catalogoMonedaSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Moneda t4
   * @param catalogo
   */
  setCatalogoMonedat4(catalogo: ICatalogoGenerico[]): void {
    this.catalogoMonedat4Source$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Tipo tasa crédito
   * @param catalogo
   */
  setCatalogoTipoTasaCredito(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoTasaCreditoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Con Y Sin Restriccion
   * @param catalogo
   */
  setCatalogoConYSinRestriccion(catalogo: ICatalogoGenerico[]): void {
    this.catalogoConYSinRestriccionSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Denominación Crédito
   * @param catalogo
   */
  setCatalogoDenominacionCredito(catalogo: ICatalogoGenerico[]): void {
    this.catalogoDenominacionCreditoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Convenio judicial
   * @param catalogo
   */
  setCatalogoConvenioJudicial(catalogo: ICatalogoGenerico[]): void {
    this.catalogoConvenioJudicialSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Situacion crédito
   * @param catalogo
   */
  setCatalogoSituacionCredito(catalogo: ICatalogoGenerico[]): void {
    this.catalogoSituacionCreditoSource$.next(catalogo);
  }
  /**
   * Servicio local para cambiar el catalogo Clasificación contable
   * @param catalogo
   */
  setCatalogoClasificacionContable(catalogo: ICatalogoGenerico[]): void {
    this.catalogoClasificacionContableSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Tipo credito
   * @param catalogo
   */
  setCatalogoTipoCredito(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoCreditoSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo Escala periodos
   * @param catalogo
   */
  setCatalogoEscalaPeriodos(catalogo: ICatalogoGenerico[]): void {
    this.catalogoEscalaPeriodosSource$.next(catalogo);
  }

  /**
   * Servicio local para cambiar el catalogo tipo garantia 4
   * @param catalogo
   */
  setCatalogoTipoGarantiat4(catalogo: ICatalogoGenerico[]): void {
    this.catalogoTipoGarantiat4Source$.next(catalogo);
  }
}
