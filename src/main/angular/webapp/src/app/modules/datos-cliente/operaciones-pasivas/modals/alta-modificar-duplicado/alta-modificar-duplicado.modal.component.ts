import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-alta-modificar-duplicado',
  templateUrl: './alta-modificar-duplicado.modal.component.html',
  styleUrls: ['./alta-modificar-duplicado.modal.component.scss']
})
export class AltaModificarDuplicadoModalComponent implements OnInit, OnDestroy {
  isUpdate: boolean;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

}
