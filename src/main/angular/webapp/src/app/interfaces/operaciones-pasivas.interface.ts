
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
  telefonoDomicilio: string;
  telefonoOficina: string;
  correoElectronico: string;
  fechaNacimiento: string;
  estatuscliente: string;
}

export interface IPatrimonial {
  numeroCliente: string;
  numeroCuenta: string;
  numeroInversion: string;
  loadDate: string;
}

export interface IPatrimonialInformacion {
  numeroCliente: string;
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
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
  cotitular: string;
  porcentajeIPAB: string;
  tipoFirmaCotitular: string;
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
  montoBloqueo: number;
  tipoBloqueo: number;
  descBloqueo: string;
  loadDate: string;
}

export interface ICierreCuentas {
  idTitular: string;
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  idCuenta: string;
}
