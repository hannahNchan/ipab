import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioService } from '@services/usuario.service';
import { IUsuario } from '@interfaces/usuarios.interface';
import { UsuarioDataService } from '@services/usuario-data.service';

import { AltaUsuarioModalComponent } from './modals/alta-usuarios/alta-usuarios.modal.component';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {

  usuarios: IUsuario[];
  nombre: String;
  apellidoPat: String;
  selectedIdUsuario: number;
  selectedUser: boolean;

  private _idUsuario: number;

  constructor(private modalService: NgbModal,
              private usuarioService: UsuarioService,
              private _usuarioDataService: UsuarioDataService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._idUsuario = this._authService.getActiveUser();
    this.nombre = '';
    this.apellidoPat = '';
    this.selectedUser = false;
    this.getUsuarios();
  }

  /**
   * Obtiene los perfiles.
   */
  getUsuarios(): void {
    this.usuarioService.getUsers(this.nombre, this.apellidoPat).subscribe(
      res => {
        this.selectedIdUsuario = 0;
        this._usuarioDataService.changeSelectedIdUsuario(0);
        this.selectedUser = false;
        this.usuarios = res['usuarios'];
      });
  }

  /**
   * Selecciona id del perfil.
   */
  onSelectedUsuario(usuario: IUsuario): void {
    this.selectedIdUsuario = usuario.idUsuario;
    this._usuarioDataService.changeSelectedIdUsuario(usuario.idUsuario);
    this.selectedUser = true;
  }

  /**
   * Inicia el proceso de validación de baja de un perfil.
   */
  onClickRemoverUsuario(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success btn-lg mx-3',
      cancelButtonClass: 'btn btn-danger btn-lg mx-3',
      buttonsStyling: false
    });
    swalWithBootstrapButtons({
      title: '¿Desea eliminar el usuario seleccionado?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.removerUsuario();
      }
    });
  }

  /**
   * Llama al servicio que da de baja un perfil.
   */
  removerUsuario(): void {
    swal({
      title: 'Eliminando usuario...',
      text: 'Espere por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.usuarioService.removerUsuario({
      idUsuario: this.selectedIdUsuario,
      idUsuarioAlta: this._idUsuario
    }).subscribe(res => {
      if (res.header['estatus']) {
        swal(PopUpMessage.getSuccesMessage(res, null , null)).then(() => {
          this.getUsuarios();
        });
      } else {
        swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
      }
    }, err => {
      swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
        console.error(err);
      });
    }
    );
    this.selectedUser = false;
  }

  /**
   * Abre el modal para la alta de usuario
   */
  openModalAltaUsuario(): void {
    this._usuarioDataService.changeSelectedIdUsuario(0);
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AltaUsuarioModalComponent, ngbModalOptions).result.then(
      () => this.getUsuarios(),
      () => this.getUsuarios()
    );
  }

  /**
   * Abre el modal para modificarperfil.
   */
  openModalEditarUsuario(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      windowClass: 'modal-md'
    };
    this.modalService.open(AltaUsuarioModalComponent, ngbModalOptions).result.then(
      () => this.getUsuarios(),
      () => this.getUsuarios()
    );
  }

}
