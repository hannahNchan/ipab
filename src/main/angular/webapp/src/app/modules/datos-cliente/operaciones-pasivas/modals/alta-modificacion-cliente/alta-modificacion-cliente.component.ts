import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { ICliente, IClienteInformacion, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { Observable, Subscription } from 'rxjs';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";
import { PopUpMessage } from '@helpers/PopUpMessage';
import { FormControl } from '@angular/forms';
import * as regExValidators from "@helpers/RFCVregex";
import { debounceTime, map } from 'rxjs/operators';

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
  fechaReporte: string;

  subscribeSelectedCliente: Subscription;
  subscribeInfoCliente: Subscription;

  regExValidator = new FormControl();
  decimalPattern: string;
  enteroPattern: string;
  curpRegEx: string;
  rfcRegEx: string;

  colonias: Object[];
  selectedColonia: string = '';
  estado: '';
  cpExist: boolean = false;

  valid: boolean = true;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit() {
    this.colonias = []
    this.decimalPattern = '^[0-9]+[.][0-9][0-9]$';
    this.enteroPattern = '^[0-9]{5}$';
    this.curpRegEx = regExValidators.regExCURP;
    this.clienteInformacion = AltaModificacionClienteComponent.initClienteInformacion();
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = JSON.parse(JSON.stringify(catalogos));
    })
    this.operacionesPasivasData$.fechaReporte.subscribe(fechaReporte => {
      this.fechaReporte = this.getFormatFecha(fechaReporte, 2);
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
        this.subscribeInfoCliente = this.operacionesPasivasService.getCliente(this.clienteLocal.idCliente, this.clienteLocal.loadDate).subscribe(resp => {
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

            // listado teléfonos
            if (this.clienteInformacion.listTelefonoDomicilio === undefined) {
              this.clienteInformacion.listTelefonoDomicilio = ['']
            }
            if (this.clienteInformacion.listTelefonoOficina === undefined) {
              this.clienteInformacion.listTelefonoOficina = ['']
            }
            if (this.clienteInformacion.fideicomiso == '') {
              this.clienteInformacion.fideicomiso = 'null'
            }

            // rfc y curp
            if (this.clienteInformacion.tipoPersona == '1') {
              this.rfcRegEx = regExValidators.regExRFCfisicas;
            }
            else if (this.clienteInformacion.tipoPersona == '2') {
              this.rfcRegEx = regExValidators.regExRFCfisicasAE;
            }
            else {
              this.rfcRegEx = regExValidators.regExRFCmorales;
            }


            // configuarcion cp estado residencia
            if (this.clienteInformacion.residencia == 'MX') {
              let arrayCP = this.catalogosInformacion['listaCodPostal'].filter(
                (p) => p.codigoPostal === this.clienteInformacion.codigoPostalDom
              )
              let coloniaExiste = false
              if (arrayCP.length > 0) {
                this.cpExist = true
                arrayCP.map((cp) => {
                  if (cp.descripcionColonia == this.clienteInformacion.coloniaDomicilio) {
                    this.selectedColonia = cp.colonia.split(' ')[0]
                    this.clienteInformacion.estadoDomicilio = cp.idEstado
                    this.estado = cp.estado
                    this.colonias.push({ id: cp.colonia.split(' ')[0], colonia: cp.colonia.split(' ')[0], descripcion: cp.descripcionColonia })
                    coloniaExiste = true
                  }
                  else {
                    this.colonias.push({ id: cp.colonia.split(' ')[0], colonia: cp.colonia, descripcion: cp.descripcionColonia })
                  }
                })
                if (!coloniaExiste) {
                  this.selectedColonia = '99999'
                  this.clienteInformacion.estadoDomicilio = arrayCP[0].idEstado
                  this.estado = arrayCP[0].estado
                }
              }
            }
            this.isValid('')
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

  changePais(): void {
    this.clienteInformacion.residencia = this.clienteInformacion.paisDomicilio
    if (this.clienteInformacion.paisDomicilio == 'MX') {
      this.clienteInformacion.reside = 'S'
      this.clienteInformacion.estadoDomicilio = ''
      this.estado = ''
      this.clienteInformacion.municipioDomicilio = ''
      this.clienteInformacion.ciudadDomicilio = ''
      this.clienteInformacion.coloniaDomicilio = ''
      this.selectedColonia = ''
      this.clienteInformacion.codigoPostalDom = ''
      this.clienteInformacion.calleDomicilio = ''
    }
    else {
      this.clienteInformacion.reside = 'N'
      this.clienteInformacion.estadoDomicilio = ''
      this.estado = ''
      this.clienteInformacion.municipioDomicilio = ''
      this.clienteInformacion.ciudadDomicilio = ''
      this.clienteInformacion.coloniaDomicilio = ''
      this.selectedColonia = ''
      this.clienteInformacion.codigoPostalDom = ''
      this.clienteInformacion.calleDomicilio = ''
    }
  }

  changeTP(): void {
    if (this.clienteInformacion.tipoPersona == '1') {
      this.rfcRegEx = regExValidators.regExRFCfisicas;
    }
    else if (this.clienteInformacion.tipoPersona == '2') {
      this.rfcRegEx = regExValidators.regExRFCfisicasAE;
    }
    else {
      this.rfcRegEx = regExValidators.regExRFCmorales;
    }
    this.isValid('')
  }

  isValid(type: string): void {
    if (!this.clienteInformacion.codigoPostalDom.match(this.enteroPattern) && this.clienteInformacion.codigoPostalDom.length > 0) {
      this.valid = false;
    }
    else if (this.clienteInformacion.codigoPostalDom.length > 0 && this.clienteInformacion.codigoPostalDom.length < 5) {
      this.valid = false;
    }
    else if (!this.clienteInformacion.rfc.match(this.rfcRegEx) && this.clienteInformacion.rfc.length > 0) {
      this.valid = false;
    }
    else if (!this.clienteInformacion.curp.match(this.curpRegEx) && this.clienteInformacion.curp.length > 0) {
      this.valid = false;
    }
    else {
      this.valid = true;
    }
    if (type == 'cp') {
      this.colonias = []
      if (this.clienteInformacion.residencia == 'MX') {
        let arrayCP = this.catalogosInformacion['listaCodPostal'].filter(
          (p) => p.codigoPostal === this.clienteInformacion.codigoPostalDom
        )
        if (arrayCP.length > 0) {
          this.cpExist = true
          this.clienteInformacion.estadoDomicilio = arrayCP[0].idEstado
          this.estado = arrayCP[0].estado
          this.clienteInformacion.municipioDomicilio = arrayCP[0].municipio
          this.clienteInformacion.ciudadDomicilio = arrayCP[0].ciudad
          this.clienteInformacion.coloniaDomicilio = ''
          this.selectedColonia = ''
          arrayCP.map((cp) => {
            this.colonias.push({ id: cp.colonia.split(' ')[0], colonia: cp.colonia, descripcion: cp.descripcionColonia })
          })
        }
        else {
          this.cpExist = false
          this.valid = false
          this.clienteInformacion.estadoDomicilio = ''
          this.estado = ''
          this.clienteInformacion.municipioDomicilio = ''
          this.clienteInformacion.ciudadDomicilio = ''
          this.clienteInformacion.coloniaDomicilio = ''
          this.selectedColonia = ''
        }
      }
    }
  }

  changeColonia() {
    this.colonias.map((colonia) => {
      if (this.selectedColonia == colonia['id']) {
        colonia['colonia'] = colonia['colonia'].split(' ')[0]
        this.clienteInformacion.coloniaDomicilio = colonia['descripcion']
      }
      else {
        colonia['colonia'] = colonia['id'] + ' ' + colonia['descripcion']
      }
    })
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


  actualizarCliente() {
    swal({
      title: 'Actualizando información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    let json
    let fecha = this.getFormatFecha(this.clienteInformacion.fechaNacimiento, 2)
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
      loadDate: this.fechaReporte,
    }
    this.operacionesPasivasService.updateCliente(json).subscribe(resp => {
      if (resp['header'].estatus === false) {
        swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
      }
      else {
        swal(PopUpMessage.getSuccesMessage(resp, null, null)).then(() => {
          this.modalService.dismissAll()
        });
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