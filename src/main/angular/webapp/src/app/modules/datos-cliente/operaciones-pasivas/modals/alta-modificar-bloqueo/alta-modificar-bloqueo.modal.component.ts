import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { IBloqueo, IBloqueoInformacion, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { Subscription } from 'rxjs/Subscription';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import swal from "sweetalert2";

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

  subscribeSelectedBloqueo: Subscription;
  subscribeInfoBloqueo: Subscription;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit(): void {
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
          this.bloqueoInformacion = resp['bloqueo'];
          swal.close();
        });
      } else {
        this.isUpdate = false;
        this.bloqueoInformacion = AltaModificarBloqueoModalComponent.initBloqueoInformacion();
      }
    });

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
      montoBloqueo: 0,
      tipoBloqueo: 0,
      descBloqueo: '',
      loadDate: ''
    };
  }

}
