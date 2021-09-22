import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcesoComponent } from '@modules/layout-ipab/proceso/proceso.component';
import { CargarArchivoComponent } from '@modules/layout-ipab/cargar-archivo/cargar-archivo.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'layout-ipab', component: ProcesoComponent },
      { path: 'cargar-archivo', component: CargarArchivoComponent },
      { path: 'logs', component: LogsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutIpabRoutingModule { }
