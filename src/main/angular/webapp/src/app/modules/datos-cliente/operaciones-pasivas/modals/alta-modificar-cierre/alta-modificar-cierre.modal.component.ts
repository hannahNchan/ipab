import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-alta-modificar-cierre',
  templateUrl: './alta-modificar-cierre.modal.component.html',
  styleUrls: ['./alta-modificar-cierre.modal.component.scss']
})
export class AltaModificarCierreModalComponent implements OnInit, OnDestroy {
  isUpdate: boolean;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

}
