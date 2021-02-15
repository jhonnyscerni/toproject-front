import { PacienteAtendimentoListaComponent } from './paciente-atendimento-lista/paciente-atendimento-lista.component';
import { PacienteAtendimentoFormComponent } from './paciente-atendimento-form/paciente-atendimento-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteAtendimentosComponent } from './paciente-atendimentos.component';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { profissionalAtendimentosRoutes } from './paciente-atendimentos.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(profissionalAtendimentosRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,

    MatFormFieldModule,
    EditorModule
  ],
  declarations: [PacienteAtendimentosComponent, PacienteAtendimentoFormComponent, PacienteAtendimentoListaComponent],
  exports: [PacienteAtendimentosComponent, PacienteAtendimentoFormComponent, PacienteAtendimentoListaComponent]
})
export class PacienteAtendimentosModule { }
