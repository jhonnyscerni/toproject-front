
import { Routes, RouterModule } from '@angular/router';
import { AuthoritiesGuard } from 'src/app/shared/services/authorities.guard';
import { PacienteAtendimentoFormComponent } from './paciente-atendimento-form/paciente-atendimento-form.component';
import { PacienteAtendimentoListaComponent } from './paciente-atendimento-lista/paciente-atendimento-lista.component';

export const profissionalAtendimentosRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "editar/:idAtendimento", component: PacienteAtendimentoFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_EDITAR_CONSULTAS']
      },
      {
        path: "detalhe/:idAtendimento", component: PacienteAtendimentoFormComponent
      },
      {
        path: "lista", component: PacienteAtendimentoListaComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CONSULTAR_CONSULTAS']
      },
      { path: "", redirectTo: '/patient/atendimentos/lista', pathMatch: 'full' }
    ]
  }
];
