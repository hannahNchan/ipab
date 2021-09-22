import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss']
})

export class ProcesoComponent implements OnInit {

  fechaProceso: string;
  maxFecha: NgbDateStruct;

  constructor( private _calendar: NgbCalendar) {}

  ngOnInit(): void {
    this.maxFecha = this._calendar.getToday();
  }

  onClickAceptar(): void {}
}
