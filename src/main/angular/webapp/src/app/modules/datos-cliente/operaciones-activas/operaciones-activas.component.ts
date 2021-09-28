import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ITabla4, ITabla1 } from "@interfaces/operaciones-activas.interface";

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

  constructor() {}

  ngOnInit(): void {
    this.initTabla4();
    this.initTabla1();
    this.tabla4Form = new FormGroup({
      saldoVencidoContable: new FormControl(this.tabla4.saldoVencidoContable, [
        Validators.required,
        Validators.pattern(this.decimalPattern),
      ]),
      capitalVencidoContable: new FormControl(
        this.tabla4.capitalVencidoContable,
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
  get saldoVencidoContable() {
    return this.tabla4Form.get("saldoVencidoContable");
  }
  get capitalVencidoContable() {
    return this.tabla4Form.get("capitalVencidoContable");
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
      saldoVencidoContable: null,
      capitalVencidoContable: null,
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

  ngAfterViewInit() {
    const element = document.querySelectorAll<HTMLElement>(".nav-tabs");
    element[0].style.flexWrap = "nowrap";
  }

  onClickAceptar() {
    // obtener valores del formulario
    console.log(this.saldoVencidoContable.value);
  }
}
