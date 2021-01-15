import { DashboardComponent } from './../clinic/dashboard/dashboard.component';
import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  // {
  //   path: 'compromissos',
  //   loadChildren: () =>
  //     import('./calendar/calendar.module').then((m) => m.CalendarsModule),
  // },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicRoutingModule {}
