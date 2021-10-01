import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iperfil } from '@interfaces/perfiles-usuario.interface';
import { PerfilUsuarioService } from '@services/perfil-usuario.service';
import { PerfilUsuarioDataService } from '@services/perfil-usuario-data.service';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-agregar-editar-perfil',
  templateUrl: './agregar-editar-perfil.modal.component.html',
  styleUrls: ['./agregar-editar-perfil.modal.component.scss']
})
export class AgregarEditarPerfilModalComponent implements OnInit {

  perfil: Iperfil;
  isUpdate: boolean;

  private _idPerfilSubscription: Subscription;
  private _idPerfil: number;
  private _idUsuario: number;

  constructor( private modalService: NgbModal,
               public activeModal: NgbActiveModal,
               private _data$: PerfilUsuarioDataService,
               private _authService: AuthService,
               private perfilService: PerfilUsuarioService) { }

  ngOnInit(): void {
    this._idUsuario = this._authService.getActiveUser();
    this._idPerfilSubscription = this._data$.selectedIdPerfil
      .subscribe(idPerfil => this._idPerfil = idPerfil);
    this.isUpdate = this._idPerfil !== 0;
    this.inicializarPerfil();
    if (this.isUpdate) {
      swal({
        title: 'Cargando datos...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.perfilService.getPerfil(this._idPerfil).subscribe(
        res => {
          this.perfil.codigo = res['perfil']['codigo'];
          this.perfil.descripcion = res['perfil']['descripcion'],
          this.perfil.idPerfil = this._idPerfil;
          this.perfil.idUsuario = this._idUsuario;
          swal.close();
        });
    }
  }

  inicializarPerfil(): void {
    this.perfil = {
      idPerfil: 0,
      codigo: '',
      descripcion: '',
      idUsuario: this._idUsuario,
    };
  }

    onClickGuardar(): void {
    if (this.perfil.codigo.trim().length === 0 || this.perfil.descripcion.trim().length === 0) {
      swal('Error', 'Falta el parámetro código y nombre', 'warning')
        .then();
    } else if (this.perfil.codigo.length !== 5) {
      swal('Error', 'La codigo debe tener 5 caractéres', 'warning')
        .then();
    } else if (this.perfil.descripcion.length > 35) {
      swal('Error', 'El nombre debe ser menor a 35 caractéres', 'warning')
        .then();
    } else if (this.isUpdate) {
      this.perfil.codigo = this.perfil.codigo.toUpperCase();
      swal({
        title: 'Actualizando perfil ...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.perfilService.updatePerfil(this.perfil)
          .subscribe(
            response => {
              if (response.header['estatus'] === false) {
                swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
                  console.error(response);
                });
              } else {
                swal(PopUpMessage.getSuccesMessage(response, 'Perfil actualizado exitosamente', null)).then(
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
      this.perfil.codigo = this.perfil.codigo.toUpperCase();
      swal({
        title: 'Creando perfil ...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.perfilService.altaPerfil(this.perfil)
          .subscribe(
            response => {
              if (response.header['estatus'] === false) {
                swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
                  console.error(response);
                });
              } else {
                swal(PopUpMessage.getSuccesMessage(response, 'Perfil creado exitosamente', null)).then(
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


    /**
   * Sólo permite la escritura de números
   * @param event Evento desencadenador
   */
  onKeyPressCodigo(event: KeyboardEvent): void {
    const pattern = /[A-Za-z]/;
    const inputChar = event.key;

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  /**
   * Sólo permite la escritura de números
   * @param event Evento desencadenador
   */
  onKeyPressNombre(event: KeyboardEvent): void {
    const pattern = /[A-Za-z _]/;
    const inputChar = event.key;

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
