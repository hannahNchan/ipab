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

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit() {
    this.valid = true
    this.decimalPattern = '^[0-9]+[.][0-9][0-9]$';
    this.enteroPattern = '^[0-9]+$';
    this.patrimonialInformacion = EdicionPatrimonialComponent.initPatrimonialInformacion();
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = catalogos
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
            console.log(this.patrimonialInformacion)
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

  actualizarPatrimonial() {
    let json
    let fecha = ""
    if (this.patrimonialInformacion.fechaContratacion['year'] !== undefined && !Number.isNaN(this.patrimonialInformacion.fechaContratacion['year'])) {
      fecha = this.patrimonialInformacion.fechaContratacion['year'].toString() + this.patrimonialInformacion.fechaContratacion['month'].toString() + this.patrimonialInformacion.fechaContratacion['day'].toString()
    }
    let fecha1 = ""
    if (this.patrimonialInformacion.ultimaProvisionIntereses['year'] !== undefined && !Number.isNaN(this.patrimonialInformacion.ultimaProvisionIntereses['year'])) {
      fecha1 = this.patrimonialInformacion.ultimaProvisionIntereses['year'].toString() + this.patrimonialInformacion.ultimaProvisionIntereses['month'].toString() + this.patrimonialInformacion.ultimaProvisionIntereses['day'].toString()
    }
    json = {
      alta: false,
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
      loadDate: this.patrimonialInformacion.loadDate,
    }
    this.operacionesPasivasService.updatePatrimonial(json).subscribe(resp => {
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

  isValid(): void {
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
