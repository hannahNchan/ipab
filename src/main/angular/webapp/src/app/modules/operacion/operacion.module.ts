import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragulaModule } from 'ng2-dragula';

import { OperacionRoutingModule } from './operacion-routing.module';
import { TipoCambioComponent } from './tipo-cambio/tipo-cambio.component';

@NgModule({
  declarations: [TipoCambioComponent],
  imports: [
    CommonModule,
    OperacionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    FontAwesomeModule,
    DragulaModule.forRoot()
  ]
})
export class OperacionModule { }
