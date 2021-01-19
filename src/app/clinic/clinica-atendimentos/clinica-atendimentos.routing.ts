
import { Routes, RouterModule } from '@angular/router';
import { AuthoritiesGuard } from 'src/app/shared/services/authorities.guard';
import { ClinicaAtendimentoFormComponent } from './clinica-atendimento-form/clinica-atendimento-form.component';
import { ClinicaAtendimentoListaComponent } from './clinica-atendimento-lista/clinica-atendimento-lista.component';

export const clinicaAtendimentosRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "editar/:idAtendimento", component: ClinicaAtendimentoFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_EDITAR_CONSULTAS']
      },
      {
        path: "detalhe/:idAtendimento", component: ClinicaAtendimentoFormComponent
      },
      {
        path: "lista", component: ClinicaAtendimentoListaComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CONSULTAR_CONSULTAS']
      },
      { path: "", redirectTo: '/clinic/atendimentos/lista', pathMatch: 'full' }
    ]
  }
];
