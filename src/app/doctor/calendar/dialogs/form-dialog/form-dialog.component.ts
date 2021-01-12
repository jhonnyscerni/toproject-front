import { Consulta } from './../../../../models/consulta';
import { Profissional } from './../../../../models/profissional';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Calendar } from '../../calendar.model';
import { formatDate } from '@angular/common';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { statusConsultaEnum } from 'src/app/models/enums/statusConsultaEnum';
import { procedimentoEnum } from 'src/app/models/enums/procedimentoEnum';
import { convenioEnum } from 'src/app/models/enums/convenioEnum';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { ConsultaService } from 'src/app/services/consulta.service';
import { switchMap, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent extends BaseFormComponent {
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Consulta;
  showDeleteBtn = false;
  profissional = Profissional

  statusConsultaEnum = statusConsultaEnum;
  procedimentoEnum =  procedimentoEnum;
  convenioEnum =  convenioEnum;

  pacientes: Paciente[];

  keys = Object.keys;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: CalendarService,
    private fb: FormBuilder,
    private authService: AuthService,
    private pacienteService: PacienteService,
    private consultaService: ConsultaService,
    private toastr: ToastrService,
    private alertService: AlertModalService,
  ) {
    super();
    this.profissional = this.authService.getUsuarioIdAutenticado();
    this.carregarPacientes();
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.title;
      this.calendar = data.calendar;
      this.showDeleteBtn = true;
      const idConsulta = data.calendar.id

        if (idConsulta) {
        const consulta$ = this.consultaService.loadByID(idConsulta);
        consulta$.subscribe(consulta => {
          console.log(consulta)
          this.updateForm(consulta);
        });
      }

    } else {
      this.dialogTitle = 'Novo Compromisso';
      this.showDeleteBtn = false;
    }

    this.cadastroForm = this.fb.group({
      id: [''],
      title: [''],
      paciente: this.fb.group({
        id: ['', Validators.required]
      }),
      profissional: this.fb.group({
        id: [this.profissional]
      }),
      dataHora: [''],
      localDeAtendimento: ['', [Validators.required]],
      procedimentoEnum: ['', [Validators.required]],
      statusConsultaEnum: [''],
      convenioEnum: ['', [Validators.required]],
      observacoes: ['', [Validators.required]],
    });
  }

  updateForm(consulta) {

    this.cadastroForm.patchValue({
      id: consulta.id,
      title: consulta.title,
      paciente: {
        id: consulta.paciente.id
      },
      profissional: {
        id: this.profissional
      },
      dataHora: consulta.dataHora,
      localDeAtendimento: consulta.localDeAtendimento,
      procedimentoEnum: consulta.procedimentoEnum,
      statusConsultaEnum: consulta.statusConsultaEnum,
      convenioEnum: consulta.convenioEnum,
      observacoes: consulta.observacoes
    });
  }



  getRequestParams() {
    let params = {};

    params[`profissionalId`] = this.profissional;
    
    return params;
  }


  carregarPacientes() {
    const params = this.getRequestParams();
    return this.pacienteService.listSearchList(params)
      .subscribe(pacientes => {
            this.pacientes = pacientes
          }
    );
  }
  
  submit() {
    // emppty stuff
    let msgSuccess = 'Consulta criada com sucesso!';
    let msgError = 'Erro ao criar consulta, tente novamente!';
    if (this.cadastroForm.value.id) {
      console.log(this.cadastroForm.value);
      msgSuccess = 'Profissional atualizado com sucesso!';
      msgError = 'Erro ao atualizar profissional, tente novamente!';
    }

    this.consultaService.save(this.cadastroForm.value).subscribe(
      success => {
        //this.alertService.showAlertSuccess(msgSuccess);
        this.toastr.success(msgSuccess, 'Informação :)')
        this.dialogRef.close('submit');
      },
      error =>
        //this.alertService.showAlertDanger(msgError),
        this.toastr.error(msgError, 'Opa :(')
    );
  }

  onDelete() {
    // this.consultaSelecionado = consulta;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover essa consulta?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.consultaService.remove(this.cadastroForm.get('id').value) : EMPTY,
        ),
      )
      .subscribe(
        success => {
          this.toastr.success("Excluido com Sucesso!", 'Informação :)')
          this.dialogRef.close('delete');
        }
      );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
  }


}
