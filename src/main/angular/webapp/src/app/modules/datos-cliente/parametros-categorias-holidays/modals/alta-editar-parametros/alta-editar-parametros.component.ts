import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IParametro } from '@interfaces/parametros-categorias-holidays.interface';
import { ParametrosCategoriasHolidaysDataService } from '@services/parametros-categorias-holidays-data.service';
import swal from 'sweetalert2';
import { ParametrosCategoriasHolidaysService } from '@services/parametros-categorias-holidays.service';
import { PopUpMessage } from "@helpers/PopUpMessage";

@Component({
  selector: 'app-alta-editar-parametros',
  templateUrl: './alta-editar-parametros.component.html',
  styleUrls: ['./alta-editar-parametros.component.scss']
})
export class AltaEditarParametrosComponent implements OnInit {
  @Input() public isUpdate: boolean;

  parametroLocal: IParametro;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private paramData$: ParametrosCategoriasHolidaysDataService,
    private paramService: ParametrosCategoriasHolidaysService
  ) { }

  ngOnInit() {
    this.parametroLocal = AltaEditarParametrosComponent.initParametro();
    this.isUpdate = false;
    this.paramData$.selectedParametro.subscribe(parametro => {
      this.parametroLocal = parametro;
      if (this.parametroLocal !== undefined) {
        this.isUpdate = true;
      } else {
        this.isUpdate = false;
        this.parametroLocal = AltaEditarParametrosComponent.initParametro();
      }
    });
  }

  onClickAceptar(): void {
    if (this.isUpdate) {
      swal({
        title: 'Actualizando parámetro...',
        text: 'Espere por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.paramService.updateParametro(this.parametroLocal)
        .subscribe(res => {
          if (res.header['estatus']) {
            swal(PopUpMessage.getSuccesMessage(res, null, null)).then(() => { });
          } else {
            swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
          }
        });
    } else {
      swal({
        title: 'Creando parámetro...',
        text: 'Espere por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.paramService.altaParametro(this.parametroLocal)
        .subscribe(res => {
          if (res.header['estatus']) {
            swal(PopUpMessage.getSuccesMessage(res, null, null)).then(() => { });
          } else {
            swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
          }
        });
    }
  }

  private static initParametro(): IParametro {
    return {
      alta: false,
      comment: '',
      descripcion: '',
      loadDate: '',
      paramName: '',
      paramValue: '',
      tipo: 0
    };
  }

}
