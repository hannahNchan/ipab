import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cargar-archivo',
  templateUrl: './cargar-archivo.component.html',
  styleUrls: ['./cargar-archivo.component.scss']
})
export class CargarArchivoComponent implements OnInit {

  layouts: string[];
  selectedLayout: string;
  fecha: string;
  maxFecha: NgbDateStruct;

  constructor(private _calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.layouts = ['Formato 1', 'Formato 2', 'Formato 3', 'Formato 4', 'Formato 5', 'Formato 6'];
    this.maxFecha = this._calendar.getToday();
  }

  onClickAceptar(): void {}

}
