import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ITabla4, ITabla1 } from "@interfaces/operaciones-activas.interface";
import { OperacionesActivasService } from '@services/operaciones-activas.service';
import swal from 'sweetalert2';
import { PopUpMessage } from '@helpers/PopUpMessage';



@Component({
  selector: "app-operaciones-activas",
  templateUrl: "./operaciones-activas.component.html",
  styleUrls: ["./operaciones-activas.component.scss"],
})
export class OperacionesActivasComponent implements OnInit, AfterViewInit {
  tabla4Form: FormGroup;
  tabla1Form: FormGroup;
  tabla4: ITabla4;
  tabla1: ITabla1;
  decimalPattern: string = "^[0-9]+[.][0-9][0-9]$";
  enteroPattern: string = "^[0-9]+$";
  fecha: string;
  credito: string = '';
  fechaCreditoNoRevolvente: string;
  clienteCreditoNoRevolvente: string;
  creditoCreditoNoRevolvente: string;
  fechaCreditoAsociado: any;
  creditoAsociado: string = "";
  fillCreditos: { key: number, value: number }[] = [];

  constructor(private operacionesActivasService: OperacionesActivasService) { }

  ngOnInit(): void {
    this.clienteCreditoNoRevolvente = '';
    this.creditoCreditoNoRevolvente = '';
    this.initTabla4();
    this.initTabla1();
    this.tabla4Form = new FormGroup({
      numeroCredito: new FormControl(this.tabla4.numeroCredito, [
        Validators.required,
      ]),
      capitalVigente: new FormControl(this.tabla4.capitalVigente, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      capitalVencido: new FormControl(
        this.tabla4.capitalVencido,
        [Validators.required, Validators.pattern(this.decimalPattern)]
      ),
      interesOrdinarioExigible: new FormControl(
        this.tabla4.interesOrdinarioExigible,
        [Validators.required, Validators.pattern(this.decimalPattern)]
      ),
      interesMoratorio: new FormControl(this.tabla4.interesMoratorio, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      otrosAccesorios: new FormControl(this.tabla4.otrosAccesorios, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
    });
    this.tabla1Form = new FormGroup({
      montoOriginalCredito: new FormControl(this.tabla1.montoOriginalCredito, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      valorVivienda: new FormControl(this.tabla1.valorVivienda, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      tasaInteresAplicadoPeriodo: new FormControl(this.tabla1.tasaInteresAplicadoPeriodo, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      responsabilidadTotalperiodo: new FormControl(this.tabla1.responsabilidadTotalperiodo, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      probabilidadIncumplimiento: new FormControl(this.tabla1.probabilidadIncumplimiento, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      severidadPerdida: new FormControl(this.tabla1.severidadPerdida, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      montoSubcuentaVivienda: new FormControl(this.tabla1.montoSubcuentaVivienda, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      reservas: new FormControl(this.tabla1.reservas, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      capitalVencidoOperativo: new FormControl(this.tabla1.capitalVencidoOperativo, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      interesesOrdinarios: new FormControl(this.tabla1.interesesOrdinarios, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      interesesMoratorios: new FormControl(this.tabla1.interesesMoratorios, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      otrosAccesorios: new FormControl(this.tabla1.otrosAccesorios, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      capitalVigenteOperativo: new FormControl(this.tabla1.capitalVigenteOperativo, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      diasAtraso: new FormControl(this.tabla1.diasAtraso, [
        Validators.required,
        Validators.pattern(this.enteroPattern),
      ]),
    });
  }
  get numeroCredito() {
    return this.tabla4Form.get("numeroCredito");
  }
  get capitalVigente() {
    return this.tabla4Form.get("capitalVigente");
  }
  get capitalVencido() {
    return this.tabla4Form.get("capitalVencido");
  }
  get interesOrdinarioExigible() {
    return this.tabla4Form.get("interesOrdinarioExigible");
  }
  get interesMoratorio() {
    return this.tabla4Form.get("interesMoratorio");
  }
  get otrosAccesorios() {
    return this.tabla4Form.get("otrosAccesorios");
  }

  get montoOriginalCredito() {
    return this.tabla1Form.get("montoOriginalCredito");
  }
  get valorVivienda() {
    return this.tabla1Form.get("valorVivienda");
  }
  get tasaInteresAplicadoPeriodo() {
    return this.tabla1Form.get("tasaInteresAplicadoPeriodo");
  }
  get responsabilidadTotalperiodo() {
    return this.tabla1Form.get("responsabilidadTotalperiodo");
  }
  get probabilidadIncumplimiento() {
    return this.tabla1Form.get("probabilidadIncumplimiento");
  }
  get severidadPerdida() {
    return this.tabla1Form.get("severidadPerdida");
  }
  get montoSubcuentaVivienda() {
    return this.tabla1Form.get("montoSubcuentaVivienda");
  }
  get reservas() {
    return this.tabla1Form.get("reservas");
  }
  get capitalVencidoOperativo() {
    return this.tabla1Form.get("capitalVencidoOperativo");
  }
  get interesesOrdinarios() {
    return this.tabla1Form.get("interesesOrdinarios");
  }
  get interesesMoratorios() {
    return this.tabla1Form.get("interesesMoratorios");
  }
  get capitalVigenteOperativo() {
    return this.tabla1Form.get("capitalVigenteOperativo");
  }
  get otrosAccesorios2() {
    return this.tabla1Form.get("otrosAccesorios");
  }
  get diasAtraso() {
    return this.tabla1Form.get("diasAtraso");
  }

  initTabla4() {
    this.tabla4 = {
      numeroCredito: "",
      moneda1: "",
      segmento: "",
      tipoCobranza: "",
      capitalVigente: null,
      capitalVencido: null,
      interesOrdinarioExigible: null,
      interesMoratorio: null,
      otrosAccesorios: null,
    };
  }

  initTabla1() {
    this.tabla1 = {
      montoOriginalCredito: null,
      valorVivienda: null,
      tasaInteresAplicadoPeriodo: null,
      responsabilidadTotalperiodo: null,
      probabilidadIncumplimiento: null,
      severidadPerdida: null,
      montoSubcuentaVivienda: null,
      reservas: null,
      capitalVencidoOperativo: null,
      interesesOrdinarios: null,
      interesesMoratorios: null,
      otrosAccesorios: null,
      capitalVigenteOperativo: null,
      diasAtraso: null,
    };
  }

  onKeydown(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  getTabla4B() {
    let tempFecha;
    if (this.validaGuardar()) {
      let month;
      let day;
      if (this.fechaCreditoNoRevolvente !== undefined && this.fecha !== '') {
        if (this.fechaCreditoNoRevolvente['month'] < 10) {
          month = '0' + this.fechaCreditoNoRevolvente['month'].toString();
        } else month = this.fechaCreditoNoRevolvente['month'].toString();
        if (this.fechaCreditoNoRevolvente['day'] < 10) {
          day = '0' + this.fechaCreditoNoRevolvente['day'].toString();
        } else day = this.fechaCreditoNoRevolvente['day'].toString();
        tempFecha = day + month + this.fechaCreditoNoRevolvente['year'].toString();
        swal({
          title: 'Obteniendo información...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.operacionesActivasService.getTabla4B(tempFecha, this.clienteCreditoNoRevolvente, this.creditoCreditoNoRevolvente).subscribe(
          response => {
            if (response.header['estatus'] === false) {
              swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {});

            } else {
              swal(PopUpMessage.getSuccesMessage(response, null , null)).then();
            }
          },
          err => {
            swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
              console.error(err);
            });
          });
      } else {
        swal('Ingrese una fecha.', '', 'warning');
      }
    }
  }

  getCreditoTabla4() {
    let month = ''
    if (this.fecha != undefined && this.fecha != '') {
      if (this.fecha['month'] < 10) {
        month = '0' + this.fecha['month'].toString()
      }
      else month = this.fecha['month'].toString()
      let tempFecha = this.fecha['year'].toString() + month + this.fecha['day'].toString()

      this.operacionesActivasService.getTabla4(tempFecha, this.credito).subscribe(res => {
        if (res.header.estatus) {
          if (res.tabla4 != undefined) {
            this.tabla4Form.patchValue({
              numeroCredito: res.tabla4.numeroCredito,
              capitalVigente: res.tabla4.capitalVigente.toFixed(2),
              capitalVencido: res.tabla4.capitalVencido.toFixed(2),
              interesOrdinarioExigible: res.tabla4.interesesOrdinariosExigibles.toFixed(2),
              interesMoratorio: res.tabla4.interesesMoratorios.toFixed(2),
              otrosAccesorios: res.tabla4.otrosAccesorios.toFixed(2),
            });
          }
          else {
            swal(PopUpMessage.getAppErrorMessage('Sin resultado', 'La busqueda retorno 0 coincidencias'))
              .then();
          }
        }
        else {
          swal(PopUpMessage.getAppErrorMessageReportId(res))
            .then();
        }
      })
    }
    else {
      swal(PopUpMessage.getValidateErrorMessage('Fecha'))
        .then();
    }

  }

  onSearchCredit() {
    const { year, month, day } = this.fechaCreditoAsociado;
    const dateParsed = `${year}-${month}-${day}`;
    if (this.creditoAsociado.length >= 3) {
      this.operacionesActivasService.getCreditosCliente(dateParsed, this.creditoAsociado).subscribe(res => {
        if (res.header.estatus) {
          const { header, lista, tipo } = res;
            lista.map(item => {
              this.fillCreditos.push({ key: item.numeroCredito, value: item.numeroCredito })
            });
        }
      });
    }
  }

  ngAfterViewInit() {
    const element = document.querySelectorAll<HTMLElement>(".nav-tabs");
    element[0].style.flexWrap = "nowrap";
  }

  onClickAceptar() {
    // obtener valores del formulario
    console.log(this.capitalVigente.value);
  }

  /**
   * Sólo permite la escritura de números
   * @param event Evento desencadenador
   */
  onKeyPressCodigo(event: KeyboardEvent): void {
    const pattern = /[0-9\b]/;
    const inputChar = event.key;

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  /**
   * Valida los datos antes de guardar la información
   */
  validaGuardar(): boolean {
    if (this.clienteCreditoNoRevolvente === null || this.clienteCreditoNoRevolvente.trim().length === 0) {
      swal('Ingrese el cliente.', '', 'warning');
      return false;
    }
    return true;
  }
}
