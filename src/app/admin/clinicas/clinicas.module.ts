import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaListaComponent } from './clinica-lista/clinica-lista.component';
import {BsDropdownModule, ProgressbarModule, TooltipModule} from "ngx-bootstrap";
import {RouterModule} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {clinicasRoutes} from "./clinica.routing";
import {ClinicaFormComponent} from "./clinica-form/clinica-form.component";



@NgModule({
  declarations: [ClinicaListaComponent, ClinicaFormComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(clinicasRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,

    MatFormFieldModule

  ],
  exports:[ClinicaListaComponent, ClinicaFormComponent]
})
export class ClinicasModule { }
