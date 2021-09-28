import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alta-editar-cuenta',
  templateUrl: './alta-editar-cuenta.component.html',
  styleUrls: ['./alta-editar-cuenta.component.scss']
})
export class AltaEditarCuentaComponent implements OnInit {

  isUpdate: boolean;
  cotitulares: number[];

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.isUpdate = true;
    this.cotitulares = [1];
  }

  agregarCotitular() {
    this.cotitulares.push(1);
  }

  removerCotitular() {
  this.cotitulares.pop();
  }

}
