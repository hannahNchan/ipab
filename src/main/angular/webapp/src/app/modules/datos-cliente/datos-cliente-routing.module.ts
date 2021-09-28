import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperacionesActivasComponent } from '@modules/datos-cliente/operaciones-activas/operaciones-activas.component';
import { OperacionesPasivasComponent } from '@modules/datos-cliente/operaciones-pasivas/operaciones-pasivas.component';
import { ParametrosCategoriasHolidaysComponent } from '@modules/datos-cliente/parametros-categorias-holidays/parametros-categorias-holidays.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'operaciones-activas', component: OperacionesActivasComponent },
      { path: 'parametros-categorias-holidays', component: ParametrosCategoriasHolidaysComponent },
      { path: 'operaciones-pasivas', component: OperacionesPasivasComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosClienteRoutingModule { }
