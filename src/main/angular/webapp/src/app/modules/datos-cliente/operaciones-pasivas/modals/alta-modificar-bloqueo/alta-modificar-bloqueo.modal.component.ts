import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-alta-modificar-bloqueo',
  templateUrl: './alta-modificar-bloqueo.modal.component.html',
  styleUrls: ['./alta-modificar-bloqueo.modal.component.scss']
})
export class AltaModificarBloqueoModalComponent implements OnInit, OnDestroy {
  isUpdate: boolean;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

}
