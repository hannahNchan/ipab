import { SweetAlertOptions } from 'sweetalert2';

export class PopUpMessage {

  /**
   * Regresa la configuración de una ventana emergente de
   * mensaje SwalAlert para el caso de que se registre un
   * error controlado en la ejecución de un método en el
   * servidor. Imprime un reporte ID (log del servidor)
   * @param serverResponse Respuesta Http 200
   */
  static getAppErrorMessageReportId(serverResponse: any): SweetAlertOptions {
    return {
      
      html: serverResponse.header.mensajeFuncional + '<br/><br/>' +
        '<small>' +
        '<strong>Reporte ID:</strong> ' +
        serverResponse.header.uid +
        '</small>',
      type: 'warning',
      allowOutsideClick: false
    };
  }

  static getAppErrorMessage(title: string, text: string): SweetAlertOptions {
    return { title, text, type: 'warning', allowOutsideClick: false };
  }

  /**
   * Regresa la configuración de una ventana emergente de
   * mensaje SwalAlert para el caso de que se registre un
   * error no controlado en el servidor.
   * @param error Respuesta Http 500
   */
  static getServerErrorMessage(error: any): SweetAlertOptions {
    console.error(error);
    return {
      title: 'Problemas...',
      html: 'Algo falló con el servidor <br/><br/>' +
        '<small>' +
        '<strong>Código:</strong> ' +
        error.status +
        '</small><br/>' +
        '<small>' +
        '<strong>Causa:</strong> ' +
        error.statusText +
        '</small>',
      type: 'error',
      allowOutsideClick: false
    };
  }

  /**
   * Regresa la configuración de una ventana emergente de
   * mensaje SwalAlert para el caso de que se registre una
   * respuesta exitosa en un método ejecutado en el servidor.
   * @param serverResponse Respuesta Http 200
   * @param title Título de la ventana
   * @param text Mansaje de la ventana
   */
  static getSuccesMessage(serverResponse: any, title: string, text: string): SweetAlertOptions {
    return {
      title: title === null ? 'Operación realizada exitosamente' : title,
      text: text === null ? serverResponse.header.mensajeFuncional : text,
      type: 'success',
      allowOutsideClick: false
    };
  }

  /**
   * Regresa la configuración de una ventana emergente de
   * mensaje SwalAlert para el caso de que falte un parametro.
   * @param parametro nombreParametro
   */
  static getValidateErrorMessage(parametro: string): SweetAlertOptions {
    return {
      title: 'Error',
      text: 'Falta el parámetro ' + parametro,
      type: 'warning',
      allowOutsideClick: false
    };
  }

  static getConfirmCancelOptions(title: string, text: string): SweetAlertOptions {
    return {
      title,
      text,
      cancelButtonAriaLabel: 'Cancelar',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      confirmButtonAriaLabel: 'Aceptar',
      confirmButtonColor: '#1e7e34'
    };
  }

}
