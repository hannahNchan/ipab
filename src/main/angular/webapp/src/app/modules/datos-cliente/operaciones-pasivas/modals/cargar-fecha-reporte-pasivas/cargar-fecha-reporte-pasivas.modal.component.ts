import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';

@Component({
  selector: 'app-cargar-fecha-reporte-pasivas',
  templateUrl: './cargar-fecha-reporte-pasivas.modal.component.html',
  styleUrls: ['./cargar-fecha-reporte-pasivas.modal.component.scss']
})
export class CargarFechaReportePasivasModalComponent implements OnInit, OnDestroy {
  isUpdate: boolean;
  fecha: string = '';

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void { }

  guardarFecha() {
    this.operacionesPasivasData$.saveFechaReporte(this.fecha);
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
