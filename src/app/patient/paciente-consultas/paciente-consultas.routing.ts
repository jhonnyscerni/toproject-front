import {Routes} from '@angular/router';
import {AuthoritiesGuard} from 'src/app/shared/services/authorities.guard';
import {PacienteConsultaFormComponent} from "./paciente-consulta-form/paciente-consulta-form.component";
import {PacienteConsultaListaComponent} from "./paciente-consulta-lista/paciente-consulta-lista.component";

export const pacienteConsultasRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: PacienteConsultaFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CADASTRAR_CONSULTAS']
      },
      {
        path: "editar/:idConsulta", component: PacienteConsultaFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_EDITAR_CONSULTAS']
      },
      {
        path: "detalhe/:idConsulta", component: PacienteConsultaFormComponent
      },
      {
        path: "lista", component: PacienteConsultaListaComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CONSULTAR_CONSULTAS']
      },
      { path: "", redirectTo: '/patient/consultas/lista', pathMatch: 'full' }
    ]
  }
];
