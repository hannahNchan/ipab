import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alta-modificacion',
  templateUrl: './alta-modificacion.component.html',
  styleUrls: ['./alta-modificacion.component.scss']
})
export class AltaModificacionComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
