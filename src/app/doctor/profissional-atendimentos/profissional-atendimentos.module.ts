import { ProfissionalAtendimentoListaComponent } from './profissional-atendimento-lista/profissional-atendimento-lista.component';
import { ProfissionalAtendimentoFormComponent } from './profissional-atendimento-form/profissional-atendimento-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfissionalAtendimentosComponent } from './profissional-atendimentos.component';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { profissionalAtendimentosRoutes } from './profissional-atendimentos.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

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

    MatFormFieldModule
  ],
  declarations: [ProfissionalAtendimentosComponent, ProfissionalAtendimentoFormComponent, ProfissionalAtendimentoListaComponent],
  exports: [ProfissionalAtendimentosComponent, ProfissionalAtendimentoFormComponent, ProfissionalAtendimentoListaComponent]
})
export class ProfissionalAtendimentosModule { }
