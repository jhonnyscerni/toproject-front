import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesComponent } from './pacientes.component';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { usuarioRoutes } from 'src/app/admin/usuarios/usuario.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { pacienteRoutes } from './paciente.routing';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(pacienteRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,
    
    MatFormFieldModule
  ],
  declarations: [PacientesComponent, PacienteListaComponent, PacienteFormComponent],
  exports:[PacientesComponent, PacienteListaComponent, PacienteFormComponent],
})
export class PacientesModule { }
