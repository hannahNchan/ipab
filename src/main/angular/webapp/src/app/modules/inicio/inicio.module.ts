import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InicioRoutingModule } from '@modules/inicio/inicio-routing.module';
import { LoginComponent } from '@modules/inicio/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    InicioRoutingModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
  ],
  entryComponents: []
})
export class InicioModule {
}
