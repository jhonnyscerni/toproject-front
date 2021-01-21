import { ProfissionalAtendimentoAtenderComponent } from './profissional-atendimento-atender/profissional-atendimento-atender.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ProfissionalConsultaListaComponent } from './profissional-consulta-lista/profissional-consulta-lista.component';
import { ProfissionalConsultaFormComponent } from './profissional-consulta-form/profissional-consulta-form.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfissionalConsultasComponent } from './profissional-consultas.component';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { profissionalConsultasRoutes } from './profissional-consultas.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
    EditorModule,
    MatAutocompleteModule
  ],
  declarations: [ProfissionalConsultasComponent, ProfissionalConsultaFormComponent, ProfissionalConsultaListaComponent, ProfissionalAtendimentoAtenderComponent],
  exports: [ProfissionalConsultasComponent, ProfissionalConsultaFormComponent, ProfissionalConsultaListaComponent, ProfissionalAtendimentoAtenderComponent],
})
export class ProfissionalConsultasModule { }
