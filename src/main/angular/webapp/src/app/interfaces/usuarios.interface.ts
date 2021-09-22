export interface IUsuario {
  idUsuario: number;
  nombre1: string;
  nombre2: string;
  apellidoPat: string;
  apellidoMat: string;
}

export interface IperfilUsuario {
  idPerfil: number;
  codigo: string;
  descripcion: string;
  idUsuario: number;
  selected: boolean;
}

export interface IUsuarioData {
  idUsuario: number;
  nombre1: string;
  nombre2: string;
  apellidoPat: string;
  apellidoMat: string;
  usuario: string;
  activo: string;
  idUsuarioAlta: number;
}

export interface IUsuarioPerfiles {
  idUsuario: number;
  idPerfil: number;
  estatus: string;
}

export interface IUsuarioAlta {
  usuario: IUsuarioData;
  usuarioPerfiles: IUsuarioPerfiles[];
}
