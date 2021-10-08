import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alta-modificar-exceptuados',
  templateUrl: './alta-modificar-exceptuados.component.html',
  styleUrls: ['./alta-modificar-exceptuados.component.scss']
})
export class AltaModificarExceptuadosComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
