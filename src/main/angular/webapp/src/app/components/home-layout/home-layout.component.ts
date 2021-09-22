import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import swal from 'sweetalert2';

import { PopUpMessage } from "@helpers/PopUpMessage";
import { AuthService } from '@services/auth.service';



@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  opened = false;
  closeOnClickOutside = true;
  dock = false; // true para que aparezca parcialmente del lado izquierdo y salga al pasar el cursor
  animate = true;

  autoFocus = true;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService) { }

  ngOnInit(): void { }

  /**
   * Cambia el valor de opened (menu lateral)
   * @param value
   */
  onToggleOpened(value: boolean): void {
    this.opened = value;
  }

  close(): void {
    this.opened = false;
  }

  onLogout(): void {
    swal(
      PopUpMessage.getConfirmCancelOptions(
        'Cerrar sesión',
        '¿Estás seguro de que deseas terminar la sesión?')).then(
          (isConfirm) => {
            if (!isConfirm.dismiss) {
              swal({
                titleText: 'Cerrando sesión...',
                onOpen: () => {
                  this._authService.logout();
                  this._router.navigate(['/multiva/inicio/login']);
                  swal.showLoading();
                }
              }).then();
              setTimeout(function (): void {
                swal.close();
              }, 2000);
            }
          }
        );
  }
}
