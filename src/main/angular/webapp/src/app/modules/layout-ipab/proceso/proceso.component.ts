import { Component, OnInit } from "@angular/core";
import { PopUpMessage } from "@helpers/PopUpMessage";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { LayoutService } from "@services/layout.service";
import swal from "sweetalert2";

@Component({
  selector: "app-proceso",
  templateUrl: "./proceso.component.html",
  styleUrls: ["./proceso.component.scss"],
})
export class ProcesoComponent implements OnInit {
  fechaProceso: string;
  maxFecha: NgbDateStruct;

  constructor(
    private _calendar: NgbCalendar,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.maxFecha = this._calendar.getToday();
  }

  onClickAceptar(): void {
    if (this.fechaProceso === null || this.fechaProceso === undefined || this.fechaProceso === '') {
      swal("Error", "La fecha de proceso es obligatoria", "warning").then();
    } else {
      swal({
        title: "Extrayendo Layout...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
        },
      }).then();
      this.layoutService.executeSpLayout(this.getFormatFecha()).subscribe(
        (response) => {
          if (response.header["estatus"] === false) {
            swal(PopUpMessage.getAppErrorMessageReportId(response)).then(() => {
              console.error(response);
            });
          } else {
            swal(
              PopUpMessage.getSuccesMessage(
                response,
                "Extracción de layout Exitosa",
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
    return this.fechaProceso['day'] + '/' + this.fechaProceso['month'] +'/' + this.fechaProceso['year']
  }
}
