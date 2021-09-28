import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DatosClienteRoutingModule } from '@modules/datos-cliente/datos-cliente-routing.module';
import { OperacionesActivasComponent } from '@modules/datos-cliente/operaciones-activas/operaciones-activas.component';
import { OperacionesPasivasComponent } from '@modules/datos-cliente/operaciones-pasivas/operaciones-pasivas.component';
import { AltaModificacionComponent } from './operaciones-pasivas/modals/alta-modificacion/alta-modificacion.component';
import { EdicionPatrimonialComponent } from './operaciones-pasivas/modals/edicion-patrimonial/edicion-patrimonial.component';

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
    AltaModificacionComponent,
    EdicionPatrimonialComponent
  ],
  entryComponents: [AltaModificacionComponent, EdicionPatrimonialComponent]
})
export class DatosClienteModule {
}
