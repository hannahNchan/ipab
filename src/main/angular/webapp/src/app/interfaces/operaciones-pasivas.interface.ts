
export interface ICatalogoGenerico { }

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

export interface ICliente {
  idCliente: string;
  nombreCliente: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface IClienteInformacion {
  idCliente: string;
  tipoPersona: string;
  nombreCliente: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  calleDomicilio: string;
  coloniaDomicilio: string;
  municipioDomicilio: string;
  ciudadDomicilio: string;
  codigoPostalDom: string;
  paisDomicilio: string;
  estadoDomicilio: string;
  residencia: string;
  reside: string;
  exceptuadoIPAB: string;
  fideicomiso: string;
  rfc: string;
  curp: string;
  listTelefonoDomicilio: [string];
  listTelefonoOficina: [string];
  correoElectronico: string;
  fechaNacimiento: string;
  estatuscliente: string;
  loadDate: string;
}

export interface IPatrimonial {
  numeroCliente: string;
  numeroCuenta: string;
  numeroInversion: string;
  loadDate: string;
}

export interface IPatrimonialInformacion {
  numeroCliente: string;
  numeroCuenta: string;
  numeroInversion: string;
  categoria: string;
  sucursal: string;
  saldoCuenta: string;
  saldoInteresArt61: string;
  saldoInteres: string;
  monedaIPAB: string;
  fechaContratacion: string;
  plazoOperacion: string;
  tipoTasa: string;
  tasa: string;
  ultimaProvisionIntereses: string;
  entidadFederativa: string;
  plaza: string;
  loadDate: string;
}

export interface IClienteCuentas {
  titular: string;
  idCuenta: string;
  loadDate: string;
}

export interface IClienteCuentasInformacion {
  titular: string;
  idCuenta: string;
  moneda: string;
  categoria: string;
  regimenFiscal: string;
  exentoImpuesto: string;
  listCotitular: [string];
  listPorcentajeIPAB: [string];
  listTipoFirma: [string];
  idTitularTipoFirma: string;
  titularPorcentajeIPAB: string;
  loadDate: string;
}

export interface IBloqueo {
  idCuenta: string;
  idBloqueo: string;
  loadDate: string;
}

export interface IBloqueoInformacion {
  idCuenta: string;
  idBloqueo: string;
  fechaBloqueo: string;
  montoBloqueo: string;
  tipoBloqueo: string;
  descBloqueo: string;
  loadDate: string;
}

export interface ICierreCuentas {
  loadDate: string;
  idTitular: string;
  idCuenta: string;
  fechaCierre: string;
}

export interface IExceptuados {
  loadDate: string;
  numeroCliente: string;
}

export interface IExceptuadosInformacion {
  loadDate: string;
  institucion: string;
  numeroCliente: string;
  numeroCliente2: string;
  personalidad: string;
  numeroCliente3: string;
  numeroCuenta: string;
  numeroInversion: string;
  nombreRazonSocial: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  causalRevision: string;
  descripcion: string;
  fraccion: string;
  concepto: string;
  exclusion: string;
}
