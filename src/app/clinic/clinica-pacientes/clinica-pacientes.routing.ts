import { ClinicaPacienteListaComponent } from './clinica-paciente-lista/clinica-paciente-lista.component';
import { AuthoritiesGuard } from '../../shared/services/authorities.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ClinicaPacienteFormComponent } from './clinica-paciente-form/clinica-paciente-form.component';


export const clinicaPacientesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: ClinicaPacienteFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_PACIENTES']
      },
      {
        path: "editar/:idPaciente", component: ClinicaPacienteFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_PACIENTES']
      },
      {
        path: "detalhe/:idPaciente", component: ClinicaPacienteFormComponent
      },
      {
        path: "lista", component: ClinicaPacienteListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PACIENTES']
      },
      { path: "", redirectTo: '/clinic/pacientes/lista', pathMatch: 'full' }
    ]
  }
];
