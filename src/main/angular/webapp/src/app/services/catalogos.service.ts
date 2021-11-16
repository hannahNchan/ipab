import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }
  /**
   * Obtiene todos los catalogos de activas.
   *
   */
  getCatalogosActivas(orden: string): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/catalogosActivas?orden=${orden}`);
  }
  /**
   * Obtiene catalogos tipo cobranza.
   *
   */
  getCatalogoTipoCobranza(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/TIPO_COBRANZA`);
  }
  /**
   * Obtiene catalogos segmento.
   *
   */
  getCatalogoSegmento(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/SEGMENTO`);
  }
  /**
   * Obtiene catalogos moneda linea.
   *
   */
  getCatalogoMonedaLinea(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/MONEDA_LINEA`);
  }

  /**
   * Obtiene catalogos categoria credito.
   *
   */
  getCatalogoCategoriaCredito(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/CATEGORIA_CREDITO`);
  }

  /**
   * Obtiene catalogos tipo alta credito.
   *
   */
  getCatalogoTipoAltaCredito(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/TIPO_ALTA_CREDITO`);
  }

  /**
   * Obtiene catalogos destino credito.
   *
   */
  getCatalogoDestinoCredito(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/DESTINO_CREDITO`);
  }

  /**
   * Obtiene catalogos segmento vivienda.
   *
   */
  getCatalogoSegmentoVivienda(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/SEGMENTO_VIVIENDA`);
  }

  /**
   * Obtiene catalogos estado credito.
   *
   */
  getCatalogoEstadoCredito(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/ESTADO_CREDITO`);
  }

  /**
   * Obtiene catalogos tipo recursos.
   *
   */
  getCatalogoTipoRecursos(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/TIPO_RECURSOS`);
  }

  /**
   * Obtiene catalogos actividad economica.
   *
   */
  getCatalogoActivdadEconomica(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/ACTIVIDAD_ECONOMICA`);
  }

  /**
   * Obtiene catalogos tipo alta credito 2.
   *
   */
  getCatalogoTipoAltaCredito2(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/TIPO_ALTA_CREDITO2`);
  }

  /**
   * Obtiene catalogos tipo garantia.
   *
   */
  getCatalogoTipoGarantia(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/TIPO_GARANTIA`);
  }

  /**
   * Obtiene catalogos grado riesgo.
   *
   */
  getCatalogoGradoRiesgo(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/GR`);
  }

  /**
   * Obtiene catalogos tipo cartera.
   *
   */
  getCatalogoTipoCartera(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/TIPO_CARTERA`);
  }

  /**
   * Obtiene catalogos destino credito2.
   *
   */
  getCatalogoDestinoCredito2(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/DESTINO_CREDITO2`);
  }

  /**
   * Obtiene catalogos tipo operacion.
   *
   */
  getCatalogoTipoOperacion(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/TIPO_OPERACION`);
  }

  /**
   * Obtiene catalogos institución fondeadora.
   *
   */
  getCatalogoInstitucionFondeadora(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/INSTITUCION_FONDEADORA`);
  }

  /**
   * Obtiene catalogos estados.
   *
   */
  getCatalogoEstado(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/ESTADO`);
  }

  /**
   * Obtiene catalogos moneda.
   *
   */
  getCatalogoMoneda(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/MONEDA`);
  }

  /**
   * Obtiene catalogos monedat4.
   *
   */
  getCatalogoMonedaT4(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/MONEDAT4`);
  }

  /**
   * Obtiene catalogos tipo tasa credito.
   *
   */
  getCatalogoTipoTasaCredito(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/TIPO_TASA_CREDITO`);
  }

  /**
   * Obtiene catalogos tipo tasa.
   *
   */
  getCatalogoTipoTasa(): Observable<any> {
    return this.http.get(`/IPABESB/rest/catalogo/TIPO_TASA`);
  }
}
