import {Component, OnInit} from "@angular/core";
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {BaseFormComponent} from 'src/app/shared/base-form/base-form.component';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Profissional} from "../../models/profissional";
import {ProfissionalService} from "../../services/profissional.service";
import {environment} from "../../../environments/environment";
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';


@Component({
  selector: "app-profissional-profile",
  templateUrl: "profissional-profile.component.html"
})
export class ProfissionalProfileComponent extends BaseFormComponent implements OnInit {


  MASKS = utilsBr.MASKS;

  usuario: Profissional = new Profissional()
  idUsuario: number;
  hide = true;
  userImg: string;
  arquivo: File;

  constructor(
    private authService: AuthService,
    private profissionalService: ProfissionalService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.carregarInfo();
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
      cpf: ['', [NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      grupos: [''],
    });
  }

  carregarInfo() {
    return this.profissionalService.loadByID(this.authService.getUsuarioIdAutenticado())
      .subscribe(usuario => {
        this.usuario = usuario
        this.updateForm(this.usuario);
        //console.log(this.usuario)
      })
  }

  updateForm(usuario) {
    this.cadastroForm.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      cpf: usuario.cpf,
      email: usuario.email,
      senha: usuario.senha,
      grupos: usuario.grupos
    });
    if (usuario.fotoPerfil) {
      this.userImg = `${environment.imagensUrl}/${usuario.fotoPerfil.nomeArquivo}`;
      console.log(this.userImg)
    } else {
      this.userImg = "assets/images/user/user-1.jpg";
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('arquivo', <File>this.arquivo);
    formData.append('profissional', new Blob([JSON.stringify(this.cadastroForm.value)], {type: "application/json"}));

    let msgSuccess;
    let msgError;
    if (this.cadastroForm.value.id) {
      //console.log(this.cadastroForm.value);
      msgSuccess = 'Usuário atualizado com sucesso!';
      msgError = 'Erro ao atualizar usuario, tente novamente!';
    }

    this.profissionalService.saveComFoto(formData, this.cadastroForm.value.id).subscribe(
      success => {
        //this.alertService.showAlertSuccess(msgSuccess);
        this.toastr.success(msgSuccess, 'Informação :)')
      },
      error =>
        //this.alertService.showAlertDanger(msgError),
        this.toastr.error(msgError, 'Opa :(')
    );
  }

  cancelar() {
    this.router.navigate(['/user/dashboard'], {relativeTo: this.route});
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.arquivo = event.target.files[0];
      // const file = event.target.files[0];
      // this.cadastroForm.get('arquivo').setValue(file);
    }
  }

}
