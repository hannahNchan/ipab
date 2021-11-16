import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { IBloqueo, IBloqueoInformacion, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { Subscription } from 'rxjs/Subscription';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";
import { PopUpMessage } from '@helpers/PopUpMessage';


@Component({
  selector: 'app-alta-modificar-bloqueo',
  templateUrl: './alta-modificar-bloqueo.modal.component.html',
  styleUrls: ['./alta-modificar-bloqueo.modal.component.scss']
})
export class AltaModificarBloqueoModalComponent implements OnInit, OnDestroy {
  isUpdate: boolean;
  bloqueoLocal: IBloqueo;
  bloqueoInformacion: IBloqueoInformacion;
  catalogosInformacion: ICatalogoGenerico;
  decimalPattern: string;
  valid: boolean = true;
  subscribeSelectedBloqueo: Subscription;
  subscribeInfoBloqueo: Subscription;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit(): void {
    this.decimalPattern = '^[0-9]+[.][0-9][0-9]$';
    this.bloqueoInformacion = AltaModificarBloqueoModalComponent.initBloqueoInformacion();
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = catalogos
    })
    this.subscribeSelectedBloqueo = this.operacionesPasivasData$.selectedBloqueo.subscribe(bloqueo => {
      this.bloqueoLocal = bloqueo;
      if (this.bloqueoLocal !== undefined) {
        this.isUpdate = true;
        swal({
          title: 'Obteniendo información...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.subscribeInfoBloqueo = this.operacionesPasivasService.getBloqueo(this.bloqueoLocal.idCuenta, this.bloqueoLocal.idBloqueo).subscribe(resp => {
          if (resp.header['estatus'] === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
          }
          else {
            this.bloqueoInformacion = resp['bloqueo'];
            swal.close();
          }
        }, err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });
      } else {
        this.isUpdate = false;
        this.bloqueoInformacion = AltaModificarBloqueoModalComponent.initBloqueoInformacion();
      }
    });

  }

  getDescripcion(): void {
    const ItemIndex = this.catalogosInformacion['tipoBloqueo'].findIndex(
      (p) => p.clave === this.bloqueoInformacion.tipoBloqueo
    )
    this.bloqueoInformacion.descBloqueo = this.catalogosInformacion['tipoBloqueo'][ItemIndex].descripcion
  }

  nuevoBloqueo() {
    let json
    let today = new Date();
    let fechaT = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()
    let fecha = ""
    if (this.bloqueoInformacion.fechaBloqueo['year'] !== undefined) {
      fecha = this.bloqueoInformacion.fechaBloqueo['year'].toString() + this.bloqueoInformacion.fechaBloqueo['month'].toString() + this.bloqueoInformacion.fechaBloqueo['day'].toString()
    }
    json = {
      alta: true,
      idCuenta: this.bloqueoInformacion.idCuenta,
      idBloqueo: this.bloqueoInformacion.idBloqueo,
      fechaBloqueo: fecha,
      montoBloqueo: this.bloqueoInformacion.montoBloqueo,
      tipoBloqueo: this.bloqueoInformacion.tipoBloqueo,
      descBloqueo: this.bloqueoInformacion.descBloqueo,
      loadDate: fechaT,
    }
    this.operacionesPasivasService.newBloqueo(json).subscribe(resp => {
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

  isValid(): void {
    if (!this.bloqueoInformacion.montoBloqueo.match(this.decimalPattern) && this.bloqueoInformacion.montoBloqueo.length > 0) {
      this.valid = false;
    }
    else {
      this.valid = true;
    }
  }


  ngOnDestroy(): void {
    if (this.isUpdate) {
      this.subscribeInfoBloqueo.unsubscribe();
    }
    this.subscribeSelectedBloqueo.unsubscribe();
  }

  private static initBloqueoInformacion(): IBloqueoInformacion {
    return {
      idCuenta: '',
      idBloqueo: '',
      fechaBloqueo: '',
      montoBloqueo: '',
      tipoBloqueo: '',
      descBloqueo: '',
      loadDate: ''
    };
  }

}
