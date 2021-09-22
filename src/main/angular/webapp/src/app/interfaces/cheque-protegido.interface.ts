export interface IDocumentoChequeProtegido {
  fileName: string;
  fileData: File;
  extension: string;
}

export interface IChequeProtegidoProcesarArchivo {
  nombre: string;
}

export interface IParametro {
  idTipoParametro: string;
  descripcion: string;
  valorParametro: string;
}

export interface IPassword {
  idTipoParametro: string;
}
