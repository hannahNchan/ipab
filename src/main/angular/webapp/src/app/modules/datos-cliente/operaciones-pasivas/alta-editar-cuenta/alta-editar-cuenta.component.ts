import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { IClienteCuentas, IClienteCuentasInformacion, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { Subscription } from 'rxjs/Subscription';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-alta-editar-cuenta',
  templateUrl: './alta-editar-cuenta.component.html',
  styleUrls: ['./alta-editar-cuenta.component.scss']
})
export class AltaEditarCuentaComponent implements OnInit, OnDestroy {

  isUpdate: boolean;
  cotitulares: number[];
  clienteCuentaLocal: IClienteCuentas;
  clienteCuentaInformacion: IClienteCuentasInformacion;
  catalogosInformacion: ICatalogoGenerico;


  subscribeSelectedClienteCuenta: Subscription;
  subscribeInfoClienteCuenta: Subscription;


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit(): void {
    this.cotitulares = [1];
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = catalogos
    })
    this.clienteCuentaInformacion = AltaEditarCuentaComponent.initClienteCuentaInformacion();
    this.subscribeSelectedClienteCuenta = this.operacionesPasivasData$.selectedClienteCuenta.subscribe(clienteCuente => {
      this.clienteCuentaLocal = clienteCuente;
      if (this.clienteCuentaLocal !== undefined) {
        this.isUpdate = true;
        swal({
          title: 'Obteniendo información...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.subscribeInfoClienteCuenta = this.operacionesPasivasService.getClienteCuenta(this.clienteCuentaLocal.loadDate, this.clienteCuentaLocal.titular, this.clienteCuentaLocal.idCuenta).subscribe(resp => {
          if (resp['cuenta'] !== undefined) {
            resp['cuenta'].loadDate = {
              'year': parseInt(resp['cuenta'].loadDate.substr(-4, 4)),
              'month': parseInt(resp['cuenta'].loadDate.substr(3, 2)),
              'day': parseInt(resp['cuenta'].loadDate.substr(0, 2))
            }
          }
          this.clienteCuentaInformacion = resp['cuenta'];
          swal.close();
        });
      } else {
        this.isUpdate = false;
        this.clienteCuentaInformacion = AltaEditarCuentaComponent.initClienteCuentaInformacion();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isUpdate) {
      this.subscribeInfoClienteCuenta.unsubscribe();
    }
    this.subscribeSelectedClienteCuenta.unsubscribe();
  }

  private static initClienteCuentaInformacion(): IClienteCuentasInformacion {
    return {
      titular: "",
      idCuenta: "",
      moneda: "",
      categoria: "",
      regimenFiscal: "",
      exentoImpuesto: "",
      cotitular: "",
      porcentajeIPAB: "",
      tipoFirmaCotitular: "",
      loadDate: ""
    };
  }

  agregarCotitular() {
    this.cotitulares.push(1);
  }

  removerCotitular() {
    this.cotitulares.pop();
  }

}
