import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PopUpMessage } from '@helpers/PopUpMessage';
import swal from 'sweetalert2';

import { SeccionesModulosService } from '@services/secciones-modulos.service';
import { IModulo } from '@interfaces/seccion-modulo.interface';
import { SeccionesModulosDataService } from '@services/secciones-modulos-data.service';
import { AuthService } from '@services/auth.service';



@Component({
  selector: 'app-alta-modificar-modulo',
  templateUrl: './alta-modificar-modulo.modal.component.html',
  styleUrls: ['./alta-modificar-modulo.modal.component.scss']
})
export class AltaModificarModuloModalComponent implements OnInit, OnDestroy {
  modulo: IModulo;
  isUpdate: boolean;

  private _idModuloSubscription: Subscription;
  private _idSeccionSubscription: Subscription;
  private _idSeccion: number;
  private _idModulo: number;
  private _idUsuario: number;

  constructor(public activeModal: NgbActiveModal, private _data$: SeccionesModulosDataService,
    private service: SeccionesModulosService,
    private modalService: NgbModal,
    private _authService: AuthService,) { }

  ngOnInit(): void {
    this._idUsuario = this._authService.getActiveUser();
    this._idSeccionSubscription = this._data$.selectedIdSeccion
      .subscribe(idSeccion => this._idSeccion = idSeccion);
    this._idModuloSubscription = this._data$.selectedIdModulo
      .subscribe(idModulo => this._idModulo = idModulo);
    this.isUpdate = this._idModulo !== 0;
    this.incializarModulo();
    if (this.isUpdate) {
      this.service.getModulo(this._idModulo).subscribe(
        res => {
          this.modulo = res['modulo'];
          this.modulo.idSeccion = this._idSeccion;
          this.modulo.idModulo = this._idModulo;
        });
    }
  }

  ngOnDestroy(): void {
    if (this._idSeccionSubscription) {
      this._idSeccionSubscription.unsubscribe();
    }
    if (this._idModuloSubscription) {
      this._idModuloSubscription.unsubscribe();
    }
  }

  incializarModulo(): void {
    this.modulo = {
      idModulo: this._idModulo,
      idSeccion: this._idSeccion,
      descripcion: '',
      url: '',
    };
  }

  onClickAceptar(): void {
    if (this.modulo.descripcion.trim().length === 0 || this.modulo.url.trim().length === 0) {
      swal('Error', 'Falta el parámetro descripción y url', 'warning')
        .then();
    } else if (this.isUpdate) {
      swal({
        title: 'Editando modulo ...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.service.editaModulo({
        idSeccion: this.modulo.idSeccion,
        idModulo: this.modulo.idModulo,
        descripcion: this.modulo.descripcion,
        url: this.modulo.url,
        idUsuario: this._idUsuario
      })
        .subscribe(
          response => {
            if (response.header['estatus'] === false) {
              swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
                console.error(response);
              });
            } else {
              swal(PopUpMessage.getSuccesMessage(response, 'Módulo editado exitosamente', null)).then(
                () => this.modalService.dismissAll()
              );
            }
          },
          err => {
            swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
              console.error(err);
            });
          });
    } else {
      swal({
        title: 'Creando modulo ...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.service.altaModulo({
        idSeccion: this.modulo.idSeccion,
        descripcion: this.modulo.descripcion,
        url: this.modulo.url,
        idUsuario: this._idUsuario
      })
        .subscribe(
          response => {
            if (response.header['estatus'] === false) {
              swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
                console.error(response);
              });
            } else {
              swal(PopUpMessage.getSuccesMessage(response, 'Módulo creado exitosamente', null)).then(
                () => this.modalService.dismissAll()
              );
            }
          },
          err => {
            swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
              console.error(err);
            });
          });

    }
  }

}
