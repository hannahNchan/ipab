import { Component, OnInit, Input } from "@angular/core";

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParametrosCategoriasHolidaysDataService } from '@services/parametros-categorias-holidays-data.service';
import { ParametrosCategoriasHolidaysService } from '@services/parametros-categorias-holidays.service';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';
import { ICalendario, IYearSelected } from '@interfaces/parametros-categorias-holidays.interface';

@Component({
  selector: 'app-alta-editar-holiday',
  templateUrl: './alta-editar-holiday.component.html',
  styleUrls: ['./alta-editar-holiday.component.scss']
})
export class AltaEditarHolidayComponent implements OnInit {
  @Input() public isUpdate: boolean;
  @Input() public selectedRow: IYearSelected;
  meses: number[];
  calendarioLocal: ICalendario;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private paramData$: ParametrosCategoriasHolidaysDataService,
    private paramService: ParametrosCategoriasHolidaysService
  ) {}

  ngOnInit() {
    console.log(this.selectedRow)
    this.calendarioLocal = AltaEditarHolidayComponent.initCalendario();
    this.isUpdate = false;
    this.paramData$.selectedParametro.subscribe(calendario => {
      this.calendarioLocal = calendario;
      if (this.calendarioLocal !== undefined) {
    this.paramService.getListaCalendario(this.selectedRow.anio).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          this.calendarioLocal = response['lista'];
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
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
      isAlta: false,
      descripcion: '',
      paramName: '',
      paramValue: '',
      comment: '',
      loadDate: '',
      tipo: 0
    };
  }
}
