
import { Routes, RouterModule } from '@angular/router';
import { AuthoritiesGuard } from 'src/app/shared/services/authorities.guard';
import { ProfissionalAtendimentoFormComponent } from './profissional-atendimento-form/profissional-atendimento-form.component';
import { ProfissionalAtendimentoListaComponent } from './profissional-atendimento-lista/profissional-atendimento-lista.component';

export const profissionalAtendimentosRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "consulta/:idConsulta/adicionar", component: ProfissionalAtendimentoFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CADASTRAR_CONSULTAS']
      },
      {
        path: "editar/:idAtendimento", component: ProfissionalAtendimentoFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_EDITAR_CONSULTAS']
      },
      {
        path: "detalhe/:idAtendimento", component: ProfissionalAtendimentoFormComponent
      },
      {
        path: "lista", component: ProfissionalAtendimentoListaComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CONSULTAR_CONSULTAS']
      },
      { path: "", redirectTo: '/user/atendimentos/lista', pathMatch: 'full' }
    ]
  }
];