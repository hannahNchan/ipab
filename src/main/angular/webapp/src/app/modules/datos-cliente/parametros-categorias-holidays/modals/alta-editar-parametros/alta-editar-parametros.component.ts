import { Component, OnInit } from '@angular/core';

import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-alta-editar-parametros',
  templateUrl: './alta-editar-parametros.component.html',
  styleUrls: ['./alta-editar-parametros.component.scss']
})
export class AltaEditarParametrosComponent implements OnInit {

  isUpdate: boolean;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.isUpdate = false;
  }

}
