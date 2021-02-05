import {Component, OnInit} from "@angular/core";
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {BaseFormComponent} from 'src/app/shared/base-form/base-form.component';
import {AuthService} from 'src/app/shared/services/auth.service';
import {ProfissionalService} from "../../services/profissional.service";
import {Clinica} from "../../models/clinica";
import {ClinicaService} from "../../services/clinica.service";

@Component({
  selector: "app-profissional-profile",
  templateUrl: "clinica-profile.component.html"
})
export class ClinicaProfileComponent extends BaseFormComponent implements OnInit {

  usuario: Clinica = new Clinica()
  idUsuario: number;
  hide = true;

  constructor(
    private authService: AuthService,
    private clinicaService: ClinicaService,
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
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      grupos: [''],
    });
  }

  carregarInfo() {
    return this.clinicaService.loadByID(this.authService.getUsuarioIdAutenticado())
      .subscribe(usuario => {
        this.usuario = usuario
        this.updateForm(this.usuario);
        // console.log(this.usuario)
      })
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

    let msgSuccess;
    let msgError;
    if (this.cadastroForm.value.id) {
      //console.log(this.cadastroForm.value);
      msgSuccess = 'Clinica atualizada com sucesso!';
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

  cancelar() {
    this.router.navigate(['/clinic/dashboard'], {relativeTo: this.route});
  }

}
