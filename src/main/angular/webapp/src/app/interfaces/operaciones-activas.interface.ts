export interface ITabla4 {
  numeroCredito: string;
  moneda1: string;
  segmento: string;
  tipoCobranza: string;
  capitalVigente: number;
  capitalVencido: number;
  interesOrdinarioExigible: number;
  interesMoratorio: number;
  otrosAccesorios: number;
}

export interface ITabla1 {
  montoOriginalCredito: number;
  valorVivienda: number;
  tasaInteresAplicadoPeriodo: number;
  responsabilidadTotalperiodo: number;
  probabilidadIncumplimiento: number;
  severidadPerdida: number;
  montoSubcuentaVivienda: number;
  reservas: number;
  capitalVencidoOperativo: number;
  interesesOrdinarios: number;
  interesesMoratorios: number;
  otrosAccesorios: number;
  capitalVigenteOperativo: number;
  diasAtraso: number;
}