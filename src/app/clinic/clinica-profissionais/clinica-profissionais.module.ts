import { SharedModule } from '../../shared/shared.module';
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
import { ClinicaProfissionaisComponent } from './clinica-profissionais.component';
import { ClinicaProfissionalListaComponent } from './clinica-profissional-lista/clinica-profissional-lista.component';
import { ClinicaProfissionalFormComponent } from './clinica-profissional-form/clinica-profissional-form.component';
import { clinicaprofissionaisRoutes } from './clinica-profissionais.routing';
import {MaterialFileInputModule} from "ngx-material-file-input";
import {TextMaskModule} from "angular2-text-mask";
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(clinicaprofissionaisRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,

    MatFormFieldModule,
    MaterialFileInputModule,
    TextMaskModule,
    MatTabsModule

  ],
  declarations: [ClinicaProfissionaisComponent, ClinicaProfissionalListaComponent, ClinicaProfissionalFormComponent],
  exports:[ClinicaProfissionaisComponent, ClinicaProfissionalListaComponent, ClinicaProfissionalFormComponent]
})
export class ClinicaProfissionaisModule { }

