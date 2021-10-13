export interface IExceptuadosIPAB {
  institucion: string;
  numeroCliente: string;
  numeroCliente2: string;
  personalidad: string;
  numeroCliente3: number;
  numeroCuenta: number;
  numeroInversion: number;
  nombreRazonSocial: number;
  apellidoPaterno: string;
  apellidoMaterno: string;
  causalRevision: number;
  descripcion: string;
  fraccion: string;
  concepto: number;
  exclusion: number;
}

export interface IBloqueo {
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  idCuenta: string;
  idBloqueo: string;
}

export interface IBloqueoInformacion {
  idCuenta: string;
  idBloqueo: string;
  fechaBloqueo: string;
  montoBloqueo: number;
  tipoBloqueo: number;
  descBloqueo: string;
  loadDate: string;
}
