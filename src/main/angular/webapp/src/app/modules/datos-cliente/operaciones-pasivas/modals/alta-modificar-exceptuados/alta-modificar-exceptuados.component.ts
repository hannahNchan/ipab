import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { IExceptuados, IExceptuadosInformacion, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { Subscription } from 'rxjs/Subscription';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";
import { PopUpMessage } from '@helpers/PopUpMessage';


@Component({
  selector: 'app-alta-modificar-exceptuados',
  templateUrl: './alta-modificar-exceptuados.component.html',
  styleUrls: ['./alta-modificar-exceptuados.component.scss']
})
export class AltaModificarExceptuadosComponent implements OnInit, OnDestroy {

  isUpdate: boolean;
  exceptuadoLocal: IExceptuados;
  exceptuadoInformacion: IExceptuadosInformacion;
  catalogosInformacion: ICatalogoGenerico;


  subscribeSelectedExceptuado: Subscription;
  subscribeInfoExceptuado: Subscription;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit() {
    this.exceptuadoInformacion = AltaModificarExceptuadosComponent.initExceptuadosInformacion();
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = catalogos
    })
    this.subscribeSelectedExceptuado = this.operacionesPasivasData$.selectedExceptuado.subscribe(exceptuado => {
      this.exceptuadoLocal = exceptuado;
      if (this.exceptuadoLocal !== undefined) {
        this.isUpdate = true;
        swal({
          title: 'Obteniendo información...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.subscribeInfoExceptuado = this.operacionesPasivasService.getExceptuado(this.exceptuadoLocal.loadDate, this.exceptuadoLocal.numeroCliente).subscribe(resp => {
          if (resp.header['estatus'] === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
          }
          else {
            this.exceptuadoInformacion = resp['exceptuados'];
            swal.close();
          }
        }, err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });
      } else {
        this.isUpdate = false;
        this.exceptuadoInformacion = AltaModificarExceptuadosComponent.initExceptuadosInformacion();
      }
    });
  }

  changeCausal() {
    const ItemIndex = this.catalogosInformacion['causalRevision'].findIndex(
      (p) => p.clave === this.exceptuadoInformacion.causalRevision
    )
    this.exceptuadoInformacion.descripcion = this.catalogosInformacion['causalRevision'][ItemIndex].descripcion
    this.exceptuadoInformacion.fraccion = this.catalogosInformacion['causalRevision'][ItemIndex].descripcion1
  }

  changeConcepto() {
    const ItemIndex = this.catalogosInformacion['conceptoExclusion'].findIndex(
      (p) => p.clave === this.exceptuadoInformacion.concepto
    )
    this.exceptuadoInformacion.exclusion = this.catalogosInformacion['conceptoExclusion'][ItemIndex].descripcion
  }

  actualizarExceptuados() {
    let json
    json = {
      alta: false,
      loadDate: this.exceptuadoInformacion.loadDate,
      institucion: this.exceptuadoInformacion.institucion,
      numeroCliente: this.exceptuadoInformacion.numeroCliente,
      numeroCliente2: this.exceptuadoInformacion.numeroCliente2,
      personalidad: this.exceptuadoInformacion.personalidad,
      numeroCliente3: this.exceptuadoInformacion.numeroCliente3,
      numeroCuenta: this.exceptuadoInformacion.numeroCuenta,
      numeroInversion: this.exceptuadoInformacion.numeroInversion,
      nombreRazonSocial: this.exceptuadoInformacion.nombreRazonSocial,
      apellidoPaterno: this.exceptuadoInformacion.apellidoPaterno,
      apellidoMaterno: this.exceptuadoInformacion.apellidoMaterno,
      causalRevision: this.exceptuadoInformacion.causalRevision,
      descripcion: this.exceptuadoInformacion.descripcion,
      fraccion: this.exceptuadoInformacion.fraccion,
      concepto: this.exceptuadoInformacion.concepto,
      exclusion: this.exceptuadoInformacion.exclusion,
    }
    this.operacionesPasivasService.updateExceptuado(json).subscribe(resp => {
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

  crearExceptuados() {
    let json
    let today = new Date();
    let fechaT = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()
    json = {
      alta: true,
      loadDate: fechaT,
      institucion: this.exceptuadoInformacion.institucion,
      numeroCliente: this.exceptuadoInformacion.numeroCliente,
      numeroCliente2: this.exceptuadoInformacion.numeroCliente2,
      personalidad: this.exceptuadoInformacion.personalidad,
      numeroCliente3: this.exceptuadoInformacion.numeroCliente3,
      numeroCuenta: this.exceptuadoInformacion.numeroCuenta,
      numeroInversion: this.exceptuadoInformacion.numeroInversion,
      nombreRazonSocial: this.exceptuadoInformacion.nombreRazonSocial,
      apellidoPaterno: this.exceptuadoInformacion.apellidoPaterno,
      apellidoMaterno: this.exceptuadoInformacion.apellidoMaterno,
      causalRevision: this.exceptuadoInformacion.causalRevision,
      descripcion: this.exceptuadoInformacion.descripcion,
      fraccion: this.exceptuadoInformacion.fraccion,
      concepto: this.exceptuadoInformacion.concepto,
      exclusion: this.exceptuadoInformacion.exclusion,
    }
    this.operacionesPasivasService.newExceptuado(json).subscribe(resp => {
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

  ngOnDestroy(): void {
    if (this.isUpdate) {
      this.subscribeInfoExceptuado.unsubscribe();
    }
    this.subscribeSelectedExceptuado.unsubscribe();
  }

  private static initExceptuadosInformacion(): IExceptuadosInformacion {
    return {
      loadDate: '',
      institucion: '',
      numeroCliente: '',
      numeroCliente2: '',
      personalidad: '',
      numeroCliente3: '',
      numeroCuenta: '',
      numeroInversion: '',
      nombreRazonSocial: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      causalRevision: '',
      descripcion: '',
      fraccion: '',
      concepto: '',
      exclusion: ''
    };
  }

}
