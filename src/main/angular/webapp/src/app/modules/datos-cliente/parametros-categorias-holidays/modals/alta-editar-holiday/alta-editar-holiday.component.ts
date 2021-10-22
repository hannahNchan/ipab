import { Component, OnInit, Input } from "@angular/core";

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParametrosCategoriasHolidaysDataService } from '@services/parametros-categorias-holidays-data.service';
import { ParametrosCategoriasHolidaysService } from '@services/parametros-categorias-holidays.service';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';
import { ICalendario } from '@interfaces/parametros-categorias-holidays.interface';

@Component({
  selector: 'app-alta-editar-holiday',
  templateUrl: './alta-editar-holiday.component.html',
  styleUrls: ['./alta-editar-holiday.component.scss']
})
export class AltaEditarHolidayComponent implements OnInit {
  @Input() public isUpdate: boolean;
  meses: number[];
  calendarioLocal: ICalendario;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private paramData$: ParametrosCategoriasHolidaysDataService,
    private paramService: ParametrosCategoriasHolidaysService
  ) {}

  ngOnInit() {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.calendarioLocal = AltaEditarHolidayComponent.initCalendario();
    this.isUpdate = false;
    this.paramData$.selectedParametro.subscribe(calendario => {
      this.calendarioLocal = calendario;
      if (this.calendarioLocal !== undefined) {
        this.isUpdate = true;
      } else {
        this.isUpdate = false;
        this.calendarioLocal = AltaEditarHolidayComponent.initCalendario();
      }
    });
  }

  onClickAceptar(): void {
    if (this.isUpdate) {
      swal({
        title: 'Actualizando calendario...',
        text: 'Espere por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.paramService.updateCalendario(this.calendarioLocal)
        .subscribe(res => {
          if (res.header['estatus']) {
            swal(PopUpMessage.getSuccesMessage(res, null , null)).then(() => {});
          } else {
            swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
          }
        });
    } else {
      swal({
        title: 'Creando calendario...',
        text: 'Espere por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.paramService.altaCalendario(this.calendarioLocal)
        .subscribe(res => {
          if (res.header['estatus']) {
            swal(PopUpMessage.getSuccesMessage(res, null , null)).then(() => {});
          } else {
            swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
          }
        });
    }
  }

  private static initCalendario(): ICalendario {
    return {
      description: '',
      paramName: '',
      paramValue: '',
      comment: '',
      loadDate: ''
    };
  }
}
