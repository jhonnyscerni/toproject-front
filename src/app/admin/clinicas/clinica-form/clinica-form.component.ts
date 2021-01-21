import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../../shared/base-form/base-form.component';
import { AlertModalService } from '../../../shared/services/alert-modal.service';
import {Clinica} from "../../../models/clinica";
import {ClinicaService} from "../../../services/clinica.service";
import {Grupo} from "../../../models/grupo";
import {GrupoService} from "../../../services/grupo.service";

@Component({
  selector: 'app-profissional-form',
  templateUrl: './clinica-form.component.html',
  styleUrls: ['./clinica-form.component.scss']
})
export class ClinicaFormComponent extends BaseFormComponent implements OnInit {

  clinica: Clinica;
  idClinica: number;
  validarEmail: any;
  hide = true;

  grupos: Grupo[];
  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private clinicaService: ClinicaService,
    private router: Router,
    private grupoService: GrupoService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.carregarGrupos();
    this.route.params.subscribe((params: any) => {
      const idClinica = params['idClinica'];
      if (idClinica) {
        //console.log(idClinica);
        const clinica$ = this.clinicaService.loadByID(idClinica);
        clinica$.subscribe(clinica => {
          this.updateForm(clinica);
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
      grupos: [''],
    });
  }

  updateForm(clinica) {
    this.cadastroForm.patchValue({
      id: clinica.id,
      nome: clinica.nome,
      email: clinica.email,
      senha: clinica.senha,
      grupos: clinica.grupos
    });
  }

  submit() {
    //console.log('submit');

    let msgSuccess = 'Clinica criada com sucesso!';
    let msgError = 'Erro ao criar clinica, tente novamente!';
    if (this.cadastroForm.value.id) {
      //console.log(this.cadastroForm.value);
      msgSuccess = 'Clinica atualizado com sucesso!';
      msgError = 'Erro ao atualizar clinica, tente novamente!';
    }

    this.clinicaService.save(this.cadastroForm.value).subscribe(
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
    this.router.navigate(['/admin/clinicas/lista'], { relativeTo: this.route });
  }

  carregarGrupos() {
    return this.grupoService.list()
      .subscribe(grupos => this.grupos = grupos);
  }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
}
}
