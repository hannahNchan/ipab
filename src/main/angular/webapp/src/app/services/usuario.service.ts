import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iperfil } from '@interfaces/perfiles-usuario.interface';
import { IUsuarioAlta } from '@interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  host: string;

  constructor(private http: HttpClient) {
    this.host = `${window.location.protocol}//${window.location.host}`;
    this.host.toString();
  }

  /**
   * Obtiene los usuarios.
   * @param name
   * @param lastName
   */
  getUsers(name: String, lastName: String): Observable<any> {
    return this.http.get(`/IPABESB/rest/usuario/listaUsuarios?nombre=${name}&apellidoPat=${lastName}`);
  }

  /**
   * Servicio para alta de usuario
   * @param usuario
   */
  altaUsuario(usuario: IUsuarioAlta): Observable<any> {
    return this.http.post<Iperfil>('/IPABESB/rest/usuario/Usuario', usuario);
  }

  /**
   * Obtiene los perfil.
   * @param idUsuario
   */
  getUser(idUsuario: number): Observable<any> {
    return this.http.get(`/IPABESB/rest/usuario/datosUsuario?idUsuario=${idUsuario}`);
  }

  /**
   * Servicio para alta de usuario
   * @param usuario
   */
  updateUsuario(usuario: IUsuarioAlta): Observable<any> {
    return this.http.put<Iperfil>('/IPABESB/rest/usuario/modificaUsuario', usuario);
  }

  /**
   * realiza la baja de un usuario.
   * @param usuario Objeto Perfil a eliminar.
   */
  removerUsuario(usuario: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {
      headers: headers,
      body: usuario
    };
    return this.http.delete('/IPABESB/rest/usuario/bajaUsuario', options);
  }

}
