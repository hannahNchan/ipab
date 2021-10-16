import { Component, OnInit, Input } from "@angular/core";

import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-alta-editar-categorias",
  templateUrl: "./alta-editar-categorias.component.html",
  styleUrls: ["./alta-editar-categorias.component.scss"],
})
export class AltaEditarCategoriasComponent implements OnInit {
  @Input() public isUpdate: boolean;

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() { }
}
