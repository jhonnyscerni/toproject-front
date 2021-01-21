import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioRecuperarSenha } from 'src/app/models/dto/usuario-recuperar-senha';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BaseFormComponent implements OnInit {
  submitted = false;
  returnUrl: string;
  usuario: UsuarioRecuperarSenha;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }
  ngOnInit() {
    this.cadastroForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit() {
    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
    //console.log(this.usuario)

    this.authService.recuperarLogin(this.usuario)
      .subscribe(response => {
        this.toastr.success("Foi enviado para seu e-mail uma nova senha de acesso, verifique seu email e faça Login!", 'Recuperação de senha com Sucesso :)');
        this.error = "";
        this.router.navigate(['/authentication/signin']);
      }, errorResponse => {
        this.toastr.error('Ocorreu um erro!', 'Opa :(')
        this.error = errorResponse.error.detail
      })
  }
}
