import { GrupoService } from './../../../services/grupo.service';
import { filter } from 'rxjs/operators';
import { Grupo } from './../../../models/grupo';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../../shared/base-form/base-form.component';
import { AlertModalService } from '../../../shared/services/alert-modal.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends BaseFormComponent implements OnInit {

  usuario: Usuario;
  idUsuario: number;
  validarEmail: any;
  hide = true;

  grupos: Grupo[];
  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private grupoService: GrupoService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.carregarGrupos();
    this.route.params.subscribe((params: any) => {
      const idUsuario = params['idUsuario'];
      if (idUsuario) {
        //console.log(idUsuario);
        const usuario$ = this.usuarioService.loadByID(idUsuario);
        usuario$.subscribe(usuario => {
          this.updateForm(usuario);
          // this.grupos = usuario.grupos
          //this.carregarGrupos();
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
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      grupos: [''],
    });
  }

  updateForm(usuario) {
    this.cadastroForm.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      grupos: usuario.grupos
    });
  }

  submit() {
    //console.log('submit');

    let msgSuccess = 'Usuário criado com sucesso!';
    let msgError = 'Erro ao criar usuario, tente novamente!';
    if (this.cadastroForm.value.id) {
      //console.log(this.cadastroForm.value);
      msgSuccess = 'Usuário atualizado com sucesso!';
      msgError = 'Erro ao atualizar usuario, tente novamente!';
    }

    this.usuarioService.save(this.cadastroForm.value).subscribe(
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
    this.router.navigate(['/admin/usuarios/lista'], { relativeTo: this.route });
  }

  carregarGrupos() {
    return this.grupoService.list()
      .subscribe(grupos => this.grupos = grupos);
  }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
}
}
