export interface IAuthUsuario {
  idUsuario?: number;
  usuario: string;
  password: string;
  token?: string;
  passwordExpira?: boolean;
  mensajeInicioSesion?: string;
  ultimoAcceso?: string;
}

export interface IMenu {
  id: number;
  title: string;
  class?: string;
  url?: string;
  menu?: IMenu[];
  selected: boolean;
}

export interface IModulo {
  idModulo: number;
  descripcion: string;
  url: string;
  facultades: string[];
}

export interface ISeccion {
  idSeccion: number;
  descripcion: string;
  modulos: IModulo[];
}

export interface IDatosPerfil {
  nombreUsuario: string;
  secciones: ISeccion[];
}

export interface IMenu {
  id: number;
  title: string;
  class?: string;
  url?: string;
  menu?: IMenu[];
  selected: boolean;
}
