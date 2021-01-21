import { Component, OnInit } from '@angular/core';
import { Permissao } from 'src/app/models/permissao';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissaoService } from 'src/app/services/permissao.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-permissao-form',
  templateUrl: './permissao-form.component.html',
  styleUrls: ['./permissao-form.component.scss']
})
export class PermissaoFormComponent extends BaseFormComponent implements OnInit {

  permissao: Permissao;
  idPermissao: number;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private permissaoService: PermissaoService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const idPermissao = params['idPermissao'];
      if (idPermissao) {
        //console.log(idPermissao);
        const permissao$ = this.permissaoService.loadByID(idPermissao);
        permissao$.subscribe(permissao => {
          this.updateForm(permissao);
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
      ],
      descricao: ['', [Validators.required]]
    });
  }

  updateForm(permissao) {
    this.cadastroForm.patchValue({
      id: permissao.id,
      nome: permissao.nome,
      descricao: permissao.descricao
    });
  }

  submit() {
    //console.log('submit');

    let msgSuccess = 'Permissão criada com sucesso!';
    let msgError = 'Erro ao criar permissão, tente novamente!';
    if (this.cadastroForm.value.id) {
      //console.log(this.cadastroForm.value);
      msgSuccess = 'Permissão atualizado com sucesso!';
      msgError = 'Erro ao atualizar permissão, tente novamente!';
    }

    this.permissaoService.save(this.cadastroForm.value).subscribe(
      success => {
        //this.toastr.success(msgSuccess, 'Sucesso'),
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
    this.router.navigate(['/admin/permissoes/lista'], { relativeTo: this.route });
  }

}
