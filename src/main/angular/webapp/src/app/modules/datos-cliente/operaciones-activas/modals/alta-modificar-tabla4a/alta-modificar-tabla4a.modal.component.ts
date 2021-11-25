import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITabla4 } from '@interfaces/operaciones-activas.interface';
import {NgbActiveModal, NgbCalendar, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { OperacionesActivasDataService } from '@services/operaciones-activas-data.service';
import { ICatalogoGenerico } from '@interfaces/catalogos.interface';
import { Subscription } from 'rxjs/Subscription';
import swal from "sweetalert2";
import {PopUpMessage} from "@helpers/PopUpMessage";
import {OperacionesActivasService} from "@services/operaciones-activas.service";
import {IDate} from "@interfaces/date.interface";

@Component({
  selector: 'app-alta-modificar-tabla4a',
  templateUrl: './alta-modificar-tabla4a.modal.component.html',
  styleUrls: ['./alta-modificar-tabla4a.modal.component.scss']
})
export class AltaModificarTabla4aModalComponent implements OnInit, OnDestroy {

  decimalPattern: string;
  decimal6Pattern: string;

  catalogoMonedaLinea: ICatalogoGenerico[];
  catalogoSegmento: ICatalogoGenerico[];
  catalogoTipoCobranza: ICatalogoGenerico[];
  localTabla4A: ITabla4;
  nuevaTabla4A: ITabla4;
  today: IDate;
  capitalVencidoSplit: string[];
  capitalVigenteSplit: string[];
  interesesMoratoriosSplit: string[];
  interesesOrdinariosExigiblesSplit: string[];
  otrosAccesoriosSplit: string[];

  selectedMonedaLineaTabla4A: string;
  selectedSegmentoTabla4A: string;
  selectedTipoCobranzaTabla4A: string;

  subscriptionCatMonedaLinea: Subscription;
  subscriptionCatSegmento: Subscription;
  subscriptionCatTipoCobranza: Subscription;
  subscriptionSelectedTabla4A: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private _data$: OperacionesActivasDataService,
              private operacionesActivasService: OperacionesActivasService,
              private _calendar: NgbCalendar) { }

  ngOnInit() {
    this.decimalPattern = '^\\d{1,3}([,]\\d{3})*[.][0-9][0-9]$';
    this.decimal6Pattern = '^\\d{1,3}([,]\\d{3})*[.]\\d{2,6}$';
    this.subscriptionSelectedTabla4A = this._data$.selectedTable4a.subscribe(tabla4 => {
      this.localTabla4A = tabla4;
      this.selectedMonedaLineaTabla4A = this.localTabla4A.moneda.toString();
      this.selectedSegmentoTabla4A = this.localTabla4A.segmento.toString();
      this.selectedTipoCobranzaTabla4A = this.localTabla4A.tipoCobranza.toString();
    });
    this.subscriptionCatMonedaLinea = this._data$.catalogoMonedaLinea.subscribe(catalogo => {
      this.catalogoMonedaLinea = catalogo;
    });
    this.subscriptionCatSegmento = this._data$.catalogoSegmento.subscribe(catalogo => {
      this.catalogoSegmento = catalogo;
    });
    this.subscriptionCatTipoCobranza = this._data$.catalogoTipoCobranza.subscribe(catalogo => {
      this.catalogoTipoCobranza = catalogo;
    });
  }

  ngOnDestroy() {
    this.subscriptionSelectedTabla4A.unsubscribe();
    this.subscriptionCatMonedaLinea.unsubscribe();
    this.subscriptionCatSegmento.unsubscribe();
    this.subscriptionCatTipoCobranza.unsubscribe();
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onClickAceptar() {
    this.capitalVencidoSplit = this.localTabla4A.capitalVencido.toString().split(',');
    this.localTabla4A.capitalVencido = '';
    this.capitalVencidoSplit.forEach(cantidad => {
      this.localTabla4A.capitalVencido += cantidad;
    });
    this.capitalVigenteSplit = this.localTabla4A.capitalVigente.toString().split(',');
    this.localTabla4A.capitalVigente = '';
    this.capitalVigenteSplit.forEach(cantidad => {
      this.localTabla4A.capitalVigente += cantidad;
    });
    this.interesesMoratoriosSplit = this.localTabla4A.interesesMoratorios.toString().split(',');
    this.localTabla4A.interesesMoratorios = '';
    this.interesesMoratoriosSplit.forEach(interes => {
      this.localTabla4A.interesesMoratorios += interes;
    });
    this.interesesOrdinariosExigiblesSplit = this.localTabla4A.interesesOrdinariosExigibles.toString().split(',');
    this.localTabla4A.interesesOrdinariosExigibles = '';
    this.interesesOrdinariosExigiblesSplit.forEach(interes => {
      this.localTabla4A.interesesOrdinariosExigibles += interes;
    });
    this.otrosAccesoriosSplit = this.localTabla4A.otrosAccesorios.toString().split(',');
    this.localTabla4A.otrosAccesorios = '';
    this.otrosAccesoriosSplit.forEach(accesorios => {
      this.localTabla4A.otrosAccesorios += accesorios;
    });
    this.nuevaTabla4A = this.localTabla4A;
    this.nuevaTabla4A.moneda = parseInt(this.selectedMonedaLineaTabla4A);
    this.nuevaTabla4A.tipoCobranza = parseInt(this.selectedTipoCobranzaTabla4A);
    this.nuevaTabla4A.segmento = parseInt(this.selectedSegmentoTabla4A);
    swal({
      title: 'Obteniendo información...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      }
    }).then();
    this.operacionesActivasService.updateTabla4A(this.nuevaTabla4A).subscribe(
      response => {
        if (response.header['estatus'] === false) {
          this.localTabla4A.interesesMoratorios = this.numberWithCommas(this.localTabla4A.interesesMoratorios);
          this.localTabla4A.interesesOrdinariosExigibles = this.numberWithCommas(this.localTabla4A.interesesOrdinariosExigibles);
          this.localTabla4A.capitalVencido = this.numberWithCommas(this.localTabla4A.capitalVencido);
          this.localTabla4A.capitalVigente = this.numberWithCommas(this.localTabla4A.capitalVigente);
          this.localTabla4A.otrosAccesorios = this.numberWithCommas(this.localTabla4A.otrosAccesorios);
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => { });
        } else {
          swal(PopUpMessage.getSuccesMessage(response, 'Actualización exitosa.', null)).then(() => {
            this.activeModal.close('close');
          });
        }
      },
      err => {
        this.localTabla4A.interesesMoratorios = this.numberWithCommas(this.localTabla4A.interesesMoratorios);
        this.localTabla4A.interesesOrdinariosExigibles = this.numberWithCommas(this.localTabla4A.interesesOrdinariosExigibles);
        this.localTabla4A.capitalVencido = this.numberWithCommas(this.localTabla4A.capitalVencido);
        this.localTabla4A.capitalVigente = this.numberWithCommas(this.localTabla4A.capitalVigente);
        this.localTabla4A.otrosAccesorios = this.numberWithCommas(this.localTabla4A.otrosAccesorios);
        swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
          console.error(err);
        });
      });
  }
}
