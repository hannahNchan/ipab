import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alta-modificar-creditos-vencidos',
  templateUrl: './alta-modificar-creditos-vencidos.component.html',
  styleUrls: ['./alta-modificar-creditos-vencidos.component.scss']
})
export class AltaModificarCreditosVencidosComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
