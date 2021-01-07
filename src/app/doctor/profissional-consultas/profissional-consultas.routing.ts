import { ProfissionalConsultaListaComponent } from './profissional-consulta-lista/profissional-consulta-lista.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthoritiesGuard } from 'src/app/shared/services/authorities.guard';
import { ProfissionalConsultaFormComponent } from './profissional-consulta-form/profissional-consulta-form.component';

export const profissionalConsultasRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: ProfissionalConsultaFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CADASTRAR_CONSULTAS']
      },
      {
        path: "editar/:idConsulta", component: ProfissionalConsultaFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_EDITAR_CONSULTAS']
      },
      {
        path: "detalhe/:idConsulta", component: ProfissionalConsultaFormComponent
      },
      {
        path: "lista", component: ProfissionalConsultaListaComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CONSULTAR_CONSULTAS']
      },
      { path: "", redirectTo: '/user/consultas/lista', pathMatch: 'full' }
    ]
  }
];