import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LayoutIpabRoutingModule } from '@modules/layout-ipab/layout-ipab-routing.module';
import { ProcesoComponent } from '@modules/layout-ipab/proceso/proceso.component';
import { CargarArchivoComponent } from './cargar-archivo/cargar-archivo.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    LayoutIpabRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  declarations: [
    ProcesoComponent,
    CargarArchivoComponent,
    LogsComponent,
  ],
  entryComponents: []
})
export class LayoutIpabModule {
}
