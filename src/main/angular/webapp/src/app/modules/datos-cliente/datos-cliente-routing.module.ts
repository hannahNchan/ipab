import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperacionesActivasComponent } from '@modules/datos-cliente/operaciones-activas/operaciones-activas.component';
import { OperacionesPasivasComponent } from '@modules/datos-cliente/operaciones-pasivas/operaciones-pasivas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'operaciones-activas', component: OperacionesActivasComponent },
      { path: 'operaciones-pasivas', component: OperacionesPasivasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosClienteRoutingModule { }
