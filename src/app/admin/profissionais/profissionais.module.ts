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
import { ProfissionalListaComponent } from './profissional-lista/profissional-lista.component';
import { profissionaisRoutes } from './profissionais.routing';
import { ProfissionaisComponent } from './profissionais.component';
import { ProfissionalFormComponent } from './profissional-form/profissional-form.component';


@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(profissionaisRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,
    
    MatFormFieldModule
    
  ],
  declarations: [ProfissionaisComponent, ProfissionalListaComponent, ProfissionalFormComponent],
  exports:[ProfissionaisComponent, ProfissionalListaComponent, ProfissionalFormComponent]
})
export class ProfissionaisModule { }

