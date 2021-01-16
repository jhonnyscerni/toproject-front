import { ProfissionalService } from '../../../services/profissional.service';
import { Profissional } from '../../../models/profissional';
import { GrupoService } from '../../../services/grupo.service';
import { Grupo } from '../../../models/grupo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../../shared/base-form/base-form.component';
import { AlertModalService } from '../../../shared/services/alert-modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-clinica-profissional-form',
  templateUrl: './clinica-profissional-form.component.html',
  styleUrls: ['./clinica-profissional-form.component.scss']
})
export class ClinicaProfissionalFormComponent extends BaseFormComponent implements OnInit {
 
  profissional: Profissional;
  idProfissional: number;
  validarEmail: any;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private profissionalService: ProfissionalService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    // this.carregarGrupos();
    this.route.params.subscribe((params: any) => {
      const idProfissional = params['idProfissional'];
      if (idProfissional) {
        console.log(idProfissional);
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
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      clinicaId: this.authService.getUsuarioIdAutenticado()
    });
  }

  updateForm(profissional) {
    this.cadastroForm.patchValue({
      id: profissional.id,
      nome: profissional.nome,
      email: profissional.email,
      senha: profissional.senha,
      clinicaId: this.authService.getUsuarioIdAutenticado()
    });
  }

  submit() {
    console.log('submit');

    let msgSuccess = 'Profissional criado com sucesso!';
    let msgError = 'Erro ao criar profissional, tente novamente!';
    if (this.cadastroForm.value.id) {
      console.log(this.cadastroForm.value);
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
    this.router.navigate(['/clinic/profissionais/lista'], { relativeTo: this.route });
  }

  // carregarGrupos() {
  //   return this.grupoService.list()
  //     .subscribe(grupos => this.grupos = grupos);
  // }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
}
}
