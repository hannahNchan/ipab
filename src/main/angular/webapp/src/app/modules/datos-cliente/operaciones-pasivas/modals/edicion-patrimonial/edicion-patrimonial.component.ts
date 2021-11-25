import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { IPatrimonial, IPatrimonialInformacion, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { Subscription } from 'rxjs/Subscription';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";
import { PopUpMessage } from '@helpers/PopUpMessage';


@Component({
  selector: 'app-edicion-patrimonial',
  templateUrl: './edicion-patrimonial.component.html',
  styleUrls: ['./edicion-patrimonial.component.scss']
})
export class EdicionPatrimonialComponent implements OnInit, OnDestroy {

  isUpdate: boolean;
  patrimonialLocal: IPatrimonial;
  patrimonialInformacion: IPatrimonialInformacion;
  catalogosInformacion: ICatalogoGenerico;
  decimalPattern: string;
  enteroPattern: string;
  valid: boolean;
  subscribeSelectedPatrimonial: Subscription;
  subscribeInfoPatrimonial: Subscription;
  fechaReporte: string;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit() {
    this.valid = true
    this.decimalPattern = '^\\d{1,3}([,]\\d{3})*[.][0-9][0-9]$';
    this.enteroPattern = '^[0-9]+$';
    this.patrimonialInformacion = EdicionPatrimonialComponent.initPatrimonialInformacion();
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = catalogos
    })
    this.operacionesPasivasData$.fechaReporte.subscribe(fechaReporte => {
      this.fechaReporte = this.getFormatFecha(fechaReporte, 2);
    })
    this.subscribeSelectedPatrimonial = this.operacionesPasivasData$.selectedPatrimonial.subscribe(patrimonial => {
      this.patrimonialLocal = patrimonial;
      if (this.patrimonialLocal !== undefined) {
        this.isUpdate = true;
        swal({
          title: 'Obteniendo información...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.subscribeInfoPatrimonial = this.operacionesPasivasService.getPatrimonial(this.patrimonialLocal.numeroCliente, this.patrimonialLocal.numeroCuenta, this.patrimonialLocal.loadDate).subscribe(resp => {
          if (resp.header['estatus'] === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
          }
          else {
            if (resp['patrimonial'] !== undefined) {
              resp['patrimonial'].fechaContratacion = {
                'year': parseInt(resp['patrimonial'].fechaContratacion.substr(-4, 4)),
                'month': parseInt(resp['patrimonial'].fechaContratacion.substr(3, 2)),
                'day': parseInt(resp['patrimonial'].fechaContratacion.substr(0, 2))
              }
              resp['patrimonial'].ultimaProvisionIntereses = {
                'year': parseInt(resp['patrimonial'].ultimaProvisionIntereses.substr(-4, 4)),
                'month': parseInt(resp['patrimonial'].ultimaProvisionIntereses.substr(3, 2)),
                'day': parseInt(resp['patrimonial'].ultimaProvisionIntereses.substr(0, 2))
              }
            }
            this.patrimonialInformacion = resp['patrimonial'];
            swal.close();
          }
        }, err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });
      } else {
        this.isUpdate = false;
        this.patrimonialInformacion = EdicionPatrimonialComponent.initPatrimonialInformacion();
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

  actualizarPatrimonial() {
    swal({
      title: 'Actualizando información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    let json
    let fecha = ""
    if (this.patrimonialInformacion.fechaContratacion['year'] !== undefined && !Number.isNaN(this.patrimonialInformacion.fechaContratacion['year'])) {
      fecha = this.getFormatFecha(this.patrimonialInformacion.fechaContratacion, 2)
    }
    let fecha1 = ""
    if (this.patrimonialInformacion.ultimaProvisionIntereses['year'] !== undefined && !Number.isNaN(this.patrimonialInformacion.ultimaProvisionIntereses['year'])) {
      fecha1 = this.getFormatFecha(this.patrimonialInformacion.ultimaProvisionIntereses, 2)
    }
    json = {
      alta: false,
      numeroCliente: this.patrimonialInformacion.numeroCliente,
      numeroCuenta: this.patrimonialInformacion.numeroCuenta,
      numeroInversion: this.patrimonialInformacion.numeroInversion,
      categoria: this.patrimonialInformacion.categoria,
      sucursal: this.patrimonialInformacion.sucursal,
      saldoCuenta: this.patrimonialInformacion.saldoCuenta.replace(/,/g, ""),
      saldoInteresArt61: this.patrimonialInformacion.saldoInteresArt61.replace(/,/g, ""),
      saldoInteres: this.patrimonialInformacion.saldoInteres.replace(/,/g, ""),
      monedaIPAB: this.patrimonialInformacion.monedaIPAB,
      fechaContratacion: fecha,
      plazoOperacion: this.patrimonialInformacion.plazoOperacion,
      tipoTasa: this.patrimonialInformacion.tipoTasa,
      tasa: this.patrimonialInformacion.tasa.replace(/,/g, ""),
      ultimaProvisionIntereses: fecha1,
      entidadFederativa: this.patrimonialInformacion.entidadFederativa,
      plaza: this.patrimonialInformacion.plaza,
      loadDate: this.fechaReporte,
    }
    this.operacionesPasivasService.updatePatrimonial(json).subscribe(resp => {
      if (resp['header'].estatus === false) {
        swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
      }
      else {
        swal(PopUpMessage.getSuccesMessage(resp, null, null)).then(() => {
          this.modalService.dismissAll()
        })
      }
    }, err => {
      swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
        console.error(err);
      });
    });
  }

  nuevoPatrimonial() {
    let json
    let today = new Date();
    let fechaT = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()
    let fecha = ""
    if (this.patrimonialInformacion.fechaContratacion['year'] !== undefined) {
      fecha = this.patrimonialInformacion.fechaContratacion['year'].toString() + this.patrimonialInformacion.fechaContratacion['month'].toString() + this.patrimonialInformacion.fechaContratacion['day'].toString()
    }
    let fecha1 = ""
    if (this.patrimonialInformacion.ultimaProvisionIntereses['year'] !== undefined) {
      fecha1 = this.patrimonialInformacion.ultimaProvisionIntereses['year'].toString() + this.patrimonialInformacion.ultimaProvisionIntereses['month'].toString() + this.patrimonialInformacion.ultimaProvisionIntereses['day'].toString()
    }
    json = {
      alta: true,
      numeroCliente: this.patrimonialInformacion.numeroCliente,
      numeroCuenta: this.patrimonialInformacion.numeroCuenta,
      numeroInversion: this.patrimonialInformacion.numeroInversion,
      categoria: this.patrimonialInformacion.categoria,
      sucursal: this.patrimonialInformacion.sucursal,
      saldoCuenta: this.patrimonialInformacion.saldoCuenta,
      saldoInteresArt61: this.patrimonialInformacion.saldoInteresArt61,
      saldoInteres: this.patrimonialInformacion.saldoInteres,
      monedaIPAB: this.patrimonialInformacion.monedaIPAB,
      fechaContratacion: fecha,
      plazoOperacion: this.patrimonialInformacion.plazoOperacion,
      tipoTasa: this.patrimonialInformacion.tipoTasa,
      tasa: this.patrimonialInformacion.tasa,
      ultimaProvisionIntereses: fecha1,
      entidadFederativa: this.patrimonialInformacion.entidadFederativa,
      plaza: this.patrimonialInformacion.plaza,
      loadDate: fechaT,
    }
    this.operacionesPasivasService.newPatrimonial(json).subscribe(resp => {
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
    if (!this.patrimonialInformacion.saldoCuenta.match(this.decimalPattern) && this.patrimonialInformacion.saldoCuenta.length > 0) {
      this.valid = false;
    }
    else if (!this.patrimonialInformacion.saldoInteresArt61.match(this.decimalPattern) && this.patrimonialInformacion.saldoInteresArt61.length > 0) {
      this.valid = false;
    }
    else if (!this.patrimonialInformacion.saldoInteres.match(this.decimalPattern) && this.patrimonialInformacion.saldoInteres.length > 0) {
      this.valid = false;
    }
    else if (!this.patrimonialInformacion.plazoOperacion.match(this.enteroPattern) && this.patrimonialInformacion.plazoOperacion.length > 0) {
      this.valid = false;
    }
    else if (!this.patrimonialInformacion.tasa.match(this.decimalPattern) && this.patrimonialInformacion.tasa.length > 0) {
      this.valid = false;
    }
    else {
      this.valid = true;
    }

    if (type !== undefined) {
      let str0 = ''
      if (type == 'saldoCuenta') str0 = this.patrimonialInformacion.saldoCuenta
      if (type == 'saldoArt') str0 = this.patrimonialInformacion.saldoInteresArt61
      if (type == 'saldoInteres') str0 = this.patrimonialInformacion.saldoInteres
      if (type == 'tasa') str0 = this.patrimonialInformacion.tasa
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
      if (type == 'saldoCuenta') this.patrimonialInformacion.saldoCuenta = final
      if (type == 'saldoArt') this.patrimonialInformacion.saldoInteresArt61 = final
      if (type == 'saldoInteres') this.patrimonialInformacion.saldoInteres = final
      if (type == 'tasa') this.patrimonialInformacion.tasa = final
    }
  }

  ngOnDestroy(): void {
    if (this.isUpdate) {
      this.subscribeInfoPatrimonial.unsubscribe();
    }
    this.subscribeSelectedPatrimonial.unsubscribe();
  }

  private static initPatrimonialInformacion(): IPatrimonialInformacion {
    return {
      numeroCliente: '',
      numeroCuenta: '',
      numeroInversion: '',
      categoria: '',
      sucursal: '',
      saldoCuenta: '',
      saldoInteresArt61: '',
      saldoInteres: '',
      monedaIPAB: '',
      fechaContratacion: '',
      plazoOperacion: '',
      tipoTasa: '',
      tasa: '',
      ultimaProvisionIntereses: '',
      entidadFederativa: '',
      plaza: '',
      loadDate: '',
    };
  }

}
