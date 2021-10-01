import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';
import { IArbol, Iperfil, Ipermiso, IActualizarPermiso } from '@interfaces/perfiles-usuario.interface';
import { PerfilUsuarioService } from '@services/perfil-usuario.service';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { PerfilUsuarioDataService } from '@services/perfil-usuario-data.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-privilegios-perfil',
  templateUrl: './privilegios-perfil.modal.component.html',
  styleUrls: ['./privilegios-perfil.modal.component.scss']
})
export class PrivilegiosPerfilModalComponent implements OnInit {

  perfil: Iperfil;
  arbolInfo: IArbol;
  privilegios: Object[];
  field: Object;
  showCheckBox = true;
  permisos: Ipermiso[];
  auxPermiso: Ipermiso;

  @ViewChild ('treevalidate' , { static : false }) treevalidate: TreeViewComponent;

  private _idPerfilSubscription: Subscription;
  private _idPerfil: number;
  private _idUsuario: number;

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private _data$: PerfilUsuarioDataService,
              private _authService: AuthService,
              private perfilService: PerfilUsuarioService) { }

  ngOnInit(): void {
    this._idUsuario = this._authService.getActiveUser();
    this._idPerfilSubscription = this._data$.selectedIdPerfil
      .subscribe(idPerfil => this._idPerfil = idPerfil);
    this.inicializarPerfil();
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
        this.perfil = res['perfil'];
        this.perfil.idPerfil = this._idPerfil;
        this.perfil.idUsuario = this._idUsuario;
      });
    this.llenarArbol();
    this.permisos = [];
  }

  inicializarPerfil(): void {
    this.perfil = {
      idPerfil: 0,
      codigo: '',
      descripcion: '',
      idUsuario: this._idUsuario
    };
  }

  llenarArbol(): void {
    this.field = undefined;
    this.perfilService.getArbol(this._idPerfil).subscribe(
    res => {
      swal.close();
      this.arbolInfo = res;
      this.privilegios = res['arbol'];
      this.field = { dataSource: this.privilegios, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', isChecked: 'isChecked' };
    });
  }

  onClickGuardar(): void {
    this.permisos = [];
    for (const id of this.treevalidate.checkedNodes) {
      if (id.includes('m')) {
        const aux = id.replace('m', '');
        this.inicializarAuxPermiso();
        this.auxPermiso.idModulo = Number(aux);
        this.permisos.push(this.auxPermiso);
      }
    }
    if (this.permisos.length <= 0) {
      swal('Error', 'Favor de seleccionar algún elemento de la lista de privilegios', 'warning')
        .then();
    } else {
      swal({
        title: 'Actualizando permisos ...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        }
      }).then();
      const actualizarPermisos: IActualizarPermiso = {
        permisos: this.permisos
      };
      this.perfilService.altaUpdatePermiso(actualizarPermisos)
        .subscribe(
          response => {
            if (response.header['estatus'] === false) {
              swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
                console.error(response);
              });
            } else {
              swal(PopUpMessage.getSuccesMessage(response, 'Permisos actualizado exitosamente', null)).then(
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

  inicializarAuxPermiso(): void {
    this.auxPermiso = {
      idPerfil: this._idPerfil,
      idSeccion: null,
      idModulo: 0,
      idUsuario: this._idUsuario
    };
  }

}
