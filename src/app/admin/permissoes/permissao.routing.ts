import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PermissaoFormComponent } from './permissao-form/permissao-form.component';
import { PermissaoListaComponent } from './permissao-lista/permissao-lista.component';
import { AuthoritiesGuard } from 'src/app/shared/services/authorities.guard';


export const permissaoRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: PermissaoFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_PERMISSOES']
      },
      {
        path: "editar/:idPermissao", component: PermissaoFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_PERMISSOES']
      },
      {
        path: "detalhe/:idPermissao", component: PermissaoFormComponent
      },
      //Falta implementar verificar uma forma de validar isso, pois so ta no back-end a validação
      // {
      //   path: "excluir/:idUsuario", component: UsuarioListaComponent,
      //   canActivate: [AuthoritiesGuard],
      //   data: ['SEG_REMOVER_USUARIOS']
      // },
      {
        path: "lista", component: PermissaoListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PERMISSOES']
      },
      { path: "", redirectTo: '/admin/permissoes/lista', pathMatch: 'full' }
    ]
  }
];
