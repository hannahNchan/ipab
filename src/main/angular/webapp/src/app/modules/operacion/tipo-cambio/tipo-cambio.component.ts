import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';

import { TipoCambioService } from '@services/tipo-cambio.service.ts';

@Component({
  selector: 'app-tipo-cambio',
  templateUrl: './tipo-cambio.component.html',
  styleUrls: ['./tipo-cambio.component.scss']
})
export class TipoCambioComponent implements OnInit {

  respuestaHola: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private service: TipoCambioService) { }

  ngOnInit() {
    this.respuestaHola = '';
  }

  endpointHola(): void {
    swal({
      title: 'Consultando hola mundo...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.service.getHolaMundo()
        .subscribe(
          response => {
            this.respuestaHola = response.header['mensajeFuncional'];
            swal(PopUpMessage.getSuccesMessage(response, 'Consulta realizada exitosamente.', null));
          },
          err => {
            swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
              console.error(err);
            });
          });
  }
}
