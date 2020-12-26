import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Grupo } from '../../../models/grupo';
import { AlertModalService } from '../../../shared/services/alert-modal.service';
import { GrupoService } from '../../../services/grupo.service';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})
export class GrupoFormComponent extends BaseFormComponent implements OnInit {
  
  grupo: Grupo;
  idGrupo: number;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private grupoService: GrupoService,
    private toastr: ToastrService,
  ) { 
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const idGrupo = params['idGrupo'];
      if (idGrupo) {
        console.log(idGrupo);
        const grupo$ = this.grupoService.loadByID(idGrupo);
        grupo$.subscribe(grupo => {
          this.updateForm(grupo);
          // this.cadastroForm.setValue(evento)
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
      ]
    });
  }

  updateForm(grupo) {
    this.cadastroForm.patchValue({
      id: grupo.id,
      nome: grupo.nome
    });
  }

  submit() {
    console.log('submit');

    let msgSuccess = 'Grupo criado com sucesso!';
    let msgError = 'Erro ao criar grupo, tente novamente!';
    if (this.cadastroForm.value.id) {
      console.log(this.cadastroForm.value);
      msgSuccess = 'Grupo atualizado com sucesso!';
      msgError = 'Erro ao atualizar grupo, tente novamente!';
    }

    this.grupoService.save(this.cadastroForm.value).subscribe(
      success => {
        //this.toastr.success(msgSuccess, 'Sucesso'),
        // this.alertService.showAlertSuccess(msgSuccess);
        this.toastr.success(msgSuccess, 'Informação :)')
        this.location.back();
      },
      error => 
      //this.alertService.showAlertDanger(msgError),
      this.toastr.error(msgError, 'Opa :(')
    );
  }

  cancelar(){
    this.router.navigate(['/admin/grupos/lista'], { relativeTo: this.route });
  }

}
