import { AuthoritiesGuard } from './../../shared/services/authorities.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';


export const pacientesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "lista", component: PacienteListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PACIENTES']
      },
      { path: "", redirectTo: '/admin/pacientes/lista', pathMatch: 'full' }
    ]
  }
];
