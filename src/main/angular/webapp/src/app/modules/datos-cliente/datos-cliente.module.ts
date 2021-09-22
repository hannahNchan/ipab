import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DatosClienteRoutingModule } from '@modules/datos-cliente/datos-cliente-routing.module';
import { OperacionesActivasComponent } from '@modules/datos-cliente/operaciones-activas/operaciones-activas.component';
import { OperacionesPasivasComponent } from '@modules/datos-cliente/operaciones-pasivas/operaciones-pasivas.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    DatosClienteRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  declarations: [
    OperacionesActivasComponent,
    OperacionesPasivasComponent,
  ],
  entryComponents: []
})
export class DatosClienteModule {
}
