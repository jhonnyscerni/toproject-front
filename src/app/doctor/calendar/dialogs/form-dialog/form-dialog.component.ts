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
import {Clinica} from "../../../../models/clinica";
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent extends BaseFormComponent {
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Consulta;
  showDeleteBtn = false;
  profissional = Profissional
  clinica = Clinica

  statusConsultaEnum = statusConsultaEnum;
  procedimentoEnum =  procedimentoEnum;
  convenioEnum =  convenioEnum;

  pacientes: Paciente[];

  className: any

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
          if (consulta.clinica.id != null){
            this.carregarPacientesClinica(consulta.clinica.id);
            this.cadastroForm.controls['paciente'].disable();
          }
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
      className : [this.className]
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
      observacoes: consulta.observacoes,
    });
  }

  atualizarClassName(consulta) {
    this.cadastroForm.patchValue({
      className : this.getClassNameValue(consulta)
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

  getRequestParamsClinica(clinicaId) {
    let params = {};

    params[`clinicaId`] = clinicaId;

    return params;
  }

  carregarPacientesClinica(clinicaId) {
    const params = this.getRequestParamsClinica(clinicaId);
    return this.pacienteService.listSearchList(params)
      .subscribe(pacientes => {
          this.pacientes = pacientes
        console.log(this.pacientes)
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

  getClassNameValue(status) {
    if (status === "CONFIRMADO")
       this.className = "fc-event-warning"
    else if (status === "AGENDADO")
    this.className = "fc-event-primary"
    else if (status === "CANCELADO")
      this.className = "fc-event-danger"
    else if (status === "REAGENDADO")
      this.className = "fc-event-info"
      else if (status = "FINALIZADO")
      this.className = "fc-event-success"


    return this.className;
  }


}
