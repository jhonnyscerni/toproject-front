import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: 'profissionais',
    loadChildren: () =>
      import('./profissionais/profissionais.module').then((m) => m.ProfissionaisModule),
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./pacientes/pacientes.module').then((m) => m.PacientesModule),
  },
  {
    path: 'grupos',
    loadChildren: () =>
      import('./grupos/grupos.module').then((m) => m.GruposModule),
  },
  {
    path: 'permissoes',
    loadChildren: () =>
      import('./permissoes/permissoes.module').then((m) => m.PermissoesModule),
  },
  {
    path: "profile",
    component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
