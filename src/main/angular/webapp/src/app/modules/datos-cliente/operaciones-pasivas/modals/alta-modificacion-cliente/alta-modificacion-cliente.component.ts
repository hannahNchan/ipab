import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { ICliente, IClienteInformacion } from '@interfaces/operaciones-pasivas.interface';
import { Subscription } from 'rxjs/Subscription';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-alta-modificacion-cliente',
  templateUrl: './alta-modificacion-cliente.component.html',
  styleUrls: ['./alta-modificacion-cliente.component.scss']
})
export class AltaModificacionClienteComponent implements OnInit, OnDestroy {

  isUpdate: boolean;
  clienteLocal: ICliente;
  clienteInformacion: IClienteInformacion;

  subscribeSelectedCliente: Subscription;
  subscribeInfoCliente: Subscription;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit() {
    this.clienteInformacion = AltaModificacionClienteComponent.initClienteInformacion();
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
          if (resp['cliente'] !== undefined) {
            resp['cliente'].fechaNacimiento = {
              'year': parseInt(resp['cliente'].fechaNacimiento.substr(0, 4)),
              'month': parseInt(resp['cliente'].fechaNacimiento.substr(-4, 2)),
              'day': parseInt(resp['cliente'].fechaNacimiento.substr(-2, 2))
            }
          }
          this.clienteInformacion = resp['cliente'];
          swal.close();
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
      telefonoDomicilio: '',
      telefonoOficina: '',
      correoElectronico: '',
      fechaNacimiento: '',
      estatuscliente: ''
    };
  }

}
