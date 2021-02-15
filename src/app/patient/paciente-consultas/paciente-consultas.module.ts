import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {PacienteConsultaListaComponent} from './paciente-consulta-lista/paciente-consulta-lista.component';
import {PacienteConsultaFormComponent} from './paciente-consulta-form/paciente-consulta-form.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BsDropdownModule, ProgressbarModule, TooltipModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from 'src/app/shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgBrazil} from 'ng-brazil';
import {TextMaskModule} from 'angular2-text-mask';
import {EditorModule} from '@tinymce/tinymce-angular';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from "@angular/material/tabs";
import {pacienteConsultasRoutes} from "./paciente-consultas.routing";

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(pacienteConsultasRoutes),
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
    EditorModule,
    MatAutocompleteModule,
    MatTabsModule
  ],
  declarations: [PacienteConsultaFormComponent, PacienteConsultaListaComponent],
  exports: [PacienteConsultaFormComponent, PacienteConsultaListaComponent],
})
export class PacienteConsultasModule {
}
