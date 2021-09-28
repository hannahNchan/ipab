import { Component, OnInit } from "@angular/core";

import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-alta-editar-categorias",
  templateUrl: "./alta-editar-categorias.component.html",
  styleUrls: ["./alta-editar-categorias.component.scss"],
})
export class AltaEditarCategoriasComponent implements OnInit {

  isUpdate: boolean;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.isUpdate = false;
  }
}
