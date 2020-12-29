import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ProgressbarModule, CollapseModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { pacientesRoutes } from './pacientes.routing';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';
import { PacientesComponent } from './pacientes.component';


@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(pacientesRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,
    
    MatFormFieldModule
    
  ],
  declarations: [PacientesComponent, PacienteListaComponent],
  exports:[PacientesComponent, PacienteListaComponent]
})
export class PacientesModule { }

