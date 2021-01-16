import { Routes, RouterModule } from '@angular/router';
import { AuthoritiesGuard } from 'src/app/shared/services/authorities.guard';
import { ClinicaConsultaFormComponent } from './clinica-consulta-form/clinica-consulta-form.component';
import { ClinicaConsultaListaComponent } from './clinica-consulta-lista/clinica-consulta-lista.component';

export const profissionalConsultasRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: ClinicaConsultaFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CADASTRAR_CONSULTAS']
      },
      {
        path: "editar/:idConsulta", component: ClinicaConsultaFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_EDITAR_CONSULTAS']
      },
      {
        path: "detalhe/:idConsulta", component: ClinicaConsultaFormComponent
      },
      {
        path: "lista", component: ClinicaConsultaListaComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CONSULTAR_CONSULTAS']
      },
      { path: "", redirectTo: '/clinic/consultas/lista', pathMatch: 'full' }
    ]
  }
];