import { Component, OnInit } from "@angular/core";
import { PopUpMessage } from "@helpers/PopUpMessage";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CargarArchivoService } from "@services/cargar-archivo.service";
import swal from "sweetalert2";

@Component({
  selector: "app-reproceso",
  templateUrl: "./reproceso.component.html",
  styleUrls: ["./reproceso.component.scss"],
})
export class ReprocesoComponent implements OnInit {
  layouts: Object[];
  selectedLayout: string;
  fecha: string;
  files: string[] = [];;
  maxFecha: NgbDateStruct;
  valid: boolean = false;

  constructor(
    private _calendar: NgbCalendar,
    private cargaArchivoService: CargarArchivoService
  ) { }

  ngOnInit(): void {
    this.layouts = [
      {
        clave: "TODOS",
        descripcion: "Todos",
      },
    ];
    swal({
      title: "Cargando información...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
      },
    }).then();
    this.cargaArchivoService
      .getCatalogoTipoArchivoLayout()
      .subscribe((response) => {
        if (response.header["estatus"] === false) {
          swal(PopUpMessage.getAppErrorMessageReportId(response)).then(
            () => {
              console.error(response);
            }
          );
        }
        else {
          this.layouts = this.layouts.concat(response.lista);
          swal.close();
        }
      });
    this.maxFecha = this._calendar.getToday();
  }

  onClickAceptar(): void {
    if (this.fecha === null || this.fecha === undefined || this.fecha === "") {
      swal("Error", "La fecha es obligatoria", "warning").then();
    } else if (
      this.selectedLayout === null ||
      this.selectedLayout === undefined ||
      this.selectedLayout === ""
    ) {
      swal("Error", "El layout es obligatorio", "warning").then();
    } else {
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success btn-lg mx-3',
        cancelButtonClass: 'btn btn-danger btn-lg mx-3',
        buttonsStyling: false
      });
      swalWithBootstrapButtons({
        title: '¿esta seguro de realizar la carga con fecha: ' + this.getFormatFecha() + ' ?',
        text: '¡No podrás deshacer esta acción!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          swal({
            title: "Realizando carga...",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
              swal.showLoading();
            },
          }).then();
          this.cargaArchivoService
            .executeSpLoadData(this.getFormatFecha(), this.selectedLayout)
            .subscribe(
              (response) => {
                if (response.header["estatus"] === false) {
                  swal(PopUpMessage.getAppErrorMessageReportId(response)).then(
                    () => {
                      console.error(response);
                    }
                  );
                } else {
                  swal(
                    PopUpMessage.getSuccesMessage(
                      response,
                      "Carga ejecutada Exitosamente",
                      null
                    )
                  ).then();
                }
              },
              (err) => {
                swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
                  console.error(err);
                });
              }
            );
        }
        else {
          this.limpiar()
        }
      });
    }
  }

  onClickConsultar(): void {
    if (this.fecha === null || this.fecha === undefined || this.fecha === "") {
      swal("Error", "La fecha es obligatoria", "warning").then();
    } else if (
      this.selectedLayout === null ||
      this.selectedLayout === undefined ||
      this.selectedLayout === ""
    ) {
      swal("Error", "El layout es obligatorio", "warning").then();
    } else {
      swal({
        title: "Validando archivos...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        },
      }).then();
      this.cargaArchivoService
        .validaArchivo(this.getFormatFecha(), this.selectedLayout)
        .subscribe(
          (response) => {
            if (response.header["estatus"] === false) {
              swal(PopUpMessage.getAppErrorMessageReportId(response)).then(
                () => {
                  console.error(response);
                }
              );
            } else {
              this.files = response['lista'];
              this.valid = true;
              swal(PopUpMessage.getSuccesMessage(response, null, null)).then();
            }
          },
          (err) => {
            swal(PopUpMessage.getServerErrorMessage(err)).then(() => {
              console.error(err);
            });
          }
        );
    }
  }

  limpiar() {
    this.files = [];
    this.fecha = '';
    this.selectedLayout = ''
    this.valid = false
  }

  limpiarArchivos() {
    this.valid = false
    this.files = [];
  }

  finDeSemana(date: NgbDateStruct) {
    let dateF = date["year"] + "/" + date["month"] + "/" + date["day"]
    let dateC = new Date(dateF)
    return (dateC.getDay() === 6) || (dateC.getDay() === 0);
  }

  getFormatFecha() {
    let day = ''
    let month = ''
    if (parseInt(this.fecha['day']) < 10) day = '0' + this.fecha['day']
    else day = this.fecha['day']

    if (parseInt(this.fecha['month']) < 10) month = '0' + this.fecha['month']
    else month = this.fecha['month']
    return (
      day + "/" + month + "/" + this.fecha["year"]
    );
  }
}
