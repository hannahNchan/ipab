import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DatosClienteRoutingModule } from '@modules/datos-cliente/datos-cliente-routing.module';
import { OperacionesActivasComponent } from '@modules/datos-cliente/operaciones-activas/operaciones-activas.component';
import { OperacionesPasivasComponent } from '@modules/datos-cliente/operaciones-pasivas/operaciones-pasivas.component';
import { AltaModificacionComponent } from './operaciones-pasivas/modals/alta-modificacion/alta-modificacion.component';

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
    AltaModificacionComponent
  ],
  entryComponents: [AltaModificacionComponent]
})
export class DatosClienteModule {
}
