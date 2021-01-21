import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Role } from "src/app/core/models/role";
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent extends BaseFormComponent implements OnInit {
  submitted = false;
  hide = true;
  usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    super();
  }
  ngOnInit() {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, ]]
    });
  }
  // get f() {
  //   return this.authForm.controls;
  // }
  // onSubmit() {
  //   this.submitted = true;
  //   this.error = "";
  //   if (this.authForm.invalid) {
  //     this.error = "Username and Password not valid !";
  //     return;
  //   } else {
  //     this.authService
  //       .login(this.f.username.value, this.f.password.value)
  //       .subscribe(
  //         (res) => {
  //           if (res) {
  //             const role = this.authService.currentUserValue.role;
  //             if (role === Role.All || role === Role.Admin) {
  //               this.router.navigate(["/admin/dashboard/main"]);
  //             } else if (role === Role.User) {
  //               this.router.navigate(["/user/dashboard"]);
  //             } else if (role === Role.Patient) {
  //               this.router.navigate(["/patient/dashboard"]);
  //             } else {
  //               this.router.navigate(["/authentication/signin"]);
  //             }
  //           } else {
  //             this.error = "Invalid Login";
  //           }
  //         },
  //         (error) => {
  //           this.error = error;
  //           this.submitted = false;
  //         }
  //       );
  //   }
  // }

  submit(){
    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
    // console.log(this.usuario)
    this.authService
          .tentarLogar( this.usuario.email, this.usuario.senha)
          .subscribe(response => {
            const access_token = JSON.stringify(response);
            localStorage.setItem('access_token', access_token)
            // this.router.navigate(['/dashboard'])
            this.authService.getUsuarioAutenticado()
            this.authService.getAutorizacoes()

            const role = this.authService.getGrupo();
            // console.log(role)

            if (role === Role.All || role === Role.Admin) {
              this.router.navigate(["/admin/dashboard/main"]);
            } else if (role === Role.User) {
              this.router.navigate(["/user/dashboard"]);
            } else if (role === Role.Patient) {
              this.router.navigate(["/patient/dashboard"]);
            } else if (role === Role.Clinic) {
              this.router.navigate(["/clinic/dashboard"]);
            } else {
              this.router.navigate(["/authentication/signin"]);
            }
          }, errorResponse => {
            //console.log(errorResponse);
            // this.error = errorResponse.error.error_description;
            this.error = "Usuário inexistente ou não ativado ou senha inválida"
            this.toastr.error('Ocorreu um erro!', 'Opa :(')
            // this.errors = ['Usuário e/ou senha incorreto(s).']
            this.submitted = false;
          })

  }

}
