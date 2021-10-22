export interface IParametro {
  description: string;
  paramName: string;
  paramValue: string;
  comment: string;
  loadDate: string;
}

export interface ICategoria {
  aplicacion: string;
  idRegistro: string;
  categoria: string;
  descripcion: string;
  shortName: string;
  tipoProd: number;
  nivelCta: number;
  modalidad: number;
  descripcionIpab: string;
  productoIpab: string;
  loadDate: string;
}

export interface ICalendario {
  description: string;
  paramName: string;
  paramValue: string;
  comment: string;
  loadDate: string;
}
