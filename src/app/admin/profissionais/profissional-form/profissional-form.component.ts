import { ProfissionalService } from './../../../services/profissional.service';
import { Profissional } from './../../../models/profissional';
import { GrupoService } from './../../../services/grupo.service';
import { Grupo } from './../../../models/grupo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../../shared/base-form/base-form.component';
import { AlertModalService } from '../../../shared/services/alert-modal.service';
import {Clinica} from "../../../models/clinica";
import {ClinicaService} from "../../../services/clinica.service";

@Component({
  selector: 'app-profissional-form',
  templateUrl: './profissional-form.component.html',
  styleUrls: ['./profissional-form.component.scss']
})
export class ProfissionalFormComponent extends BaseFormComponent implements OnInit {

  profissional: Profissional;
  idProfissional: number;
  validarEmail: any;
  hide = true;

  clinicas: Clinica[];

  grupos: Grupo[];
  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private profissionalService: ProfissionalService,
    private clincaService: ClinicaService,
    private router: Router,
    private grupoService: GrupoService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.carregarGrupos();
    this.carregarClinicas();
    this.route.params.subscribe((params: any) => {
      const idProfissional = params['idProfissional'];
      if (idProfissional) {
        const profissional$ = this.profissionalService.loadByID(idProfissional);
        profissional$.subscribe(profissional => {
          this.updateForm(profissional);
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
      clinica: this.fb.group({
        id: ['']
      }),
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      grupos: [''],
    });
  }

  updateForm(profissional) {
    this.cadastroForm.patchValue({
      id: profissional.id,
      nome: profissional.nome,
      email: profissional.email,
      senha: profissional.senha,
      grupos: profissional.grupos,
      clinica: {
        id: profissional.clinicaId
      },
    });
  }

  submit() {
    //console.log('submit');

    let msgSuccess = 'Profissional criado com sucesso!';
    let msgError = 'Erro ao criar profissional, tente novamente!';
    if (this.cadastroForm.value.id) {
      //console.log(this.cadastroForm.value);
      msgSuccess = 'Profissional atualizado com sucesso!';
      msgError = 'Erro ao atualizar profissional, tente novamente!';
    }

    this.profissionalService.save(this.cadastroForm.value).subscribe(
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

  cancelar(){
    this.router.navigate(['/admin/profissionais/lista'], { relativeTo: this.route });
  }

  carregarGrupos() {
    return this.grupoService.list()
      .subscribe(grupos => this.grupos = grupos);
  }

  getRequestParams() {
    let params = {};

    // params[`clinicaId`] = this.clinica;

    return params;
  }


  carregarClinicas() {
    const params = this.getRequestParams();
    return this.clincaService.listSearchList(params)
      .subscribe(clinicas => {
          this.clinicas = clinicas
        }
      );
  }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
}
}
