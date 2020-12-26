import { AuthoritiesGuard } from './../../shared/services/authorities.guard';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';


export const usuarioRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: UsuarioFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_USUARIOS']
      },
      {
        path: "editar/:idUsuario", component: UsuarioFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_USUARIOS']
      },
      {
        path: "detalhe/:idUsuario", component: UsuarioFormComponent
      },
      //Falta implementar verificar uma forma de validar isso, pois so ta no back-end a validação
      // {
      //   path: "excluir/:idUsuario", component: UsuarioListaComponent,
      //   canActivate: [AuthoritiesGuard],
      //   data: ['SEG_REMOVER_USUARIOS']
      // },
      {
        path: "lista", component: UsuarioListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_USUARIOS']
      },
      { path: "", redirectTo: '/admin/usuarios/lista', pathMatch: 'full' }
    ]
  }
];
