import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaPacientesComponent } from './clinica-pacientes.component';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { clinicaPacientesRoutes } from './clinica-pacientes.routing';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClinicaPacienteListaComponent } from './clinica-paciente-lista/clinica-paciente-lista.component';
import { ClinicaPacienteFormComponent } from './clinica-paciente-form/clinica-paciente-form.component';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(clinicaPacientesRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,

    MatFormFieldModule,
    NgBrazil,
    TextMaskModule,
    
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
  declarations: [ClinicaPacientesComponent, ClinicaPacienteListaComponent, ClinicaPacienteFormComponent],
  exports: [ClinicaPacientesComponent, ClinicaPacienteListaComponent, ClinicaPacienteFormComponent]
})
export class ClinicaPacientesModule { }
