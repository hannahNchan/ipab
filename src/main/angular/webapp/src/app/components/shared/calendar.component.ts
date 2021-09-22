import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  }
  // other languages you would support
};

/**
 * Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
 * use the Angular LOCALE_ID value
 */
@Injectable()
export class I18n {
  language = 'es';
}

/**
 * Define custom service providing the months and weekdays translations
 */
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  /**
   * Weekday shot name getter
   * @param weekday
   */
  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  /**
   * Month short name getter
   * @param month
   */
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }

  /**
   * Full name month getter
   * @param month
   */
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  /**
   * day aria label getter
   * @param date
   */
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

/**
 * Pad Number method
 * @param value
 */
function padNumber(value: number): string {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  }
  return '';
}

/**
 * Is name validator
 * @param value
 */
function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

/**
 * integer parse
 * @param value
 */
function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return { year: toInteger(dateParts[0]), month: null, day: null };
      }
      if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return { year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null };
      }
      if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return { year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0]) };
      }
    }
    return null;
  }

  /**
   * Calendar parser to String date
   * @param date
   */
  format(date: NgbDateStruct): string {
    let stringDate = '';
    if (date) {
      stringDate += isNumber(date.day) ? padNumber(date.day) + '/' : '';
      stringDate += isNumber(date.month) ? padNumber(date.month) + '/' : '';
      stringDate += date.year;
    }
    return stringDate;
  }
}
