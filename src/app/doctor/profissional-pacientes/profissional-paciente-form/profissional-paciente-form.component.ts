import { Paciente } from './../../../models/paciente';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { CepConsulta } from 'src/app/models/endereco';
import { Estado } from 'src/app/models/estado';
import { Cidade } from 'src/app/models/cidade';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { CidadeService } from 'src/app/services/cidade.service';
import { EstadoService } from 'src/app/services/estado.service';

import { utilsBr } from 'js-brasil';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/utils/format-datepicker';
import * as moment from 'moment';
@Component({
  selector: 'app-profissional-paciente-form',
  templateUrl: './profissional-paciente-form.component.html',
  styleUrls: ['./profissional-paciente-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ProfissionalPacienteFormComponent extends BaseFormComponent implements OnInit {

  cidade: Cidade;
  estado: Estado;
  paciente: Paciente;
  idPaciente: number;
  validarEmail: any;
  hide = true;
  estados: Estado[];
  cidades: Cidade[];

  // grupos: Grupo[];

  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router,
    private toastr: ToastrService,
    private consultaCepService: ConsultaCepService,
    private cidadeService: CidadeService,
    private estadoService: EstadoService
  ) {
    super();
  }

  ngOnInit() {
    this.carregarEstados();
    this.route.params.subscribe((params: any) => {
      const idPaciente = params['idPaciente'];
      if (idPaciente) {
        console.log(idPaciente);
        const paciente$ = this.pacienteService.loadByID(idPaciente);
        paciente$.subscribe(paciente => {
          this.updateForm(paciente);
        });
      }
    });

    this.cadastroForm = this.fb.group({
      id: [''],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      telefone: [''],
      celular: ['', [Validators.required]],
      dtNascimento: ['', [Validators.required]],

      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required, NgBrazilValidators.cep]],
      cidade: this.fb.group({
        id: ['', Validators.required],
        estado: this.fb.group({
          id: ['', Validators.required],
        }),
      }),
      // grupos: [''],
    });
  }

  carregarEstados() {
    return this.estadoService.list()
      .subscribe(estados => this.estados = estados);
  }

  updateForm(paciente) {

    this.cidadeService.loadByNomeESiglaEstado(paciente.cidade.nome, paciente.cidade.estado.sigla)
      .subscribe(cidade => {
        this.cidade = cidade
        this.cidades = []
        this.cidades.push(this.cidade)
        //2021-01-27T03:00:00.000Z
        paciente.dtNascimento = moment().format("YYYY-MM-DDTHH:MM:SS.000Z")
        console.log(paciente)
        this.cadastroForm.patchValue({
          id: paciente.id,
          nome: paciente.nome,
          email: paciente.email,
          senha: paciente.senha,
          cpf: paciente.cpf,
          sexo: paciente.sexo,
          telefone: paciente.telefone,
          celular: paciente.celular,
          dtNascimento: paciente.dtNascimento,
          logradouro: paciente.logradouro,
          numero: paciente.numero,
          complemento: paciente.complemento,
          bairro: paciente.bairro,
          cep: paciente.cep,
          cidade: {
            id: this.cidade.id,
            estado: {
              id: this.cidade.estado.id,
            },
          }
        });
      });

  }

  buscarCidadesEstado(estado: any) {
    return this.cidadeService.loadByEstadoId(estado)
      .subscribe(cidades => {
        this.cidades = cidades
        this.cadastroForm.patchValue({
          cidade: {
            id: this.cidades[0].id,
            estado: {
              id: this.cidades[0].estado.id,
            },
          }
        });
      });
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.consultaCepService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {
    this.cidadeService.loadByNomeESiglaEstado(cepConsulta.localidade, cepConsulta.uf)
      .subscribe(cidade => {
        this.cidade = cidade
        this.cidades = []
        this.cidades.push(this.cidade)

        this.cadastroForm.patchValue({
          logradouro: cepConsulta.logradouro,
          bairro: cepConsulta.bairro,
          cep: cepConsulta.cep,
          cidade: {
            id: this.cidade.id,
            estado: {
              id: this.cidade.estado.id,
            },
          }
        });
      });
  }

  submit() {
    console.log('submit');

    let msgSuccess = 'Paciente criado com sucesso!';
    let msgError = 'Erro ao criar paciente, tente novamente!';
    if (this.cadastroForm.value.id) {
      console.log(this.cadastroForm.value);
      msgSuccess = 'Paciente atualizado com sucesso!';
      msgError = 'Erro ao atualizar paciente, tente novamente!';
    }

    this.pacienteService.save(this.cadastroForm.value).subscribe(
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
    this.router.navigate(['/user/pacientes/lista'], { relativeTo: this.route });
  }

  // carregarGrupos() {
  //   return this.grupoService.list()
  //     .subscribe(grupos => this.grupos = grupos);
  // }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
  }


}
