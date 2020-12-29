import { ProfissionalPacienteFormComponent } from './profissional-paciente-form/profissional-paciente-form.component';
import { ProfissionalPacienteListaComponent } from './profissional-paciente-lista/profissional-paciente-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfissionalPacientesComponent } from './profissional-pacientes.component';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { profissionalPacientesRoutes } from './profissional-pacientes.routing';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(profissionalPacientesRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,
    
    MatFormFieldModule
  ],
  declarations: [ProfissionalPacientesComponent, ProfissionalPacienteListaComponent, ProfissionalPacienteFormComponent],
  exports: [ProfissionalPacientesComponent, ProfissionalPacienteListaComponent, ProfissionalPacienteFormComponent]
})
export class ProfissionalPacientesModule { }
