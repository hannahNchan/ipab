import { IDate, ITime } from '@modules/../interfaces/date.interface';
import { analyzeAndValidateNgModules } from '@angular/compiler';

export class DateHelper {
  /**
   * Obtiene la fecha actual
   * @returns strToday: Fecha en formato dd/mm/yyyy
   */
  static getStrTodayDate(): string {
    const today = DateHelper.getTodayDate();
    return DateHelper.formatearFecha(today);
  }

  /**
   * Da el formato de fecha esperada por Date.util de
   * Java a la fecha actual.
   */
  static getStrTodayDateJavaUtilFormat(): string {
    const today = DateHelper.getTodayDate();
    return DateHelper.formatearFechaJavaUtil(today);
  }

  /**
   * Convierte a la fecha recuperada de la base de datos a la interfaz requerida por Angular
   * @param fecha fecha recuperada de la base de datos  { string }
   * @returns fecha: Fecha en formato { day:int, month:int, year:int }
   */
  static convertStringToIDate(fecha: string): IDate {
    const aux = fecha.split('/', 3);
    return {
      day: parseInt(aux[0], 10),
      month: parseInt(aux[1], 10),
      year: parseInt(aux[2], 10)
    };
  }

  /**
   * Convierte a la fecha recuperada de la base de datos con formato aaaammdd a la interfaz requerida por Angular
   * @param fecha fecha recuperada de la base de datos  { string }
   * @returns fecha: Fecha en formato { day:int, month:int, year:int }
   */
  static convertString2ToIDate(fecha: string): IDate {
    const aux = fecha.slice(0, 4);
    const aux2 = fecha.slice(4, 6);
    const aux3 = fecha.slice(6, 8);
    return {
      day: parseInt(aux3, 10),
      month: parseInt(aux2, 10),
      year: parseInt(aux, 10)
    };
  }

  /**
   * Convierte la hora a interfae ITime
   * @param hora Hora a convertir en formato hh:mm:ss
   */
  static convertStringToITime(hora: string): ITime {
    const aux = hora.split(':', 3);
    return {
      hour: parseInt(aux[0], 10),
      minute: parseInt(aux[1], 10),
      second: parseInt(aux[2], 10)
    };
  }

  /**
   * Convierte una hora y minuto de la interfaz ITime a string.
   * @param hora interfaz.
   */
  static convertITimeToString(hora: ITime): string {
    let horaStr = hora.hour.toString();
    let minStr = hora.minute.toString();
    if (hora.hour < 10) {
      horaStr = '0' + horaStr;
    }
    if (hora.minute < 10) {
      minStr = '0' + minStr;
    }
    return horaStr + ':' + minStr;
  }

  /**
   * Obtiene la MÁXIMA fecha de nacimiento posible
   */
  static getMaxFechaNacDate(): IDate {
    const today = new Date();
    return {
      year: today.getFullYear() - 18,
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  /**
   * Obtiene la MÍNIMA fecha de nacimiento posible
   */
  static getMinFechaNacDate(): IDate {
    const today = new Date();
    return {
      year: today.getFullYear() - 76,
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  /**
   * Obtiene la fecha actual
   */
  static getFechaUpToDate(): IDate {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  /**
   * Da formato al objeto de fecha brindado por angular datepicker
   * @param fecha Fecha formateada
   */
  static formatearFecha(fecha: IDate): string {
    let sdd = '';
    let smm = '';
    if (fecha.day === null || fecha.month === null || fecha.year === null) {
      return null;
    }
    if (!fecha.day || !fecha.month || !fecha.year) {
      return null;
    }
    if (fecha.day < 10) {
      sdd = '0' + fecha.day;
    } else {
      sdd = fecha.day.toString();
    }
    if (fecha.month < 10) {
      smm = '0' + fecha.month;
    } else {
      smm = fecha.month.toString();
    }

    return sdd + '/' + smm + '/' + fecha.year;
  }

  /**
   * Da formato al objeto de fecha brindado por angular datepicker.
   * @param fecha Fecha formateada
   */
  static formatearFechaJavaUtil(fecha: IDate): string {
    let sdd = '';
    let smm = '';
    if (fecha.day === null || fecha.month === null || fecha.year === null) {
      return null;
    }
    if (!fecha.day || !fecha.month || !fecha.year) {
      return null;
    }
    if (fecha.day < 10) {
      sdd = '0' + fecha.day;
    } else {
      sdd = fecha.day.toString();
    }
    if (fecha.month < 10) {
      smm = '0' + fecha.month;
    } else {
      smm = fecha.month.toString();
    }
    return fecha.year + '-' + smm + '-' + sdd;
  }

  /**
   * Devuelve el regex para validar una fecha.
   * - dividido en variables para que se entienda y se pueda mantener/editar.
   */
  static regexValidarFecha(): any {
    const sep = '[/]',
      dia1a28 = '(0?[1-9]|1\\d|2[0-8])',
      dia29 = '(29)',
      dia29o30 = '(29|30)',
      dia31 = '(31)',

      mes1a12 = '(0?[1-9]|1[0-2])',
      mes2 = '(0?2)',
      mesNoFeb = '(0?[13-9]|1[0-2])',
      mes31dias = '(0?[13578]|1[02])',

      diames29Feb = dia29 + sep + mes2,
      diames1a28 = dia1a28 + sep + mes1a12,
      diames29o30noFeb = dia29o30 + sep + mesNoFeb,
      diames31 = dia31 + sep + mes31dias,
      diamesNo29Feb = '(?:' + diames1a28 + '|' + diames29o30noFeb + '|' + diames31 + ')',

      anno1a9999 = '(0{2,3}[1-9]|0{1,2}[1-9]\\d|0?[1-9]\\d{2}|[1-9]\\d{3})',
      annoMult4no100 = '\\d{1,2}(?:0[48]|[2468][048]|[13579][26])',
      annoMult400 = '(?:0?[48]|[13579][26]|[2468][048])00',
      annoBisiesto = '(' + annoMult4no100 + '|' + annoMult400 + ')',

      fechaNo29Feb = diamesNo29Feb + sep + anno1a9999,
      fecha29Feb = diames29Feb + sep + annoBisiesto,

      fechaFinal = '^(?:' + fechaNo29Feb + '|' + fecha29Feb + ')$';

    return new RegExp(fechaFinal);
  }

  /**
   * Valida una fecha ingresada como "m/d/aaaa"
   * Si no es válida, devuelve false
   * Si es válida, devuelve un objeto {d:"día",m:"mes",a:"año",date:date}
   * @param texto
   */
  static validarFecha(texto: string): any {
    const fechaValida = DateHelper.regexValidarFecha();
    const grupos = fechaValida.exec(texto);

    return !!grupos;  // No es fecha válida
  }

  /**
   * Obtiene la fecha actual
   * @returns strToday: Fecha en formato { day:int, month:int, year:int }
   */
  static getTodayDate(): IDate {
    const today = new Date();
    return {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };
  }

  /**
   * Da formato al objeto de fecha brindado por angular datepicker.
   * @param fecha Fecha formateada
   */
  static fechaCalendarFormat(fecha: IDate): string {
    let sdd = '';
    let smm = '';
    if (fecha.day === null || fecha.month === null || fecha.year === null) {
      return null;
    }
    if (!fecha.day || !fecha.month || !fecha.year) {
      return null;
    }
    if (fecha.day < 10) {
      sdd = '0' + fecha.day;
    } else {
      sdd = fecha.day.toString();
    }
    if (fecha.month < 10) {
      smm = '0' + fecha.month;
    } else {
      smm = fecha.month.toString();
    }
    return fecha.year + '/' + smm + '/' + sdd;
  }
}
