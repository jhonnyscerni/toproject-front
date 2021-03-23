import { Component, OnInit } from '@angular/core';
import {BaseFormComponent} from "../../../shared/base-form/base-form.component";
import {Profissional} from "../../../models/profissional";
import {Consulta} from "../../../models/consulta";
import {Paciente} from "../../../models/paciente";
import {Lancamento} from "../../../models/lancamento";
import {FormaPagamento} from "../../../models/forma-pagamento";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ConsultaService} from "../../../services/consulta.service";
import {ToastrService} from "ngx-toastr";
import {PacienteService} from "../../../services/paciente.service";
import {ProfissionalService} from "../../../services/profissional.service";
import {AuthService} from "../../../shared/services/auth.service";
import {FormaPagamentoService} from "../../../services/forma-pagamento.service";
import {LancamentoService} from "../../../services/lancamento.service";
import {CategoriaLancamentoService} from "../../../services/categoria-lancamento.service";
import {CategoriaLancamento} from "../../../models/categoria-lancamento";

@Component({
  selector: 'app-profissinal-lancamento-form',
  templateUrl: './profissional-lancamento-form.component.html',
  styleUrls: ['./profissional-lancamento-form.component.scss']
})
export class ProfissionalLancamentoFormComponent extends BaseFormComponent implements OnInit {

  profissional: Profissional;
  lancamento: Lancamento;
  idConsulta: number;
  validarEmail: any;
  hide = true;
  formaPagamentos: FormaPagamento[];
  categoriasLancamento: CategoriaLancamento[];


  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private lancamentoService: LancamentoService,
    private router: Router,
    private toastr: ToastrService,
    private pacienteService: PacienteService,
    private profissionalService: ProfissionalService,
    private authService: AuthService,
    private formaPagamentoService: FormaPagamentoService,
    private categoriaLancamentoService: CategoriaLancamentoService
  ) {
    super();
    this.profissional = this.authService.getUsuarioIdAutenticado();
  }

  ngOnInit(){
    this.carregarFormaPagamento();
    this.carregarCategoriaLançamento();

    this.route.params.subscribe((params: any) => {
      const idLancamento = params['idLancamento'];
      if (idLancamento) {
        const lancamento$ = this.lancamentoService.loadByID(idLancamento);
        lancamento$.subscribe(lancamento => {
          // if (lancamento.consulta.clinica.id != null){
          //   this.carregarPacientesClinica(consulta.clinica.id);
          //   this.cadastroForm.controls['paciente'].disable();
          // }
          this.updateForm(lancamento);
        });
      }
    });

    this.cadastroForm = this.fb.group({
      id: [''],
      formaPagamento: this.fb.group({
        id: ['', Validators.required]
      }),
      categoria: this.fb.group({
        id: ['', Validators.required]
      }),
      descricao: [''],
      dtLancamento: [''],
      valorTotal: ['', Validators.required],
    });
  }

  updateForm(lancamento) {

    this.cadastroForm.patchValue({
      id: lancamento.id,
      formaPagamento: {
        id: lancamento.formaPagamento.id
      },
      categoria: {
        id: lancamento.categoria.id
      },
      descricao: lancamento.descricao,
      dtLancamento: lancamento.dtLancamento,
      valorTotal: lancamento.valorTotal,
    });
  }

  getRequestParams() {
    let params = {};

    params[`profissionalId`] = this.profissional;

    return params;
  }


  submit() {
    let msgSuccess = 'Lançamento Financeiro criado com sucesso!';
    let msgError = 'Erro ao criar Lançamento, tente novamente!';
    if (this.cadastroForm.value.id) {
      //console.log(this.cadastroForm.value);
      msgSuccess = 'Lançamento atualizado com sucesso!';
      msgError = 'Erro ao atualizar Lançamento, tente novamente!';
    }

    this.lancamentoService.save(this.cadastroForm.value).subscribe(
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

  carregarFormaPagamento() {
    return this.formaPagamentoService.list()
      .subscribe(formaPagamento => {
          this.formaPagamentos = formaPagamento
        }
      );
  }

  carregarCategoriaLançamento() {
    return this.categoriaLancamentoService.list()
      .subscribe(categoriasLancamento => {
          this.categoriasLancamento = categoriasLancamento
        }
      );
  }

  cancelar() {
    this.router.navigate(['/user/lancamentos/lista'], { relativeTo: this.route });
  }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
  }

}
