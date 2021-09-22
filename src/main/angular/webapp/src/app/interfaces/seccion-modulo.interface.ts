export interface ISeccion {
  idSeccion: number;
  descripcion: string;
}

export interface IModulo {
  idModulo: number;
  idSeccion: number;
  descripcion: string;
  url: string;
}
