import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';


@Component({
  selector: 'app-alta-modificar-duplicado',
  templateUrl: './alta-modificar-duplicado.modal.component.html',
  styleUrls: ['./alta-modificar-duplicado.modal.component.scss']
})
export class AltaModificarDuplicadoModalComponent implements OnInit, OnDestroy {
  isUpdate: boolean;
  catalogosInformacion: ICatalogoGenerico;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit(): void {
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = catalogos
    })
  }

  ngOnDestroy(): void { }

}
