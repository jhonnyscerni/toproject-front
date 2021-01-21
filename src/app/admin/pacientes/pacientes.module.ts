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
import { pacientesRoutes } from './pacientes.routing';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';
import { PacientesComponent } from './pacientes.component';
import {PacienteFormComponent} from "./paciente-form/paciente-form.component";
import {NgBrazil} from "ng-brazil";
import {TextMaskModule} from "angular2-text-mask";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(pacientesRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,

    MatFormFieldModule,
    NgBrazil,
    TextMaskModule,

    // MAT
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule

  ],
  declarations: [PacientesComponent, PacienteListaComponent, PacienteFormComponent],
  exports:[PacientesComponent, PacienteListaComponent, PacienteFormComponent]
})
export class PacientesModule { }

