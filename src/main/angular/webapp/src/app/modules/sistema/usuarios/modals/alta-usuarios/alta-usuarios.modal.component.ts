import { Component, OnInit } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilUsuarioService } from '@services/perfil-usuario.service';
import { IperfilUsuario, IUsuarioAlta } from '@interfaces/usuarios.interface';
import { Subscription } from 'rxjs';
import { UsuarioDataService } from '@services/usuario-data.service';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';
import { UsuarioService } from '@services/usuario.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.modal.component.html',
  styleUrls: ['./alta-usuarios.modal.component.scss']
})
export class AltaUsuarioModalComponent implements OnInit {

  isUpdate: boolean;
  perfiles: IperfilUsuario[];
  usuarioAlta: IUsuarioAlta;
  usuarioActivo: boolean;

  private _idUserAlta: number;
  private _idUser: number;
  private _idUsuarioSubscription: Subscription;

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private usuarioService: UsuarioService,
              private perfilUsuarioService: PerfilUsuarioService,
              private _authService: AuthService,
              private _data$: UsuarioDataService) { }

  ngOnInit(): void {
    this._idUserAlta = this._authService.getActiveUser();
    this.getPerfiles();
    this._idUsuarioSubscription = this._data$.selectedIdUsuario
        .subscribe(idUsuario => this._idUser = idUsuario);
    this.isUpdate = this._idUser !== 0;
    this.initializeUser();
    if (this.isUpdate) {
      swal({
        title: 'Cargando datos...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      this.usuarioService.getUser(this._idUser).subscribe(
          res => {
            this.usuarioAlta.usuario.idUsuario = this._idUser;
            this.usuarioAlta.usuario.nombre1 = res['usuario']['nombre1'];
            this.usuarioAlta.usuario.nombre2 = res['usuario']['nombre2'];
            this.usuarioAlta.usuario.apellidoPat = res['usuario']['apellidoPat'];
            this.usuarioAlta.usuario.apellidoMat = res['usuario']['apellidoMat'];
            this.usuarioAlta.usuario.usuario = res['usuario']['usuario'];
            this.usuarioAlta.usuario.activo = res['usuario']['activo'];
            this.usuarioActivo = res['usuario']['activo'] === 'S';
            const self = this;
            res['usuarioPerfiles'].forEach(function (userPerfil: Object): void {
              self.perfiles.forEach(function (item: IperfilUsuario): void {
                if (item.idPerfil === userPerfil['idPerfil']) {
                  item.selected = true;
                }
              });
            });
            swal.close();
          }
      );
    }
  }

  initializeUser(): void {
    this.usuarioActivo = true;
    this.usuarioAlta = {
      usuario: {
        idUsuario: 0,
        nombre1: '',
        nombre2: '',
        apellidoPat: '',
        apellidoMat: '',
        usuario: '',
        activo: 'S',
        idUsuarioAlta: this._idUserAlta
      },
      usuarioPerfiles: []
    };
  }

  /**
   * Obtiene los perfiles.
   */
  getPerfiles(): void {
    this.perfilUsuarioService.getPerfiles().subscribe(
      res => {
        this.perfiles = res['perfiles'];
      });
  }

  onClickSaveGuardar(): void {
    if (this.usuarioAlta.usuario.nombre1 === undefined || this.usuarioAlta.usuario.nombre1.trim().length === 0) {
      swal('Error', 'Falta el parámetro nombre', 'warning')
          .then();
    } else if ( this.usuarioAlta.usuario.apellidoPat === undefined || this.usuarioAlta.usuario.apellidoPat.trim().length === 0) {
      swal('Error', 'Falta el parámetro apellido paterno', 'warning')
          .then();
    } else if (this.usuarioAlta.usuario.usuario === undefined || this.usuarioAlta.usuario.usuario.trim().length === 0) {
      swal('Error', 'Falta el parámetro usuario', 'warning')
          .then();
    } else {
      const self = this;
      this.usuarioAlta.usuarioPerfiles = [];
      this.perfiles.forEach(function (item: IperfilUsuario): void {
        if (item.selected) {
          self.usuarioAlta.usuarioPerfiles.push(
            {
              idUsuario: self.usuarioAlta.usuario.idUsuario,
              idPerfil: item.idPerfil,
              estatus: 'A'
            }
          );
        }
      });
      this.usuarioAlta.usuario.activo = (this.usuarioActivo) ? 'S' : 'N';
      if (!this.isUpdate) {
        swal({
          title: 'Creando usuario ...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.usuarioService.altaUsuario(this.usuarioAlta)
            .subscribe(
                response => {
                  if (response.header['estatus'] === false) {
                    swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
                      console.error(response);
                    });
                  } else {
                    swal(PopUpMessage.getSuccesMessage(response, 'Usuario creado exitosamente', null)).then(
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
          title: 'Actualizando usuario ...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.usuarioService.updateUsuario(this.usuarioAlta)
            .subscribe(
                response => {
                  if (response.header['estatus'] === false) {
                    swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
                      console.error(response);
                    });
                  } else {
                    swal(PopUpMessage.getSuccesMessage(response, 'Usuario actualizado exitosamente', null)).then(
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
}
