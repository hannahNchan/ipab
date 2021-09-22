import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';

import { TipoCambioService } from '@services/tipo-cambio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  rutaTipoCambio?: any;
  subData: Subscription;
  @Output() toggleOpened: EventEmitter<boolean>;

  constructor(private _router: Router,
    private service: TipoCambioService) {
    this.toggleOpened = new EventEmitter()
               }

  ngOnInit() {
    this.rutaTipoCambio = '/operacion/tipo-cambio';
  }

  /**
   * Mensaje de espera.
   */
  swalEspere() {
    swal({
      title: 'Espere por favor',
      text: 'Consultando información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 1000,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
  }

   /**
   * Emite el evento que cambia el valor de
   * opened (referente al menu lateral)
   * @private
   */
  _toggleOpened(): void {
    this.toggleOpened.emit(true);
  }

}
