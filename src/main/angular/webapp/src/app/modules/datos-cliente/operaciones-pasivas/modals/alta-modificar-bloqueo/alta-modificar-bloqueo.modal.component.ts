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
  enteroPattern: string;
  valid: boolean = true;
  subscribeSelectedBloqueo: Subscription;
  subscribeInfoBloqueo: Subscription;
  fechaReporte: any;
  fechaBloqueo: any;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit(): void {
    this.decimalPattern = '^\\d{1,3}([,]\\d{3})*[.][0-9][0-9]$';
    this.enteroPattern = '^[0-9]+$';
    this.bloqueoInformacion = AltaModificarBloqueoModalComponent.initBloqueoInformacion();
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = catalogos
    })
    this.operacionesPasivasData$.fechaReporte.subscribe(fechaReporte => {
      this.fechaReporte = fechaReporte
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
        this.fechaBloqueo = {
          'year': parseInt(this.getFormatFecha(this.fechaReporte, 1).split('/')[2]),
          'month': parseInt(this.getFormatFecha(this.fechaReporte, 1).split('/')[1]),
          'day': parseInt(this.getFormatFecha(this.fechaReporte, 1).split('/')[0])
        }
      }
    });

  }

  /**
  * Sólo permite la escritura de números con decimales
  * @param event Evento desencadenador
  */
  onKeyPressCodigo(event: KeyboardEvent): void {
    const inputChar = event.key;
    if (!inputChar.match(this.enteroPattern) && inputChar !== 'Backspace' && inputChar !== 'ArrowLeft' && inputChar !== 'ArrowRight' && inputChar !== '.') {
      // invalid character, prevent input
      event.stopPropagation();
      event.preventDefault()
    }
  }

  getFormatFecha(fecha1, type: number) {
    let fecha = fecha1
    let day = ''
    let month = ''
    if (parseInt(fecha['day']) < 10) day = '0' + fecha['day']
    else day = fecha['day']

    if (parseInt(fecha['month']) < 10) month = '0' + fecha['month']
    else month = fecha['month']

    if (type == 1) {
      return (
        day + "/" + month + "/" + fecha["year"]
      );
    }
    else {
      return (
        String(fecha["year"]) + String(month) + String(day)
      );
    }
  }

  getDescripcion(): void {
    const ItemIndex = this.catalogosInformacion['tipoBloqueo'].findIndex(
      (p) => p.clave === this.bloqueoInformacion.tipoBloqueo
    )
    this.bloqueoInformacion.descBloqueo = this.catalogosInformacion['tipoBloqueo'][ItemIndex].descripcion
  }

  nuevoBloqueo() {
    swal({
      title: 'Creando información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    let json
    let today = new Date();
    let fechaT = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()
    json = {
      alta: true,
      idCuenta: this.bloqueoInformacion.idCuenta,
      idBloqueo: this.bloqueoInformacion.idBloqueo,
      fechaBloqueo: this.getFormatFecha(this.fechaReporte, 2),
      montoBloqueo: this.bloqueoInformacion.montoBloqueo.replace(/,/g, ""),
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

  isValid(type: string): void {
    if (!this.bloqueoInformacion.montoBloqueo.match(this.decimalPattern) && this.bloqueoInformacion.montoBloqueo.length > 0) {
      this.valid = false;
    }
    else {
      this.valid = true;
    }

    if (type !== undefined) {
      let str0 = ''
      if (type == 'montoBloqueo') str0 = this.bloqueoInformacion.montoBloqueo
      let final = ""
      let str1 = str0.split(".")[0]
      let str2 = str1.replace(/,/g, "")
      let div = str2.length / 3
      let count = 1
      if (str2.length % 3 == 0) {
        div = div - 1
      }
      else {
        div = Math.trunc(div)
      }
      let strReverse = str2.split("").reverse()
      strReverse.forEach((char) => {
        final += char
        if (count == 3 && div > 0) {
          final += ","
          count = 1
          div -= 1
        }
        else count += 1
      })
      final = final.split("").reverse().join("")
      if (str0.split(".")[1] !== undefined) {
        final += "." + str0.split(".")[1]
      }
      if (type == 'montoBloqueo') this.bloqueoInformacion.montoBloqueo = final
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
