import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  fechaProceso: string;
  maxFecha: NgbDateStruct;

  constructor( private _calendar: NgbCalendar) {}

  ngOnInit(): void {
    this.maxFecha = this._calendar.getToday();
  }

  getLogs(): void {}

}
