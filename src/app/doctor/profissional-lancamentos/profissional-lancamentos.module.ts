import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfissionalLancamentoListaComponent} from './profissional-lancamento-lista/profissional-lancamento-lista.component';
import {BsDropdownModule, ProgressbarModule, TooltipModule} from "ngx-bootstrap";
import {RouterModule} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
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
import {profissionalLancamentosRoutes} from "./profissional-lancamentos.routing";
import { ProfissionalLancamentoFormComponent } from './profissional-lancamento-form/profissional-lancamento-form.component';


@NgModule({
  declarations: [ProfissionalLancamentoListaComponent, ProfissionalLancamentoFormComponent],
  exports:[ProfissionalLancamentoListaComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(profissionalLancamentosRoutes),
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
  ]
})
export class ProfissionalLancamentosModule { }
