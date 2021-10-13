import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDate } from '@interfaces/date.interface';
import { OperacionesActivasDataService } from '@services/operaciones-activas-data.service';
import { ITabla4B } from '@interfaces/operaciones-activas.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-alta-modificar-tabla4b',
  templateUrl: './alta-modificar-tabla4b.modal.component.html',
  styleUrls: ['./alta-modificar-tabla4b.modal.component.scss']
})
export class AltaModificarTabla4bModalComponent implements OnInit {

  selectedAcreditadoTabla4B: ITabla4B;
  fechaPeriodo: IDate;
  fechaInicio: IDate;
  fechaVencimiento: IDate;

  private selectedTable4BSubscribe: Subscription;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private _data$: OperacionesActivasDataService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.selectedAcreditadoTabla4B = AltaModificarTabla4bModalComponent.initAcreditado();
    this.selectedTable4BSubscribe = this._data$.selectedTable2b
      .subscribe((tabla4b) => this.selectedAcreditadoTabla4B = tabla4b);
  }

  /**
   * Retorna un objeto para solicitudes
   */
  private static initAcreditado(): ITabla4B {
    return {
      claveUnica: '',
      nombreAcreditado: '',
      periodoReporta: '',
      clasificacionContable: '',
      moneda: '',
      capitalVencidoOperativo: 0,
      capitalVigenteOperativo: 0,
      conSinRestriccion: '',
      diasAtraso: '',
      escalaPeriodosFacturacion: '',
      fechaInicio: '',
      fechaVencimiento: '',
      identificadorCredito: '',
      importeGarantia: '',
      importeOriginalCredito: '',
      interesesMoratorios: 0,
      interesesOrdinariosExigibles: 0,
      loadDate: '',
      montoExigible: '',
      otrosAccesorios: 0,
      pagoRealizado: '',
      plazoRemanente: '',
      plazoTotal: '',
      probabilidadIncumplimiento: '',
      reservas: '',
      saldoTotalCredito: '',
      severidadPerdidaCubierta: '',
      severidadPerdidaNoCubierta: '',
      tasaInteres: '',
      tipo: 0,
      tipoCobranza: 0,
      tipoCredito: '',
      tipoGarantia: '',
      tipoTasa: ''
    };
  }

}
