import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { profissionalConsultasRoutes } from './clinica-consultas.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ClinicaConsultasComponent } from './clinica-consultas.component';
import { ClinicaConsultaFormComponent } from './clinica-consulta-form/clinica-consulta-form.component';
import { ClinicaConsultaListaComponent } from './clinica-consulta-lista/clinica-consulta-lista.component';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(profissionalConsultasRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,

    MatFormFieldModule,
    NgBrazil,
    TextMaskModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    EditorModule
  ],
  declarations: [ClinicaConsultasComponent, ClinicaConsultaFormComponent, ClinicaConsultaListaComponent],
  exports: [ClinicaConsultasComponent, ClinicaConsultaFormComponent, ClinicaConsultaListaComponent],
})
export class ClinicaConsultasModule { }
