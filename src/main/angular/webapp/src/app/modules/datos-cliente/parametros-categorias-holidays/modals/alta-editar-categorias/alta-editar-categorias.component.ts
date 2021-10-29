import { Component, OnInit, Input } from "@angular/core";

import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ICategoria, IParametro, ICatalogoNivelCuenta, ICatalogoClasificacion } from "@interfaces/parametros-categorias-holidays.interface";
import { ParametrosCategoriasHolidaysDataService } from "@services/parametros-categorias-holidays-data.service";
import swal from "sweetalert2";
import { PopUpMessage } from "@helpers/PopUpMessage";
import { ParametrosCategoriasHolidaysService, getCatalogoNivelCuenta, getCatalogoClasificacion } from "@services/parametros-categorias-holidays.service";

@Component({
  selector: "app-alta-editar-categorias",
  templateUrl: "./alta-editar-categorias.component.html",
  styleUrls: ["./alta-editar-categorias.component.scss"],
})
export class AltaEditarCategoriasComponent implements OnInit {
  @Input() public isUpdate: boolean;

  categoriaLocal: ICategoria;
  catalogoNivelCuenta: ICatalogoNivelCuenta;
  catalogoClasificacion: ICatalogoClasificacion;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private paramData$: ParametrosCategoriasHolidaysDataService,
    private paramService: ParametrosCategoriasHolidaysService
  ) { }

  ngOnInit() {
    this.categoriaLocal = AltaEditarCategoriasComponent.initCategoria();
    this.isUpdate = false;
    this.paramData$.selectedCategoria.subscribe(categoria => {
      this.categoriaLocal = categoria;
      if (this.categoriaLocal !== undefined) {
        this.isUpdate = true;
      } else {
        this.isUpdate = false;
        this.categoriaLocal = AltaEditarCategoriasComponent.initCategoria();
      }
    });
  }

  onClickAceptar(): void {
    if (this.isUpdate) {
      swal({
        title: 'Actualizando categoría...',
        text: 'Espere por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.paramService.updateCategoria(this.categoriaLocal)
        .subscribe(res => {
          if (res.header['estatus']) {
            swal(PopUpMessage.getSuccesMessage(res, null, null)).then(() => { });
          } else {
            swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
          }
        });
    } else {
      swal({
        title: 'Creando categoría...',
        text: 'Espere por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.paramService.altaCategoria(this.categoriaLocal)
        .subscribe(res => {
          if (res.header['estatus']) {
            swal(PopUpMessage.getSuccesMessage(res, null, null)).then(() => { });
          } else {
            swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
          }
        });
    }
  }

  private static initCategoria(): ICategoria {
    return {
      aplicacion: '',
      idRegistro: '',
      categoria: '',
      descripcion: '',
      shortName: '',
      tipoProd: '',
      nivelCta: '',
      modalidad: '',
      descripcionIPAB: '',
      productoIPAB: '',
      loadDate: '',
      isAlta: false,
      tipo: 0
    };
  }
}
