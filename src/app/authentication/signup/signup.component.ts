import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BaseFormComponent} from 'src/app/shared/base-form/base-form.component';
import {Location} from '@angular/common';
import {ProfissionalService} from 'src/app/services/profissional.service';
import {CustomValidators} from 'ng2-validation';
import {ClinicaService} from "../../services/clinica.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends BaseFormComponent implements OnInit {
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  tipoConta = 'USER';

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private profissionalService: ProfissionalService,
    private clinicaService: ClinicaService,
    private toastr: ToastrService,
  ) {
    super();
  }
  ngOnInit() {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

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

      // senha: senha,
      // confirmPassword: senhaConfirm
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // onSubmit() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.authForm.invalid) {
  //     return;
  //   } else {
  //     this.router.navigate(['/admin/dashboard/main']);
  //   }
  // }

  submit() {
    this.submitted = true;
    //console.log('submit');

    let msgSuccess = 'Cadastro Realizado. OBRIGADO! Enviamos um e-mail para você ativar sua conta. Caso o email não esteja na caixa de entrada, verifique sua caixa de spam/lixo eletrônico.!';
    let msgError = 'Erro ao cadastrar usuario, tente novamente!';

    if (this.tipoConta == "USER"){
      this.profissionalService.saveUserCommon(this.cadastroForm.value).subscribe(
        success => {
          // this.alertService.showAlertSuccess(msgSuccess);
          this.toastr.success('OBRIGADO! Enviamos um e-mail para você ativar sua conta. Caso o email não esteja na caixa de entrada, verifique sua caixa de spam/lixo eletrônico.!', 'Cadastro Realizado com Sucesso!')
          this.location.back();
        },
        error =>
        //this.alertService.showAlertDanger(msgError),
        this.toastr.error('Ocorreu um erro!', 'Opa :(')
      );
    } else if (this.tipoConta == "CLINIC"){
      this.clinicaService.saveUserCommon(this.cadastroForm.value).subscribe(
        success => {
          // this.alertService.showAlertSuccess(msgSuccess);
          this.toastr.success('OBRIGADO! Enviamos um e-mail para você ativar sua conta. Caso o email não esteja na caixa de entrada, verifique sua caixa de spam/lixo eletrônico.!', 'Cadastro Realizado com Sucesso!')
          this.location.back();
        },
        error =>
          //this.alertService.showAlertDanger(msgError),
          this.toastr.error('Ocorreu um erro!', 'Opa :(')
      );
    } else {
      this.toastr.error('Ocorreu um erro!', 'Selecione o Tipo de Conta')
    }
  }


  doSomething(event) {
    this.tipoConta = event
  }

}
