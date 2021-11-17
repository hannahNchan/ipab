import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { ICliente, IClienteInformacion, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { Subscription } from 'rxjs/Subscription';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";
import { PopUpMessage } from '@helpers/PopUpMessage';
import { FormControl } from '@angular/forms';
import * as regExValidators from "@helpers/RFCVregex";

@Component({
  selector: 'app-alta-modificacion-cliente',
  templateUrl: './alta-modificacion-cliente.component.html',
  styleUrls: ['./alta-modificacion-cliente.component.scss']
})
export class AltaModificacionClienteComponent implements OnInit, OnDestroy {

  isUpdate: boolean;
  clienteLocal: ICliente;
  clienteInformacion: IClienteInformacion;
  catalogosInformacion: ICatalogoGenerico;

  subscribeSelectedCliente: Subscription;
  subscribeInfoCliente: Subscription;

  decimalPattern: string;
  enteroPattern: string;

  valid: boolean = true;

  regExValidator = new FormControl();
  curpRegEx = regExValidators.regExCURP;
  rfcFisicasRegEx = regExValidators.regExCURP;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit() {
    this.decimalPattern = '^[0-9]+[.][0-9][0-9]$';
    this.enteroPattern = '^[0-9]+$';
    this.clienteInformacion = AltaModificacionClienteComponent.initClienteInformacion();
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = JSON.parse(JSON.stringify(catalogos));
    })
    this.subscribeSelectedCliente = this.operacionesPasivasData$.selectedCliente.subscribe(cliente => {
      this.clienteLocal = cliente;
      if (this.clienteLocal !== undefined) {
        this.isUpdate = true;
        swal({
          title: 'Obteniendo información...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.subscribeInfoCliente = this.operacionesPasivasService.getCliente(this.clienteLocal.idCliente).subscribe(resp => {
          if (resp.header['estatus'] === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
          }
          else {
            if (resp['cliente'] !== undefined) {
              resp['cliente'].fechaNacimiento = {
                'year': parseInt(resp['cliente'].fechaNacimiento.substr(-4, 4)),
                'month': parseInt(resp['cliente'].fechaNacimiento.substr(3, 2)),
                'day': parseInt(resp['cliente'].fechaNacimiento.substr(0, 2))
              }
              if (resp['cliente'].tipoPersona != 3) {
                this.catalogosInformacion['tipoPersona'].pop()
              }
            }
            this.clienteInformacion = resp['cliente'];
            if (this.clienteInformacion.listTelefonoDomicilio === undefined) {
              this.clienteInformacion.listTelefonoDomicilio = ['']
            }
            if (this.clienteInformacion.listTelefonoOficina === undefined) {
              this.clienteInformacion.listTelefonoOficina = ['']
            }
            swal.close();
          }
        }, err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });
      } else {
        this.isUpdate = false;
        this.clienteInformacion = AltaModificacionClienteComponent.initClienteInformacion();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isUpdate) {
      this.subscribeInfoCliente.unsubscribe();
    }
    this.subscribeSelectedCliente.unsubscribe();
  }

  restTelDom(index): void {
    if (this.clienteInformacion.listTelefonoDomicilio.length > 1) {
      this.clienteInformacion.listTelefonoDomicilio.splice(index, 1)
    }
  }

  addTelDom(tel): void {
    this.clienteInformacion.listTelefonoDomicilio.push(tel)
  }

  changeTelDom(index, tel): void {
    this.clienteInformacion.listTelefonoDomicilio[index] = tel;
  }

  restTelOfi(index): void {
    if (this.clienteInformacion.listTelefonoOficina.length > 1) {
      this.clienteInformacion.listTelefonoOficina.splice(index, 1)
    }
  }

  addTelOfi(tel): void {
    this.clienteInformacion.listTelefonoOficina.push(tel)
  }

  changeTelOfi(index, tel): void {
    this.clienteInformacion.listTelefonoOficina[index] = tel;
  }

  changeResidencia(): void {
    if (this.clienteInformacion.residencia == 'MX') {
      this.clienteInformacion.reside = 'S'
    }
    else {
      this.clienteInformacion.reside = 'N'
    }
  }

  isValid(): void {
    if (!this.clienteInformacion.codigoPostalDom.match(this.enteroPattern) && this.clienteInformacion.codigoPostalDom.length > 0) {
      this.valid = false;
    }
    else if (this.clienteInformacion.codigoPostalDom.length > 0 && this.clienteInformacion.codigoPostalDom.length < 5) {
      this.valid = false;
    }
    else {
      this.valid = true;
    }
  }

  actualizarCliente() {
    let json
    let fecha = this.clienteInformacion.fechaNacimiento['year'].toString() + this.clienteInformacion.fechaNacimiento['month'].toString() + this.clienteInformacion.fechaNacimiento['day'].toString()
    let telDom = ''
    let telOfi = ''
    this.clienteInformacion.listTelefonoDomicilio.map((tel, index) => {
      if (index == 0) {
        telDom = tel
      }
      else {
        telDom += '#' + tel
      }
    })
    this.clienteInformacion.listTelefonoOficina.map((tel, index) => {
      if (index == 0) {
        telOfi = tel
      }
      else {
        telOfi += '#' + tel
      }
    })
    json = {
      alta: false,
      idCliente: this.clienteInformacion.idCliente,
      tipoPersona: this.clienteInformacion.tipoPersona,
      nombreCliente: this.clienteInformacion.nombreCliente,
      apellidoPaterno: this.clienteInformacion.apellidoPaterno,
      apellidoMaterno: this.clienteInformacion.apellidoMaterno,
      calleDomicilio: this.clienteInformacion.calleDomicilio,
      coloniaDomicilio: this.clienteInformacion.coloniaDomicilio,
      municipioDomicilio: this.clienteInformacion.municipioDomicilio,
      ciudadDomicilio: this.clienteInformacion.ciudadDomicilio,
      codigoPostalDom: this.clienteInformacion.codigoPostalDom,
      paisDomicilio: this.clienteInformacion.paisDomicilio,
      estadoDomicilio: this.clienteInformacion.estadoDomicilio,
      residencia: this.clienteInformacion.residencia,
      reside: this.clienteInformacion.reside,
      exceptuadoIPAB: this.clienteInformacion.exceptuadoIPAB,
      fideicomiso: this.clienteInformacion.fideicomiso,
      rfc: this.clienteInformacion.rfc,
      curp: this.clienteInformacion.curp,
      telefonoDomicilio: telDom,
      telefonoOficina: telOfi,
      correoElectronico: this.clienteInformacion.correoElectronico,
      fechaNacimiento: fecha,
      estatuscliente: this.clienteInformacion.estatuscliente,
      loadDate: this.clienteInformacion.loadDate,
    }
    this.operacionesPasivasService.updateCliente(json).subscribe(resp => {
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

  private static initClienteInformacion(): IClienteInformacion {
    return {
      idCliente: '',
      tipoPersona: '',
      nombreCliente: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      calleDomicilio: '',
      coloniaDomicilio: '',
      municipioDomicilio: '',
      ciudadDomicilio: '',
      codigoPostalDom: '',
      paisDomicilio: '',
      estadoDomicilio: '',
      residencia: '',
      reside: '',
      exceptuadoIPAB: '',
      fideicomiso: '',
      rfc: '',
      curp: '',
      listTelefonoDomicilio: [''],
      listTelefonoOficina: [''],
      correoElectronico: '',
      fechaNacimiento: '',
      estatuscliente: '',
      loadDate: ''
    };
  }

}