import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {Page404Component} from "../authentication/page404/page404.component";
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./paciente-consultas/paciente-consultas.module').then((m) => m.PacienteConsultasModule),
  },
  {
    path: 'atendimentos',
    loadChildren: () =>
      import('./paciente-atendimentos/paciente-atendimentos.module').then((m) => m.PacienteAtendimentosModule),
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
