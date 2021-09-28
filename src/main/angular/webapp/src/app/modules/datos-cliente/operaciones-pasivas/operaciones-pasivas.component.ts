import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import { AltaModificacionComponent } from './modals/alta-modificacion/alta-modificacion.component';
import { EdicionPatrimonialComponent } from './modals/edicion-patrimonial/edicion-patrimonial.component';

@Component({
  selector: 'app-operaciones-pasivas',
  templateUrl: './operaciones-pasivas.component.html',
  styleUrls: ['./operaciones-pasivas.component.scss']
})
export class OperacionesPasivasComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModalAltaModificacion(): void {
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaModificacionComponent, ngbModalOptions);
  }

  openModalPatrimonial(): void {
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(EdicionPatrimonialComponent, ngbModalOptions);
  }

}
