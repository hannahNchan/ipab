import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu, ISeccion } from '@interfaces/inicio.interface'
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-menu-recursivo',
  templateUrl: './menu-recursivo.component.html',
  styleUrls: ['./menu-recursivo.component.scss']
})
export class MenuRecursivoComponent implements OnInit {

  selectedModulo: number;
  selectedMenu: boolean;
  modulos: IMenu[] = [];
  secciones: ISeccion[];
  constructor(private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this.selectedMenu = false;
    this.selectedModulo = 0;
    this._authService.getPerfilUsuario(this._authService.getActiveUser()).subscribe(
      res => {
        this.secciones = res.perfilUsuario.secciones;
        this.secciones.forEach(seccion => {
          const subMenus: IMenu[] = [];
          seccion.modulos.forEach(modulo => {
            const submenu = {
              id: modulo.idModulo,
              title: modulo.descripcion,
              url: modulo.url,
              selected: true
            };
            subMenus.unshift(submenu);
          });
          const menu = {
            id: seccion.idSeccion,
            title: seccion.descripcion,
            selected: true,
            menu: subMenus
          };
          this.modulos.unshift(menu);
        });
      });

  }

  onSelected(menu: IMenu): void {
    menu.selected = !menu.selected;
  }

  onSelectScreen(menu: IMenu): void {
    this.selectedModulo = menu.id;
    this._router.navigate([menu.url]);
  }

}
