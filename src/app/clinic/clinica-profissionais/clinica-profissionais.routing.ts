import { AuthoritiesGuard } from '../../shared/services/authorities.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ClinicaProfissionalListaComponent } from './clinica-profissional-lista/clinica-profissional-lista.component';
import { ClinicaProfissionalFormComponent } from './clinica-profissional-form/clinica-profissional-form.component';


export const clinicaprofissionaisRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: ClinicaProfissionalFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_PROFISSIONAIS']
      },
      {
        path: "editar/:idProfissional", component: ClinicaProfissionalFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_PROFISSIONAIS']
      },
      {
        path: "detalhe/:idProfissional", component: ClinicaProfissionalFormComponent
      },
      {
        path: "lista", component: ClinicaProfissionalListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PROFISSIONAIS']
      },
      { path: "", redirectTo: '/clinic/profissionais/lista', pathMatch: 'full' }
    ]
  }
];
