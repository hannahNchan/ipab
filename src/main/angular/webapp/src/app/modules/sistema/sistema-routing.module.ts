import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from '@modules/sistema/usuarios/usuarios.component';
import { SeccionesModulosComponent } from '@modules/sistema/secciones-modulos/secciones-modulos.component';
import { PerfilUsuarioComponent } from '@modules/sistema/perfil-usuario/perfil-usuario.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'secciones-modulos', component: SeccionesModulosComponent },
      { path: 'perfiles', component: PerfilUsuarioComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
