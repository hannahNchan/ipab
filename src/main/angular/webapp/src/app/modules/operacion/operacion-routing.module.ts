import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoCambioComponent } from '@modules/operacion/tipo-cambio/tipo-cambio.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'tipo-cambio', component: TipoCambioComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionRoutingModule { }
