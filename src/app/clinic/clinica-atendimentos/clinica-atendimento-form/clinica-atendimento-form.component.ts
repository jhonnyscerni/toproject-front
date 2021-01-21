import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Atendimento } from 'src/app/models/atendimento';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profissional-atendimento-form',
  templateUrl: './clinica-atendimento-form.component.html',
  styleUrls: ['./clinica-atendimento-form.component.scss']
})
export class ClinicaAtendimentoFormComponent extends BaseFormComponent implements OnInit {

  atendimento: Atendimento
  idAtendimento: number

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private atendimentoService: AtendimentoService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const idAtendimento = params['idAtendimento'];
      if (idAtendimento) {
        const atendimento$ = this.atendimentoService.loadByID(idAtendimento);
        atendimento$.subscribe(atendimento => {
          this.updateForm(atendimento);
          // this.cadastroForm.setValue(evento)
        });
      }
    });

    this.cadastroForm = this.fb.group({
      id: [''],
      consulta: [''],
      objetivoSessao: [''],
      descreveSessao: ['']
    });
  }

  updateForm(atendimento) {
    this.cadastroForm.patchValue({
      id: atendimento.id,
      consulta: atendimento.consulta,
      objetivoSessao: atendimento.objetivoSessao,
      descreveSessao:atendimento.descreveSessao
    });
  }

  submit() {
    //console.log('submit');

    let msgSuccess = 'Atendimento atualizado com sucesso!';
    let msgError = 'Erro ao atualizar atendimento, tente novamente!';

    this.atendimentoService.save(this.cadastroForm.value).subscribe(
      success => {
        this.toastr.success(msgSuccess, 'Informação :)')
        this.location.back();
      },
      error =>
      this.toastr.error(msgError, 'Opa :(')
    );
  }

  cancelar(){
    this.router.navigate(['/clinic/atendimentos/lista'], { relativeTo: this.route });
  }



}
