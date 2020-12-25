import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";

import { MaterialModule } from "./material.module";
import { HttpClientModule } from '@angular/common/http';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { DropdownService } from './services/dropdown.service';
import { BaseFormComponent } from './base-form/base-form.component';
@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    AlertModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    MaterialModule,
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    AlertModalComponent,
    ConfirmModalComponent
  ],
  providers:[DropdownService],
      // entryComponents não é necessário a partir do angular v9
  entryComponents: [AlertModalComponent, ConfirmModalComponent]
})
export class SharedModule {}
