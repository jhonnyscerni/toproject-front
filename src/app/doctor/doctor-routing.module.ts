import {Page404Component} from './../authentication/page404/page404.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfissionalProfileComponent} from "./profissional-profile/profissional-profile.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'compromissos',
    loadChildren: () =>
      import('./calendar/calendar.module').then((m) => m.CalendarsModule),
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./profissional-pacientes/profissional-pacientes.module').then((m) => m.ProfissionalPacientesModule),
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./profissional-consultas/profissional-consultas.module').then((m) => m.ProfissionalConsultasModule),
  },
  {
    path: 'atendimentos',
    loadChildren: () =>
      import('./profissional-atendimentos/profissional-atendimentos.module').then((m) => m.ProfissionalAtendimentosModule),
  },
  {
    path: "profile",
    component: ProfissionalProfileComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
