import { Routes, RouterModule, CanActivate } from '@angular/router';
import {ClinicaListaComponent} from "./clinica-lista/clinica-lista.component";
import {AuthoritiesGuard} from "../../shared/services/authorities.guard";
import {ClinicaFormComponent} from "./clinica-form/clinica-form.component";


export const clinicasRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: ClinicaFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CADASTRAR_CLINICAS']
      },
      {
        path: "editar/:idClinica", component: ClinicaFormComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_EDITAR_CLINICAS']
      },
      {
        path: "detalhe/:idClinica", component: ClinicaFormComponent
      },
      {
        path: "lista", component: ClinicaListaComponent,
        canActivate: [AuthoritiesGuard],
        // data: ['SEG_CONSULTAR_CLINICAS']
      },
      { path: "", redirectTo: '/admin/clinicas/lista', pathMatch: 'full' }
    ]
  }
];
