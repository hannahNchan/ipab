import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesActivasDataService } from '@services/operaciones-activas-data.service';

@Component({
  selector: 'app-cargar-fecha-reporte-activas',
  templateUrl: './cargar-fecha-reporte-activas.modal.component.html',
  styleUrls: ['./cargar-fecha-reporte-activas.modal.component.scss']
})
export class CargarFechaReporteActivasModalComponent implements OnInit, OnDestroy {
  isUpdate: boolean;
  fecha: string = '';

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesActivasData$: OperacionesActivasDataService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void { }

  guardarFecha() {
    this.operacionesActivasData$.saveFechaReporte(this.fecha);
    this.modalService.dismissAll()
  }

  isvalid() {
    if (this.fecha['day'] !== undefined && this.fecha['month'] !== undefined && this.fecha['year'] !== undefined) {
      return false
    }
    else {
      return true
    }
  }

}
