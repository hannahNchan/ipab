import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomDatepickerI18n, I18n, NgbDateFRParserFormatter } from '@components/shared/calendar.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBook, faCalendarAlt, faCheck, faEdit, faListAlt, faMinus,
  faPlus, faSearch, faSpinner, faTimes, faTrash, faUser, faUsers,
  faFolder, faFolderOpen, faStepBackward, faStepForward, faCaretLeft,
  faCaretRight, faPrint, faCalendar, faLandmark, faMapMarkedAlt, faCheckCircle,
  faSignOutAlt, faInfoCircle, faUpload, faDownload, faDotCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCarouselModule, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { NgIdleModule } from '@ng-idle/core';

import { AuthLayoutComponent } from '@components/auth-layout/auth-layout.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { HomeLayoutComponent } from '@components/home-layout/home-layout.component';
import { MenuRecursivoComponent } from '@components/menu-recursivo/menu-recursivo.component';
import { OperacionModule } from '@modules/operacion/operacion.module';
import { InicioModule } from '@modules/inicio/inicio.module';
import { SistemaModule } from '@modules/sistema/sistema.module';
import { LayoutIpabModule } from '@modules/layout-ipab/layout-ipab.module';
import { DatosClienteModule } from '@modules/datos-cliente/datos-cliente.module';
import { AuthInterceptorService } from '@services/auth-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    NavbarComponent,
    HomeLayoutComponent,
    MenuRecursivoComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    OperacionModule,
    InicioModule,
    SistemaModule,
    LayoutIpabModule,
    DatosClienteModule,
    FontAwesomeModule,
    SidebarModule,
    CommonModule,
    NgbCarouselModule,
    NgIdleModule.forRoot()
  ],
  // MODAL COMPONENTS
  // entryComponents: [
  //  ModificarParametroModalComponent
  // ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
    I18n,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faSearch, faEdit, faPlus, faMinus, faCalendarAlt, faCheck, faTimes, faListAlt,
      faSpinner, faUsers, faTrash, faBook, faUser, faFolder, faFolderOpen, faCaretLeft, faCaretRight,
      faStepBackward, faStepForward, faPrint, faCalendar, faLandmark, faMapMarkedAlt, faCheckCircle,
      faSignOutAlt, faInfoCircle, faUpload, faDownload, faDotCircle)
  }
}
