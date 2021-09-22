import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SistemaRoutingModule } from '@modules/sistema/sistema-routing.module';
import { UsuariosComponent } from '@modules/sistema/usuarios/usuarios.component';
import { SeccionesModulosComponent } from '@modules/sistema/secciones-modulos/secciones-modulos.component';
import { PerfilUsuarioComponent } from '@modules/sistema/perfil-usuario/perfil-usuario.component';
import { AltaUsuarioModalComponent } from '@modules/sistema/usuarios/modals/alta-usuarios/alta-usuarios.modal.component';
import { AltaModificarSeccionModalComponent } from '@modules/sistema/secciones-modulos/modals/alta-modificar-seccion/alta-modificar-seccion.modal.component';
import { AltaModificarModuloModalComponent } from '@modules/sistema/secciones-modulos/modals/alta-modificar-modulo/alta-modificar-modulo.modal.component';
import { AgregarEditarPerfilModalComponent } from '@modules/sistema/perfil-usuario/modals/agregar-editar-perfil.modal/agregar-editar-perfil.modal.component';
import { PrivilegiosPerfilModalComponent } from '@modules/sistema/perfil-usuario/modals/privilegios-perfil/privilegios-perfil.modal.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SistemaRoutingModule,
    FontAwesomeModule,
    TreeViewModule,
    FormsModule
  ],
  declarations: [
    UsuariosComponent,
    SeccionesModulosComponent,
    PerfilUsuarioComponent,
    AltaUsuarioModalComponent,
    AltaModificarSeccionModalComponent,
    AltaModificarModuloModalComponent,
    PrivilegiosPerfilModalComponent,
    AgregarEditarPerfilModalComponent
  ],
  entryComponents: [
    AltaUsuarioModalComponent,
    AltaModificarSeccionModalComponent,
    AltaModificarModuloModalComponent,
    PrivilegiosPerfilModalComponent,
    AgregarEditarPerfilModalComponent
  ]
})
export class SistemaModule {
}
