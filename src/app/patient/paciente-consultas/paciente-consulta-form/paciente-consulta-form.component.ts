import {convenioEnum} from './../../../models/enums/convenioEnum';
import {procedimentoEnum} from './../../../models/enums/procedimentoEnum';
import {statusConsultaEnum} from './../../../models/enums/statusConsultaEnum';
import {Profissional} from './../../../models/profissional';
import {Paciente} from './../../../models/paciente';
import {Consulta} from './../../../models/consulta';
import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from 'src/app/shared/base-form/base-form.component';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PacienteService} from 'src/app/services/paciente.service';
import {ConsultaService} from 'src/app/services/consulta.service';
import {ProfissionalService} from 'src/app/services/profissional.service';
import {Location} from '@angular/common';
import {AuthService} from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profissional-consulta-form',
  templateUrl: './paciente-consulta-form.component.html',
  styleUrls: ['./paciente-consulta-form.component.sass']
})
export class PacienteConsultaFormComponent extends BaseFormComponent implements OnInit {

  paciente: Paciente;
  consulta: Consulta;
  idConsulta: number;
  validarEmail: any;
  hide = true;
  profissionais: Profissional[];

  statusConsultaEnum = statusConsultaEnum;
  procedimentoEnum =  procedimentoEnum;
  convenioEnum =  convenioEnum;


  keys = Object.keys;


  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private consultaService: ConsultaService,
    private router: Router,
    private toastr: ToastrService,
    private pacienteService: PacienteService,
    private profissionalService: ProfissionalService,
    private authService: AuthService
  ) {
    super();
    this.paciente = this.authService.getUsuarioIdAutenticado();
  }

  ngOnInit() {
    this.carregarProfissionais();

    this.route.params.subscribe((params: any) => {
      const idConsulta = params['idConsulta'];
      if (idConsulta) {
        const consulta$ = this.consultaService.loadByID(idConsulta);
        consulta$.subscribe(consulta => {
          this.updateForm(consulta);
        });
      }
    });

    this.cadastroForm = this.fb.group({
      id: [''],
      profissional: this.fb.group({
        id: [this.paciente]
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
      profissional: {
        id: consulta.profissional.id
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

    params[`pacientId`] = this.paciente;

    return params;
  }

  carregarProfissionais() {
    const params = this.getRequestParams();
    return this.profissionalService.listSearchList(params)
      .subscribe(value => {
            this.profissionais = value
          }
        );
  }


  submit() {
    let msgSuccess = 'Consulta criada com sucesso!';
    let msgError = 'Erro ao criar consulta, tente novamente!';
    if (this.cadastroForm.value.id) {
      //console.log(this.cadastroForm.value);
      msgSuccess = 'Consulta atualizado com sucesso!';
      msgError = 'Erro ao atualizar profissional, tente novamente!';
    }

    this.consultaService.save(this.cadastroForm.value).subscribe(
      success => {
        //this.alertService.showAlertSuccess(msgSuccess);
        this.toastr.success(msgSuccess, 'Informação :)')

        this.location.back();
      },
      error =>
        //this.alertService.showAlertDanger(msgError),
        this.toastr.error(msgError, 'Opa :(')
    );
  }

  cancelar() {
    this.router.navigate(['/patient/consultas/lista'], { relativeTo: this.route });
  }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
  }

}
