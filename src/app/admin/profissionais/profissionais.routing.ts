import { AuthoritiesGuard } from './../../shared/services/authorities.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ProfissionalListaComponent } from './profissional-lista/profissional-lista.component';
import { ProfissionalFormComponent } from './profissional-form/profissional-form.component';


export const profissionaisRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: ProfissionalFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_PROFISSIONAIS']
      },
      {
        path: "editar/:idProfissional", component: ProfissionalFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_PROFISSIONAIS']
      },
      {
        path: "detalhe/:idProfissional", component: ProfissionalFormComponent
      },
      {
        path: "lista", component: ProfissionalListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PROFISSIONAIS']
      },
      { path: "", redirectTo: '/admin/profissionais/lista', pathMatch: 'full' }
    ]
  }
];
