import { ProfissionalConsultaListaComponent } from './profissional-consulta-lista/profissional-consulta-lista.component';
import { ProfissionalConsultaFormComponent } from './profissional-consulta-form/profissional-consulta-form.component';
import { NgModule } from '@angular/core';
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
  ],
  declarations: [ProfissionalConsultasComponent, ProfissionalConsultaFormComponent, ProfissionalConsultaListaComponent],
  exports: [ProfissionalConsultasComponent, ProfissionalConsultaFormComponent, ProfissionalConsultaListaComponent]
})
export class ProfissionalConsultasModule { }
