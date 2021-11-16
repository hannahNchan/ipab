import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { OperacionesActivasDataService } from '@services/operaciones-activas-data.service';
import { ITabla5 } from '@interfaces/operaciones-activas.interface';
import {Subscription} from "rxjs/Subscription";
import swal from "sweetalert2";
import {PopUpMessage} from "@helpers/PopUpMessage";
import {OperacionesActivasService} from "@services/operaciones-activas.service";
import {IDate} from "@interfaces/date.interface";

@Component({
  selector: 'app-alta-modificar-tabla5a',
  templateUrl: './alta-modificar-tabla5a.modal.component.html',
  styleUrls: ['./alta-modificar-tabla5a.modal.component.scss']
})
export class AltaModificarTabla5aModalComponent implements OnInit, OnDestroy {

  localTabla5A: ITabla5;
  nuevaTabla5A: ITabla5;
  today: IDate;

  subscriptionSelectedTabla5A: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private _data$: OperacionesActivasDataService,
              private operacionesActivasService: OperacionesActivasService,
              private _calendar: NgbCalendar) { }

  ngOnInit() {
    this.subscriptionSelectedTabla5A = this._data$.selectedTable5a.subscribe(tabla5 => {
      this.localTabla5A = tabla5;
    });
  }

  ngOnDestroy() {
    this.subscriptionSelectedTabla5A.unsubscribe();
  }

  onClickAceptar() {
    this.nuevaTabla5A = this.localTabla5A;
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.operacionesActivasService.updateTabla5A(this.nuevaTabla5A).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          swal(PopUpMessage.getSuccesMessage(response, 'Actualización exitosa.', null)).then(() => {
            this.activeModal.close('close');
          });
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
  }
}
