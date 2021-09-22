/**
 * Example of a String Time adapter
 */
import { Injectable } from '@angular/core';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  /**
   * TimePicker from model
   * @param value
   */
  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  /**
   * time to model parser
   * @param time
   */
  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${NgbTimeStringAdapter.pad(time.hour)}:${NgbTimeStringAdapter.pad(time.minute)}:${NgbTimeStringAdapter.pad(time.second)}`;
  }

  /**
   * Parser number
   * @param i
   */
  private static pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}
