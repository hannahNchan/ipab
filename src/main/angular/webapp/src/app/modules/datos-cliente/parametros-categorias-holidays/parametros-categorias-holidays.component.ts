import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import { AltaEditarCategoriasComponent } from "./modals/alta-editar-categorias/alta-editar-categorias.component";
import { AltaEditarParametrosComponent } from "./modals/alta-editar-parametros/alta-editar-parametros.component";
import { AltaEditarHolidayComponent } from '@modules/datos-cliente/parametros-categorias-holidays/modals/alta-editar-holiday/alta-editar-holiday.component';


@Component({
  selector: "parametros-categorias-holidays",
  templateUrl: "./parametros-categorias-holidays.component.html",
  styleUrls: ["./parametros-categorias-holidays.component.scss"],
})
export class ParametrosCategoriasHolidaysComponent implements OnInit {
  constructor(private modalService: NgbModal) {}
  isUpdate: boolean;
  ngOnInit(): void {}

  /**
   * Abre el modal para la alta de usuario
   */
  openModalAltaParametro(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    };
    const activeModal = this.modalService
      .open(AltaEditarParametrosComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = false;
  }

  /**
   * Abre el modal para la alta de usuario
   */
  openModalEditarParametro(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    };
    const activeModal = this.modalService
      .open(AltaEditarParametrosComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = true;
  }

  /**
   * Abre el modal para la alta de usuario
   */
  openModalAltaCategoria(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    };
    const activeModal = this.modalService
      .open(AltaEditarCategoriasComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = false;
  }

  /**
   * Abre el modal para la alta de usuario
   */
  openModalEditarCategoria(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    };
    const activeModal = this.modalService
      .open(AltaEditarCategoriasComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = true; 
  }

  /**
   * Abre el modal para la alta de usuario
   */
   openModalAltaHoliday(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    };
    const activeModal = this.modalService
      .open(AltaEditarHolidayComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = false; 
  }

  /**
   * Abre el modal para la alta de usuario
   */
  openModalEditarHoliday(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    };
    const activeModal = this.modalService
      .open(AltaEditarHolidayComponent, ngbModalOptions);
    activeModal.componentInstance.isUpdate = true; 
  }
}
