import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthoritiesGuard } from 'src/app/shared/services/authorities.guard';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';

export const pacienteRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: PacienteFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_PACIENTES']
      },
      {
        path: "editar/:idUsuario", component: PacienteFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_PACIENTES']
      },
      {
        path: "detalhe/:idUsuario", component: PacienteFormComponent
      },
      {
        path: "lista", component: PacienteListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PACIENTES']
      },
      { path: "", redirectTo: '/user/pacientes/lista', pathMatch: 'full' }
    ]
  }
];
