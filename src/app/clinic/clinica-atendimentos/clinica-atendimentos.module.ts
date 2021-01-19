import { ClinicaAtendimentoListaComponent } from './clinica-atendimento-lista/clinica-atendimento-lista.component';
import { ClinicaAtendimentoFormComponent } from './clinica-atendimento-form/clinica-atendimento-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaAtendimentosComponent } from './clinica-atendimentos.component';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { clinicaAtendimentosRoutes } from './clinica-atendimentos.routing';
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
    RouterModule.forChild(clinicaAtendimentosRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,

    MatFormFieldModule,
    EditorModule
  ],
  declarations: [ClinicaAtendimentosComponent, ClinicaAtendimentoFormComponent, ClinicaAtendimentoListaComponent],
  exports: [ClinicaAtendimentosComponent, ClinicaAtendimentoFormComponent, ClinicaAtendimentoListaComponent]
})
export class ClinicaAtendimentosModule { }
