import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICierreCuentas } from '@interfaces/operaciones-pasivas.interface';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";
import { PopUpMessage } from '@helpers/PopUpMessage';

@Component({
  selector: 'app-alta-modificar-cierre',
  templateUrl: './alta-modificar-cierre.modal.component.html',
  styleUrls: ['./alta-modificar-cierre.modal.component.scss']
})
export class AltaModificarCierreModalComponent implements OnInit, OnDestroy {
  isUpdate: boolean;
  cierreInformacion: ICierreCuentas;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit(): void {
    this.cierreInformacion = AltaModificarCierreModalComponent.initCierreInformacion();
  }

  nuevoCierre() {
    let json
    let today = new Date();
    let fecha = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()
    let fecha1 = ""
    if (this.cierreInformacion.fechaCierre['year'] !== undefined) {
      fecha1 = this.cierreInformacion.fechaCierre['year'].toString() + this.cierreInformacion.fechaCierre['month'].toString() + this.cierreInformacion.fechaCierre['day'].toString()
    }
    json = {
      alta: true,
      loadDate: fecha,
      idTitular: this.cierreInformacion.idTitular,
      idCuenta: this.cierreInformacion.idCuenta,
      fechaCierre: fecha1
    }
    this.operacionesPasivasService.newCierre(json).subscribe(resp => {
      if (resp['header'].estatus === false) {
        swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
      }
      else {
        swal(PopUpMessage.getSuccesMessage(resp, null, null)).then();
      }
    }, err => {
      swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
        console.error(err);
      });
    });
  }

  ngOnDestroy(): void { }

  private static initCierreInformacion(): ICierreCuentas {
    return {
      idTitular: '',
      idCuenta: '',
      fechaCierre: '',
      loadDate: ''
    };
  }

}
