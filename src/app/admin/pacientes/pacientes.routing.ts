import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';
import {PacienteFormComponent} from "./paciente-form/paciente-form.component";
import {AuthoritiesGuard} from "../../shared/services/authorities.guard";


export const pacientesRoutes: Routes = [
  {
    path: "",
    children: [

      {
        path: "adicionar", component: PacienteFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_PACIENTES']
      },
      {
        path: "editar/:idPaciente", component: PacienteFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_PACIENTES']
      },
      {
        path: "detalhe/:idPaciente", component: PacienteFormComponent
      },
      {
        path: "lista", component: PacienteListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PACIENTES']
      },
      { path: "", redirectTo: '/admin/pacientes/lista', pathMatch: 'full' }
    ]
  }
];
