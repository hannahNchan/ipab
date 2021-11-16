import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DatosClienteRoutingModule } from '@modules/datos-cliente/datos-cliente-routing.module';
import { OperacionesActivasComponent } from '@modules/datos-cliente/operaciones-activas/operaciones-activas.component';
import { ParametrosCategoriasHolidaysComponent } from '@modules/datos-cliente/parametros-categorias-holidays/parametros-categorias-holidays.component';
import { AltaEditarCategoriasComponent } from '@modules/datos-cliente/parametros-categorias-holidays/modals/alta-editar-categorias/alta-editar-categorias.component';
import { AltaEditarParametrosComponent } from '@modules/datos-cliente/parametros-categorias-holidays/modals/alta-editar-parametros/alta-editar-parametros.component';
import { AltaEditarHolidayComponent } from '@modules/datos-cliente/parametros-categorias-holidays/modals/alta-editar-holiday/alta-editar-holiday.component';
import { OperacionesPasivasComponent } from '@modules/datos-cliente/operaciones-pasivas/operaciones-pasivas.component';
import { AltaEditarCuentaComponent } from '@modules/datos-cliente/operaciones-pasivas/alta-editar-cuenta/alta-editar-cuenta.component';
import { AltaModificarBloqueoModalComponent } from '@modules/datos-cliente/operaciones-pasivas/modals/alta-modificar-bloqueo/alta-modificar-bloqueo.modal.component';
import { AltaModificarDuplicadoModalComponent } from '@modules/datos-cliente/operaciones-pasivas/modals/alta-modificar-duplicado/alta-modificar-duplicado.modal.component';
import { AltaModificarCierreModalComponent } from '@modules/datos-cliente/operaciones-pasivas/modals/alta-modificar-cierre/alta-modificar-cierre.modal.component';
import { AltaModificarTabla4bModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla4b/alta-modificar-tabla4b.modal.component';
import { AltaModificarTabla2bModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla2b/alta-modificar-tabla2b.modal.component';
import { AltaModificarTabla4aModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla4a/alta-modificar-tabla4a.modal.component';
import { AltaModificarTabla5aModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla5a/alta-modificar-tabla5a.modal.component';
import { AltaModificarTabla1bModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/alta-modificar-tabla1b/alta-modificar-tabla1b.modal.component';
import { CargarFechaReportePasivasModalComponent } from '@modules/datos-cliente/operaciones-pasivas/modals/cargar-fecha-reporte-pasivas/cargar-fecha-reporte-pasivas.modal.component';
import { CargarFechaReporteActivasModalComponent } from '@modules/datos-cliente/operaciones-activas/modals/cargar-fecha-reporte-activas/cargar-fecha-reporte-activas.modal.component';

import { AltaModificarExceptuadosComponent } from './operaciones-pasivas/modals/alta-modificar-exceptuados/alta-modificar-exceptuados.component';
import { AltaModificacionClienteComponent } from './operaciones-pasivas/modals/alta-modificacion-cliente/alta-modificacion-cliente.component';
import { EdicionPatrimonialComponent } from './operaciones-pasivas/modals/edicion-patrimonial/edicion-patrimonial.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    DatosClienteRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OperacionesActivasComponent,
    ParametrosCategoriasHolidaysComponent,
    AltaEditarCategoriasComponent,
    AltaEditarParametrosComponent,
    AltaEditarHolidayComponent,
    OperacionesPasivasComponent,
    AltaModificacionClienteComponent,
    EdicionPatrimonialComponent,
    AltaModificarBloqueoModalComponent,
    AltaModificarDuplicadoModalComponent,
    AltaEditarCuentaComponent,
    AltaModificarCierreModalComponent,
    AltaModificarExceptuadosComponent,
    AltaModificarTabla2bModalComponent,
    AltaModificarTabla4bModalComponent,
    AltaModificarTabla4aModalComponent,
    AltaModificarTabla5aModalComponent,
    AltaModificarTabla1bModalComponent,
    CargarFechaReportePasivasModalComponent,
    CargarFechaReporteActivasModalComponent
  ],
  entryComponents: [
    AltaModificacionClienteComponent,
    EdicionPatrimonialComponent,
    AltaModificarBloqueoModalComponent,
    AltaModificarDuplicadoModalComponent,
    AltaEditarCuentaComponent,
    AltaEditarCategoriasComponent,
    AltaEditarParametrosComponent,
    AltaEditarHolidayComponent,
    AltaModificarCierreModalComponent,
    AltaModificarExceptuadosComponent,
    AltaModificarTabla2bModalComponent,
    AltaModificarTabla4bModalComponent,
    AltaModificarTabla5aModalComponent,
    AltaModificarTabla4aModalComponent,
    AltaModificarTabla1bModalComponent,
    CargarFechaReportePasivasModalComponent,
    CargarFechaReporteActivasModalComponent
  ]
})
export class DatosClienteModule {
}
