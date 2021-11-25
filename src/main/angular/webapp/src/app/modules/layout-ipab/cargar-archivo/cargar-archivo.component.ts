import { Component, OnInit } from "@angular/core";
import { PopUpMessage } from "@helpers/PopUpMessage";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CargarArchivoService } from "@services/cargar-archivo.service";
import { ParametrosCategoriasHolidaysService } from "@services/parametros-categorias-holidays.service";
import swal from "sweetalert2";

@Component({
  selector: "app-cargar-archivo",
  templateUrl: "./cargar-archivo.component.html",
  styleUrls: ["./cargar-archivo.component.scss"],
})
export class CargarArchivoComponent implements OnInit {
  layouts: Object[];
  selectedLayout: string;
  fecha: string;
  files: string[] = [];
  maxFecha: NgbDateStruct;
  valid: boolean = false;
  festivos: Object[];
  year: number;
  wait: boolean = false;

  constructor(
    private _calendar: NgbCalendar,
    private cargaArchivoService: CargarArchivoService,
    private HolidaysService: ParametrosCategoriasHolidaysService
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
          var today = new Date();
          var yearT = today.getFullYear();
          this.HolidaysService.getCatalogoFestivos(yearT.toString()).subscribe((response) => {
            if (response.header["estatus"] === false) {
              swal(PopUpMessage.getAppErrorMessageReportId(response)).then(
                () => {
                  console.error(response);
                }
              );
            } else {
              this.year = yearT
              this.festivos = response.meses
              swal.close();
            }
          })
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
                  this.limpiar()
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

  fechasFestivos = (date: NgbDateStruct) => {
    let dateF = date["year"] + "/" + date["month"] + "/" + date["day"]
    let dateC = new Date(dateF)
    if (date["year"] == this.year) {
      const ItemIndex = this.festivos.findIndex(
        (p) => p['mes'] === date["month"].toString()
      )
      return this.festivos[ItemIndex]['Dias'][date["day"]] === 'H'
    }
    else {
      return (dateC.getDay() === 6) || (dateC.getDay() === 0);
    }

  }

  nuevasFechas(e: Event) {
    if (e['next'].year != this.year) {
      this.HolidaysService.getCatalogoFestivos(e['next'].year.toString()).subscribe((response) => {
        if (response.header["estatus"] === false) {
          swal(PopUpMessage.getAppErrorMessage('Error carga festivos', 'No se pudieron cargar los festivos del año ' + e['next'].year)).then(
            () => {
              console.error(response);
            }
          );
          e.preventDefault()
          this.fecha = '';
        } else {
          this.year = e['next'].year
          this.festivos = response.meses
        }
      })
    }
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
