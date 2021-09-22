export class GeneralHelper {
    
  /**
   * Obtiene el nombre del mes
   */
  static obtieneNombreMes(valor: number): string {
    let nombre = '';

    if (valor === 1) { nombre = 'Enero'; }
    else if (valor === 2) { nombre = 'Febrero'; }
    else if (valor === 3) { nombre = 'Marzo'; }
    else if (valor === 4) { nombre = 'Abril'; }
    else if (valor === 5) { nombre = 'Mayo'; }
    else if (valor === 6) { nombre = 'Junio'; }
    else if (valor === 7) { nombre = 'Julio'; }
    else if (valor === 8) { nombre = 'Agosto'; }
    else if (valor === 9) { nombre = 'Septiembre'; }
    else if (valor === 10) { nombre = 'Octubre'; }
    else if (valor === 11) { nombre = 'Noviembre'; }
    else if (valor === 12) { nombre = 'Diciembre'; }

    return nombre;
  }
  /**
   * Obtiene el arreglo de meses
   * @returns listaMeses
   */
  static obtieneListaMeses(inicial: boolean): any[] {
    const listaMeses: Mes[] = [];
    
    interface Mes {
      id: Number;
      descripcion: String;
    }
    
    let mes: Mes;

    if ( inicial ) {
      mes = { id: 0, descripcion: 'Seleccionar' };
      listaMeses.push(mes);
    }
    
    mes = { id: 1, descripcion: 'Enero' };
    listaMeses.push(mes);
    
    mes = { id: 2, descripcion: 'Febrero' };
    listaMeses.push(mes);
    
    mes = { id: 3, descripcion: 'Marzo' };
    listaMeses.push(mes);
    
    mes = { id: 4, descripcion: 'Abril' };
    listaMeses.push(mes);
    
    mes = { id: 5, descripcion: 'Mayo' };
    listaMeses.push(mes);
    
    mes = { id: 6, descripcion: 'Junio' };
    listaMeses.push(mes);
    
    mes = { id: 7, descripcion: 'Julio' };
    listaMeses.push(mes);
    
    mes = { id: 8, descripcion: 'Agosto' };
    listaMeses.push(mes);
    
    mes = { id: 9, descripcion: 'Septiembre' };
    listaMeses.push(mes);
    
    mes = { id: 10, descripcion: 'Octubre' };
    listaMeses.push(mes);
    
    mes = { id: 11, descripcion: 'Noviembre' };
    listaMeses.push(mes);
    
    mes = { id: 12, descripcion: 'Diciembre' };
    listaMeses.push(mes);
    
    return listaMeses;
  }

  /**
   * Obtiene el arreglo de años, toma el año actual, resta dos años y suma dos años
   * @returns listaAnios
   */
  static obtieneListaAnios(inicial: boolean): any[] {
    const listaAnios: Anio[] = [];
    
    interface Anio {
      id: Number;
      descripcion: String;
    }

    const vFecha: Date = new Date();
    const vInicio = vFecha.getFullYear() - 2;
    const vFin = vFecha.getFullYear() + 2;

    let anio: Anio;

    if ( inicial ) {
      anio = { id: 0, descripcion: 'Seleccionar' };
      listaAnios.push(anio);
    }   

    for (let i = vInicio; i <= vFin; i++) {
      anio = { id: i, descripcion: i.toString() };
      listaAnios.push(anio);
    }

    return listaAnios;
  }

  /**
   * Obtiene el arreglo de cuatrimestres
   * @returns listaCuatrimestre
   */
  static obtieneListaCuatrimestre(inicial: boolean): any[] {
    const listaCuatrimestre: Cuatrimestre[] = [];
    
    interface Cuatrimestre {
      id: Number;
      descripcion: String;
    }

    let cuatrimestre: Cuatrimestre;

    if ( inicial ) {
      cuatrimestre = { id: 0, descripcion: 'Seleccionar' };
      listaCuatrimestre.push(cuatrimestre);
    }   

    cuatrimestre = { id: 1, descripcion: 'Primer' };
    listaCuatrimestre.push(cuatrimestre);

    cuatrimestre = { id: 2, descripcion: 'Segundo' };
    listaCuatrimestre.push(cuatrimestre);

    cuatrimestre = { id: 3, descripcion: 'Tercer' };
    listaCuatrimestre.push(cuatrimestre);

    cuatrimestre = { id: 4, descripcion: 'Cuarto' };
    listaCuatrimestre.push(cuatrimestre);

    return listaCuatrimestre;
  }
}
