import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissoesComponent } from './permissoes.component';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { permissaoRoutes } from './permissao.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PermissaoListaComponent } from './permissao-lista/permissao-lista.component';
import { PermissaoFormComponent } from './permissao-form/permissao-form.component';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(permissaoRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [PermissoesComponent, PermissaoListaComponent, PermissaoFormComponent],
  exports: [PermissoesComponent, PermissaoListaComponent, PermissaoFormComponent]
})
export class PermissoesModule { }
