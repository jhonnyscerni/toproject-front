import { PacientesModule } from './pacientes/pacientes.module';
import { GruposModule } from './grupos/grupos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfissionaisModule } from './profissionais/profissionais.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,

    HttpClientModule,
    SharedModule,

    UsuariosModule,
    GruposModule,
    PacientesModule,
    ProfissionaisModule,

    // MAT
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
})
export class AdminModule {}
