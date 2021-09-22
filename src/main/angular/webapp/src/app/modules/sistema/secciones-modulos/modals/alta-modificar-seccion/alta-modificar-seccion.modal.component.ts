import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PopUpMessage } from '@helpers/PopUpMessage';
import swal from 'sweetalert2';

import { SeccionesModulosService } from '@services/secciones-modulos.service';
import { ISeccion } from '@interfaces/seccion-modulo.interface';
import { SeccionesModulosDataService } from '@services/secciones-modulos-data.service';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-alta-modificar-seccion',
  templateUrl: './alta-modificar-seccion.modal.component.html',
  styleUrls: ['./alta-modificar-seccion.modal.component.scss']
})
export class AltaModificarSeccionModalComponent implements OnInit, OnDestroy {
  seccion: ISeccion;
  isUpdate: boolean;

  private _idSeccionSubscription: Subscription;
  private _idSeccion: number;
  private _idUsuario: number;



  constructor(public activeModal: NgbActiveModal, private _data$: SeccionesModulosDataService,
    private service: SeccionesModulosService,
    private modalService: NgbModal,
    private _authService: AuthService,) { }

  ngOnInit(): void {
    this._idUsuario = this._authService.getActiveUser();
    this._idSeccionSubscription = this._data$.selectedIdSeccion
      .subscribe(idSeccion => this._idSeccion = idSeccion);
    this.isUpdate = this._idSeccion !== 0;
    this.incializarSeccion();
    if (this.isUpdate) {
      this.service.getSeccion(this._idSeccion).subscribe(
        res => {
          this.seccion = res['seccion'];
          this.seccion.idSeccion = this._idSeccion;
        });
    }
  }

  ngOnDestroy(): void {
    if (this._idSeccionSubscription) {
      this._idSeccionSubscription.unsubscribe();
    }
  }

  incializarSeccion(): void {
    this.seccion = {
      idSeccion: this._idSeccion,
      descripcion: '',
    };
  }

  onClickAceptar(): void {
    if (this.seccion.descripcion.trim().length === 0) {
      swal('Error', 'Falta el parámetro descripción', 'warning')
        .then();
    } else if (this.isUpdate) {
      swal({
        title: 'Editando seccion ...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.service.editaSeccion({
        idSeccion: this.seccion.idSeccion,
        descripcion: this.seccion.descripcion,
        idUsuario: this._idUsuario
      })
        .subscribe(
          response => {
            if (response.header['estatus'] === false) {
              swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
                console.error(response);
              });
            } else {
              swal(PopUpMessage.getSuccesMessage(response, 'Seccion editada exitosamente', null)).then(
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
        title: 'Creando seccion ...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.service.altaSeccion({
        descripcion: this.seccion.descripcion,
        idUsuario: this._idUsuario
      })
        .subscribe(
          response => {
            if (response.header['estatus'] === false) {
              swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
                console.error(response);
              });
            } else {
              swal(PopUpMessage.getSuccesMessage(response, 'Seccion creada exitosamente', null)).then(
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
