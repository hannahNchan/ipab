import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageManagerService } from '@services/local-storage-manager.service';

import { NgForm } from '@angular/forms';

import { IAuthUsuario } from '@interfaces/inicio.interface';
import { AuthService } from '@services/auth.service';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authUsuario: IAuthUsuario;
  constructor(
    private _router: Router,
    private _localStorage: LocalStorageManagerService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this._localStorage.getData('token') && this._localStorage.getData('idUsuario') && this._localStorage.getData('modulos')) {
      this._router.navigate(['/']);
    }
    this.authUsuario = {
      usuario: '',
      password: ''
    };
  }

  /**
   * Realiza el llamado al servicio de autenticación.
   * @param forma Contiene los valores ingresados
   * por el usuario.
   */
  onClickEntrar(forma: NgForm): void {
    if (forma.invalid) {
      Object.values( forma.controls ).forEach( control => control.markAsTouched());
      return;
    }
    swal({
      title: 'Iniciando sesión...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this._authService.login(this.authUsuario).subscribe(
      response => {
        if (!response.header['estatus']) {
          swal(PopUpMessage.getAppErrorMessage('Error', response.header['mensajeFuncional'])).then(() => {
            setTimeout(() => {
              this.authUsuario.password = '';
            }, 500);
            console.error(response);
          });
        } else {
          setTimeout(() => {
            swal.close( () => {
              this._router.navigate(['/']);
            });
          }, 500);
        }
      },
      err => {
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      }
    );

  }

}
