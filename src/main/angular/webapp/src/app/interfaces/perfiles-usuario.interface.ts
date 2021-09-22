export interface Iperfil {
  idPerfil: number;
  codigo: string;
  descripcion: string;
  idUsuario: number;
}

export interface IArbol {
  id: string;
  name: string;
  isChecked: boolean;
  hasChild: boolean;
  pid: string;
}

export interface Ipermiso {
  idPerfil: number;
  idSeccion: number;
  idModulo: number;
  idUsuario: number;
}

export interface IActualizarPermiso {
  permisos: Ipermiso[];
}
