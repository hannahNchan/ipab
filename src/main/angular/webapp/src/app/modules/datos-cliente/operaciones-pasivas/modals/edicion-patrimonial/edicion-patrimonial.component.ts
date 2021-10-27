import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { IPatrimonial, IPatrimonialInformacion, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { Subscription } from 'rxjs/Subscription';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";

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


  subscribeSelectedPatrimonial: Subscription;
  subscribeInfoPatrimonial: Subscription;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit() {
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
        });
      } else {
        this.isUpdate = false;
        this.patrimonialInformacion = EdicionPatrimonialComponent.initPatrimonialInformacion();
      }
    });
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
      nombre: '',
      apellidoPat: '',
      apellidoMat: '',
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
      plaza: ''
    };
  }

}
