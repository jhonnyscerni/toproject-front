import { ConsultaService } from 'src/app/services/consulta.service';
import { Consulta } from './../../../models/consulta';
import { AtendimentoService } from './../../../services/atendimento.service';
import { Atendimento } from './../../../models/atendimento';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profissional-atendimento-atender',
  templateUrl: './profissional-atendimento-atender.component.html',
  styleUrls: ['./profissional-atendimento-atender.component.scss']
})
export class ProfissionalAtendimentoAtenderComponent extends BaseFormComponent implements OnInit {
  
  atendimento: Atendimento
  idConsulta: number
  consulta: Consulta

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private atendimentoService: AtendimentoService,
    private consultaService: ConsultaService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.idConsulta = params['idConsulta'];

      if (this.idConsulta) {
        const consulta$ = this.consultaService.loadByID(this.idConsulta);
        consulta$.subscribe(consulta => {
          this.consulta = consulta;
          // this.cadastroForm.setValue(evento)
        });
      }
    });

    this.cadastroForm = this.fb.group({
      id: [''],
      consulta: this.consulta,
      objetivoSessao: [''],
      descreveSessao: ['']
    });
  }

  submit() {
    console.log('submit');

    let msgSuccess = 'Atendimento realizado com sucesso!';
    let msgError = 'Erro ao realizar atendimento, tente novamente!';

    this.atendimentoService.atender(this.cadastroForm.value, this.idConsulta).subscribe(
      success => {
        this.toastr.success(msgSuccess, 'Informação :)')
        this.location.back();
      },
      error => 
      this.toastr.error(msgError, 'Opa :(')
    );
  }

  cancelar(){
    this.router.navigate(['/user/consultas/lista'], { relativeTo: this.route });
  }


}
