import { DashboardComponent } from './../clinic/dashboard/dashboard.component';
import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./clinica-pacientes/clinica-pacientes.module').then((m) => m.ClinicaPacientesModule),
  },
  {
    path: 'profissionais',
    loadChildren: () =>
      import('./clinica-profissionais/clinica-profissionais.module').then((m) => m.ClinicaProfissionaisModule),
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./clinica-consultas/clinica-consultas.module').then((m) => m.ClinicaConsultasModule),
  },
  {
    path: 'atendimentos',
    loadChildren: () =>
      import('./clinica-atendimentos/clinica-atendimentos.module').then((m) => m.ClinicaAtendimentosModule),
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicRoutingModule {}
