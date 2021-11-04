export interface IParametro {
  alta: boolean;
  comment: string;
  descripcion: string;
  loadDate: string;
  paramName: string;
  paramValue: string;
  tipo: number;
}

export interface ICategoria {
  isAlta: boolean;
  aplicacion: string;
  idRegistro: string;
  categoria: string;
  descripcion: string;
  shortName: string;
  tipoProd: string;
  nivelCta: string;
  modalidad: string;
  descripcionIPAB: string;
  productoIPAB: string;
  loadDate: string;
  tipo: number;
}

export interface ICalendario {
  isAlta: boolean;
  descripcion: string;
  paramName: string;
  paramValue: string;
  comment: string;
  loadDate: string;
  tipo: number;
}

export interface ICatalogoClasificacion {
  catalogo: ICatalogo[];
}

export interface ICatalogoNivelCuenta {
  catalogo: ICatalogo[];
}

export interface ICatalogo {
  clave: string;
  descripcion: string;
  tipo: boolean;
}

export interface IYearSelected {
  descripcion: string;
  anio: string;
}
