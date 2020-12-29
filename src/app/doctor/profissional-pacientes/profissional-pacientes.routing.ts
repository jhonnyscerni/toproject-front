import { AuthoritiesGuard } from './../../shared/services/authorities.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ProfissionalPacienteListaComponent } from './profissional-paciente-lista/profissional-paciente-lista.component';
import { ProfissionalPacienteFormComponent } from './profissional-paciente-form/profissional-paciente-form.component';


export const profissionalPacientesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: ProfissionalPacienteFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_PACIENTES']
      },
      {
        path: "editar/:idPaciente", component: ProfissionalPacienteFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_PACIENTES']
      },
      {
        path: "detalhe/:idPaciente", component: ProfissionalPacienteFormComponent
      },
      {
        path: "lista", component: ProfissionalPacienteListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PACIENTES']
      },
      { path: "", redirectTo: '/user/pacientes/lista', pathMatch: 'full' }
    ]
  }
];
