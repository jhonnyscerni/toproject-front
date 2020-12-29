import { Paciente } from './../../../models/paciente';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from 'src/app/services/grupo.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profissional-paciente-form',
  templateUrl: './profissional-paciente-form.component.html',
  styleUrls: ['./profissional-paciente-form.component.sass']
})
export class ProfissionalPacienteFormComponent extends BaseFormComponent implements OnInit {

  paciente: Paciente;
  idPaciente: number;
  validarEmail: any;
  hide = true;

  // grupos: Grupo[];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router,
    private grupoService: GrupoService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    // this.carregarGrupos();
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
      // grupos: [''],
    });
  }

  updateForm(paciente) {
    this.cadastroForm.patchValue({
      id: paciente.id,
      nome: paciente.nome,
      email: paciente.email,
      senha: paciente.senha,
      // grupos: paciente.grupos
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

  cancelar(){
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
