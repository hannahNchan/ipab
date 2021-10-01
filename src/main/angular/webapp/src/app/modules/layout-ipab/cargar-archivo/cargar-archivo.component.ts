import { Component, OnInit } from "@angular/core";
import { PopUpMessage } from "@helpers/PopUpMessage";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CargarArchivoService } from "@services/cargar-archivo.service";
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
  maxFecha: NgbDateStruct;

  constructor(
    private _calendar: NgbCalendar,
    private cargaArchivoService: CargarArchivoService
  ) {}

  ngOnInit(): void {
    this.layouts = [
      {
        idCatalogo: "TODOS",
        descripcionCatalogo: "Todos",
      },
    ];
    this.cargaArchivoService
      .getCatalogoTipoArchivoLayout()
      .subscribe((response) => {
        this.layouts = this.layouts.concat(response.lista);
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
  }

  getFormatFecha() {
    return (
      this.fecha["day"] + "/" + this.fecha["month"] + "/" + this.fecha["year"]
    );
  }
}
