import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from '@components/not-found/not-found.component';
import { AuthLayoutComponent } from '@components/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from '@components/home-layout/home-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { ModGuard } from './guards/mod.guard';



const routes: Routes = [
  {
    path: 'multiva',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule)
      }
    ]
  },
  {
    path: '',
    //component: HomeLayoutComponent,
    //canActivate: [AuthGuard],
    //canActivateChild: [ModGuard],
    children: [
      {
        path: 'operacion',
        loadChildren: () => import('./modules/operacion/operacion.module').then(m => m.OperacionModule)
      },
      {
        path: 'sistema',
        loadChildren: () => import('./modules/sistema/sistema.module').then(m => m.SistemaModule)
      },
      {
        path: 'proceso',
        loadChildren: () => import('./modules/layout-ipab/layout-ipab.module').then(m => m.LayoutIpabModule)
      },
      {
        path: 'datos',
        loadChildren: () => import('./modules/datos-cliente/datos-cliente.module').then(m => m.DatosClienteModule)
      }
    ]
  },
  // {
  //   path: '',
  //   component: TipoCambioComponent,
  //   canActivate: [ AuthGuard ],
  //   children: [
  //     {
  //       path: 'operacion',
  //       loadChildren: () => import('./modules/operacion/operacion.module').then(m => m.OperacionModule)
  //     },
  //   ]
  // },
  // {
  //   path: 'sistema',
  //   component: UsuariosComponent,
  //   canActivate: [ AuthGuard ],
  //   children: [
  //     {
  //       path: 'usuarios',
  //       loadChildren: () => import('./modules/sistema/sistema.module').then(m => m.SistemaModule)
  //     },
  //   ]
  // },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
