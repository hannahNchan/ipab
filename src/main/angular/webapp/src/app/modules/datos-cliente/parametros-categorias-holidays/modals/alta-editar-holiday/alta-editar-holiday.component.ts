import { Component, OnInit } from "@angular/core";

import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-alta-editar-holiday",
  templateUrl: "./alta-editar-holiday.component.html",
  styleUrls: ["./alta-editar-holiday.component.scss"],
})
export class AltaEditarHolidayComponent implements OnInit {
  isUpdate: boolean;
  meses: number[];

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.isUpdate = false;
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }
}
