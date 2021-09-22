import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';
import { enableRipple } from '@syncfusion/ej2-base';
import { DrawNodeEventArgs } from '@syncfusion/ej2-angular-navigations';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { Iperfil, IArbol } from '@interfaces/perfiles-usuario.interface';
import { AgregarEditarPerfilModalComponent } from './modals/agregar-editar-perfil.modal/agregar-editar-perfil.modal.component';
import { PrivilegiosPerfilModalComponent } from './modals/privilegios-perfil/privilegios-perfil.modal.component';
import { PerfilUsuarioService } from '@services/perfil-usuario.service';
import { PerfilUsuarioDataService } from '@services/perfil-usuario-data.service';
import { PopUpMessage } from '@helpers/PopUpMessage';
import { AuthService } from '@services/auth.service';

enableRipple(true);

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  perfiles: Iperfil[];
  selectedIdPerfil: number;
  perfilSeleccionado: boolean;
  mostrar: boolean;
  showCheckBox = true;
  privilegios: Object[];
  field: Object;
  arbolInfo: IArbol;

  private _idUsuario: number;

  constructor(private modalService: NgbModal,
              private perfilUsuarioService: PerfilUsuarioService,
              private _authService: AuthService,
              private _perfilUsuarioDataService: PerfilUsuarioDataService) {
  }

  ngOnInit(): void {
    this._idUsuario = this._authService.getActiveUser();
    this.getPerfiles();
    this.perfilSeleccionado = false;
    this.mostrar = false;
    this.privilegios = [];
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

  /**
   * Selecciona id del perfil.
   */
  onSelectedPerfil(perfil: Iperfil): void {
    if (perfil.idPerfil === this.selectedIdPerfil) {
      this.selectedIdPerfil = perfil.idPerfil;
      this._perfilUsuarioDataService.changeSelectedIdPerfil(perfil.idPerfil);
      this.perfilSeleccionado = true;
      return;
    }
    this.selectedIdPerfil = perfil.idPerfil;
    this._perfilUsuarioDataService.changeSelectedIdPerfil(perfil.idPerfil);
    this.perfilSeleccionado = true;
    this.llenarArbol();
  }

  llenarArbol(): void {
    this.field = undefined;
    this.perfilUsuarioService.getArbol(this.selectedIdPerfil).subscribe(
      res => {
        this.arbolInfo = res;
        this.privilegios = res['arbol'];
        this.field = { dataSource: this.privilegios, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', isChecked: 'isChecked' };
        this.mostrar = true;
      });
  }

  drawNode(args: DrawNodeEventArgs): void {
    const ele: HTMLElement = args.node.querySelector('.e-checkbox-wrapper');
    ele.classList.add('e-checkbox-disabled');
  }

  /**
   * Inicia el proceso de validación de baja de un perfil.
   */
  onClickRemoverPerfil(): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success btn-lg mx-3',
      cancelButtonClass: 'btn btn-danger btn-lg mx-3',
      buttonsStyling: false
    });
    swalWithBootstrapButtons({
      title: '¿Desea eliminar el perfil seleccionado?',
      text: '¡No podrás deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.removerPerfil();
      }
    });
  }

  /**
   * Llama al servicio que da de baja un perfil.
   */
  removerPerfil(): void {
    swal({
      title: 'Eliminando perfil...',
      text: 'Espere por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.perfilUsuarioService.removerPerfil({
      idPerfil: this.selectedIdPerfil,
      idUsuario: this._idUsuario
    }).subscribe(res => {
      if (res.header['estatus']) {
        swal(PopUpMessage.getSuccesMessage(res, null , null)).then(() => {
          this.getPerfiles();
        });
      } else {
        swal(PopUpMessage.getAppErrorMessageReportId(res)).then();
      }
    }, err => {
      swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
        console.error(err);
      });
    },
    );
    this.perfilSeleccionado = false;
  }

  /**
   * Abre el modal para la alta de perfil
   */
  openModalAltaPerfil(): void {
    this._perfilUsuarioDataService.changeSelectedIdPerfil(0);
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(AgregarEditarPerfilModalComponent, ngbModalOptions).result.then(
      () => this.getPerfiles(),
      () => this.getPerfiles()
    );
  }

  /**
   * Abre el modal para modificarperfil.
   */
  openModalEditarPerfil(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      windowClass: 'modal-md'
    };
    this.modalService.open(AgregarEditarPerfilModalComponent, ngbModalOptions).result.then(
      () => this.getPerfiles(),
      () => this.getPerfiles()
    );
  }

  /**
   * Abre el modal para modificar privilegios de perfil.
   */
  openModalPrivilegiosPerfil(): void {
    this.modalService.dismissAll();
    const ngbModalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      windowClass: 'modal-md'
    };
    this.modalService.open(PrivilegiosPerfilModalComponent, ngbModalOptions).result.then(
      () => this.llenarArbol(),
      () => this.llenarArbol()
    );
  }
}
