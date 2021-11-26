import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionesPasivasDataService } from '@services/operaciones-pasivas-data.service';
import { IClienteCuentas, IClienteCuentasInformacion, ICatalogoGenerico } from '@interfaces/operaciones-pasivas.interface';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { OperacionesPasivasService } from '@services/operaciones-pasivas.service';
import { PopUpMessage } from '@helpers/PopUpMessage';
import swal from "sweetalert2";

@Component({
  selector: 'app-alta-editar-cuenta',
  templateUrl: './alta-editar-cuenta.component.html',
  styleUrls: ['./alta-editar-cuenta.component.scss']
})
export class AltaEditarCuentaComponent implements OnInit, OnDestroy {

  isUpdate: boolean;
  clienteCuentaLocal: IClienteCuentas;
  clienteCuentaInformacion: IClienteCuentasInformacion;
  catalogosInformacion: ICatalogoGenerico;
  porcentajePattern: string;
  porcentajeTitularTemp: number;
  porcentajeCotitual: number[] = [];
  subscribeSelectedClienteCuenta: Subscription;
  subscribeInfoClienteCuenta: Subscription;
  suma: number;
  valid: boolean = true;
  enteroPattern: string;
  clientes: object[] = [];
  cotitularValido: boolean[] = [];


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private operacionesPasivasData$: OperacionesPasivasDataService, private operacionesPasivasService: OperacionesPasivasService) { }

  ngOnInit(): void {
    this.porcentajePattern = '(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)';
    this.enteroPattern = '^[0-9]+$';
    this.operacionesPasivasData$.catalogos.subscribe(catalogos => {
      this.catalogosInformacion = JSON.parse(JSON.stringify(catalogos));
    })
    this.clienteCuentaInformacion = AltaEditarCuentaComponent.initClienteCuentaInformacion();
    this.subscribeSelectedClienteCuenta = this.operacionesPasivasData$.selectedClienteCuenta.subscribe(clienteCuente => {
      this.clienteCuentaLocal = clienteCuente;
      if (this.clienteCuentaLocal !== undefined) {
        this.isUpdate = true;
        swal({
          title: 'Obteniendo información...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading();
          }
        }).then();
        this.subscribeInfoClienteCuenta = this.operacionesPasivasService.getClienteCuenta(this.clienteCuentaLocal.loadDate, this.clienteCuentaLocal.titular, this.clienteCuentaLocal.idCuenta).subscribe(resp => {
          if (resp.header['estatus'] === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
          }
          else {
            this.clienteCuentaInformacion = resp['cuenta'];
            if (this.clienteCuentaInformacion.listCotitular === undefined) {
              this.clienteCuentaInformacion.listCotitular = ['']
            }
            if (this.clienteCuentaInformacion.listPorcentajeIPAB === undefined) {
              this.clienteCuentaInformacion.listPorcentajeIPAB = ['']
            }
            if (this.clienteCuentaInformacion.listTipoFirma === undefined) {
              this.clienteCuentaInformacion.listTipoFirma = ['']
            }
            if (this.clienteCuentaInformacion.listCotitular.length > this.clienteCuentaInformacion.listPorcentajeIPAB.length) {
              let dif = this.clienteCuentaInformacion.listCotitular.length - this.clienteCuentaInformacion.listPorcentajeIPAB.length
              for (let i = 0; i < dif; i++) {
                this.clienteCuentaInformacion.listPorcentajeIPAB.push('');
              }
            }
            if (this.clienteCuentaInformacion.listCotitular.length > this.clienteCuentaInformacion.listTipoFirma.length) {
              let dif = this.clienteCuentaInformacion.listCotitular.length - this.clienteCuentaInformacion.listTipoFirma.length
              for (let i = 0; i < dif; i++) {
                this.clienteCuentaInformacion.listTipoFirma.push('');
              }
            }
            this.clienteCuentaInformacion.listCotitular.map((row) => {
              this.porcentajeCotitual.push(0)
              this.cotitularValido.push(true);
            })
            swal.close();
          }
        }, err => {
          swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
            console.error(err);
          });
        });
      } else {
        this.isUpdate = false;
        this.porcentajeCotitual.push(0)
        this.cotitularValido.push(true);
        this.clienteCuentaInformacion = AltaEditarCuentaComponent.initClienteCuentaInformacion();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isUpdate) {
      this.subscribeInfoClienteCuenta.unsubscribe();
    }
    this.subscribeSelectedClienteCuenta.unsubscribe();
  }

  isValid(): void {
    this.suma = 0
    let validTemp = true;
    this.porcentajeTitularTemp = parseFloat(this.clienteCuentaInformacion.titularPorcentajeIPAB)
    if (!this.clienteCuentaInformacion.titularPorcentajeIPAB.match(this.porcentajePattern) && this.clienteCuentaInformacion.titularPorcentajeIPAB.length > 0 || this.porcentajeTitularTemp > 100) {
      this.valid = false;
    }
    else if (this.clienteCuentaInformacion.listCotitular.length > 0) {
      this.suma = + this.porcentajeTitularTemp
      this.clienteCuentaInformacion.listCotitular.map((row, index) => {
        this.porcentajeCotitual[index] = (parseFloat(this.clienteCuentaInformacion.listPorcentajeIPAB[index]))
        this.suma += this.porcentajeCotitual[index]
        if (!this.clienteCuentaInformacion.listPorcentajeIPAB[index].match(this.porcentajePattern) && this.clienteCuentaInformacion.listPorcentajeIPAB[index].length > 0 || this.porcentajeCotitual[index] > 100) {
          validTemp = false;
        }
      })
      if (this.suma > 100) {
        validTemp = false;
      }
      if (!validTemp) {
        this.valid = false;
      }
      else {
        this.valid = true;
      }
    }
    else {
      this.valid = true;
    }
  }

  agregarCotitular(coti) {
    this.clienteCuentaInformacion.listCotitular.push(coti);
    this.clienteCuentaInformacion.listPorcentajeIPAB.push(coti);
    this.clienteCuentaInformacion.listTipoFirma.push(coti);
    this.porcentajeCotitual.push(0)
    this.cotitularValido.push(false);
  }

  removerCotitular(index) {
    if (this.clienteCuentaInformacion.listCotitular.length > 1) {
      this.clienteCuentaInformacion.listCotitular.splice(index, 1)
      this.clienteCuentaInformacion.listPorcentajeIPAB.splice(index, 1)
      this.clienteCuentaInformacion.listTipoFirma.splice(index, 1)
      this.porcentajeCotitual.splice(index, 1)
      this.cotitularValido.splice(index, 1)
    }
  }

  changeCotitular(index, coti) {
    this.clienteCuentaInformacion.listCotitular[index] = coti;
  }

  nuevaCuenta() {
    let json
    let today = new Date();
    let fechaT = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()
    let coti = ''
    let firma = ''
    let porcentaje = ''
    this.clienteCuentaInformacion.listCotitular.map((row, index) => {
      if (index == 0) {
        coti = row
      }
      else {
        coti += '#' + row
      }
    })
    this.clienteCuentaInformacion.listTipoFirma.map((row, index) => {
      if (index == 0) {
        firma = row
      }
      else {
        firma += '#' + row
      }
    })
    this.clienteCuentaInformacion.listPorcentajeIPAB.map((row, index) => {
      if (index == 0) {
        porcentaje = row
      }
      else {
        porcentaje += '#' + row
      }
    })
    json = {
      alta: true,
      titular: this.clienteCuentaInformacion.titular,
      idCuenta: this.clienteCuentaInformacion.idCuenta,
      moneda: this.clienteCuentaInformacion.moneda,
      categoria: this.clienteCuentaInformacion.categoria,
      regimenFiscal: this.clienteCuentaInformacion.regimenFiscal,
      exentoImpuesto: this.clienteCuentaInformacion.exentoImpuesto,
      cotitular: coti,
      porcentajeIPAB: porcentaje,
      tipoFirmaCotitular: firma,
      idTitularTipoFirma: this.clienteCuentaInformacion.idTitularTipoFirma,
      titularPorcentajeIPAB: this.clienteCuentaInformacion.titularPorcentajeIPAB,
      loadDate: fechaT,
    }
    this.operacionesPasivasService.newClienteCuenta(json).subscribe(resp => {
      if (resp['header'].estatus === false) {
        swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
      }
      else {
        swal(PopUpMessage.getSuccesMessage(resp, null, null)).then();
      }
    }, err => {
      swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
        console.error(err);
      });
    });
  }


  actualizarCuenta() {
    let json
    let coti = ''
    let firma = ''
    let porcentaje = ''
    this.clienteCuentaInformacion.listCotitular.map((row, index) => {
      if (index == 0) {
        coti = row
      }
      else {
        coti += '#' + row
      }
    })
    this.clienteCuentaInformacion.listTipoFirma.map((row, index) => {
      if (index == 0) {
        firma = row
      }
      else {
        firma += '#' + row
      }
    })
    this.clienteCuentaInformacion.listPorcentajeIPAB.map((row, index) => {
      if (index == 0) {
        porcentaje = row
      }
      else {
        porcentaje += '#' + row
      }
    })
    json = {
      alta: false,
      titular: this.clienteCuentaInformacion.titular,
      idCuenta: this.clienteCuentaInformacion.idCuenta,
      moneda: this.clienteCuentaInformacion.moneda,
      categoria: this.clienteCuentaInformacion.categoria,
      regimenFiscal: this.clienteCuentaInformacion.regimenFiscal,
      exentoImpuesto: this.clienteCuentaInformacion.exentoImpuesto,
      cotitular: coti,
      porcentajeIPAB: porcentaje,
      tipoFirmaCotitular: firma,
      idTitularTipoFirma: this.clienteCuentaInformacion.idTitularTipoFirma,
      titularPorcentajeIPAB: this.clienteCuentaInformacion.titularPorcentajeIPAB,
      loadDate: this.clienteCuentaInformacion.loadDate,
    }
    this.operacionesPasivasService.updateClienteCuenta(json).subscribe(resp => {
      if (resp['header'].estatus === false) {
        swal(PopUpMessage.getAppErrorMessageReportId(resp)).then(() => { });
      }
      else {
        swal(PopUpMessage.getSuccesMessage(resp, null, null)).then();
      }
    }, err => {
      swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
        console.error(err);
      });
    });
  }

  /**
  * Sólo permite la escritura de números y busca clientes
  * @param event Evento desencadenador
  */
  onKeyPressCodigo(event: KeyboardEvent): void {
    const inputChar = event.key;
    if (!inputChar.match(this.enteroPattern) && inputChar !== 'Backspace' && inputChar !== 'ArrowLeft' && inputChar !== 'ArrowRight' && inputChar !== '.') {
      // invalid character, prevent input
      event.stopPropagation();
      event.preventDefault()
    }
  }

  onPaste(event: ClipboardEvent, index) {
    event.stopPropagation();
    event.preventDefault()
  }

  checkClientesLista(index, coti) {
    if (coti.length == 5) {
      this.operacionesPasivasService.checkClientes(coti).subscribe(resp => {
        if (resp['header'].estatus === false) {
        }
        else {
          this.clientes = resp['lista']
        }
      }, err => {
        console.error(err);
      });
    }
    else if (coti.length < 5) {
      this.clientes = []
    }
    else if (coti.length == 10) {
      const ItemIndex = this.clientes.findIndex(
        (p) => p['idCliente'] === coti
      )
      if (ItemIndex == -1) {
        this.cotitularValido[index] = false
      } else {
        this.cotitularValido[index] = true
      }
    }
  }

  /**
   * Filtro para la busqueda de clientes
   * @param text$
   */
  searchClientes = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200), map(txt => txt === '' ? [] :
        this.clientes
          .filter(obj => obj['idCliente'].toLowerCase()
            .indexOf(txt.toLowerCase()) === 0).map(a => a['idCliente'])
      )
    );
  }

  private static initClienteCuentaInformacion(): IClienteCuentasInformacion {
    return {
      titular: "",
      idCuenta: "",
      moneda: "",
      categoria: "",
      regimenFiscal: "",
      exentoImpuesto: "",
      listCotitular: [""],
      listPorcentajeIPAB: [""],
      listTipoFirma: [""],
      idTitularTipoFirma: "",
      titularPorcentajeIPAB: "",
      loadDate: ""
    };
  }

}
