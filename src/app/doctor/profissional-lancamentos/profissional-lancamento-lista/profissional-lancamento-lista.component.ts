import {Component, OnInit} from '@angular/core';
import {Lancamento} from "../../../models/lancamento";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertModalService} from "../../../shared/services/alert-modal.service";
import {ConsultaService} from "../../../services/consulta.service";
import {AuthService} from "../../../shared/services/auth.service";
import {LancamentoService} from "../../../services/lancamento.service";
import * as Moment from "moment";
import {switchMap, take} from "rxjs/operators";
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-profissional-financeiro-lista',
  templateUrl: './profissional-lancamento-lista.component.html',
  styleUrls: ['./profissional-lancamento-lista.component.scss']
})
export class ProfissionalLancamentoListaComponent implements OnInit {

  lancamentos: Lancamento[];
  errorMessage: string;

  lancamentoSelecionado: Lancamento;

  searchForm: FormGroup
  idControl: FormControl
  dataInicioControl: FormControl
  dataFimControl: FormControl

  // Paginação
  totalElements = 0;
  page = 1;
  pageElement = 0;
  size = 10
  lancamento: Lancamento;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private consultaService: ConsultaService,
    private lancamentoService: LancamentoService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  profissional = this.authService.getUsuarioIdAutenticado();

  getRequestParams(pageElement, size) {
    let id = this.idControl.value;
    let dataInicioControl = this.dataInicioControl.value;
    let dataFimControl = this.dataFimControl.value;
    //2021-01-27T03:00:00.000Z
    //2021-02-03T00:02:00.00-03:00
    //console.log("dataInicio"+Moment(dataInicioControl).format('YYYY-MM-DDThh:mm:ssZ'))
    //console.log(statusConsultaControl)

    let params = {};

    if (pageElement) {
      params[`page`] = pageElement;
    }

    if (size) {
      params[`size`] = size;
    }

    if (id && (id = id.trim()) !== '') {
      params[`id`] = id;
    }

    if (dataInicioControl && dataInicioControl !== '') {
      params[`dataInicio`] = Moment(dataInicioControl).format('YYYY-MM-DDThh:mm:ssZ');
    }
    if (dataFimControl && dataFimControl !== '') {
      params[`dataFim`] = Moment(dataFimControl).format('YYYY-MM-DDThh:mm:ssZ');
    }

     params[`profissionalId`] = this.profissional;

    return params;
  }

  ngOnInit() {
    this.idControl = this.fb.control('')
    this.dataInicioControl = this.fb.control('')
    this.dataFimControl = this.fb.control('')

    this.searchForm = this.fb.group({
      idControl: this.idControl,
      dataInicioControl: this.dataInicioControl,
      dataFimControl: this.dataFimControl,
    })
    this.onRefresh();
  }


  handlePageChange(event) {
    this.page = event;
    this.pageElement = this.page - 1
    this.onRefresh();
  }

  onRefresh() {
    const params = this.getRequestParams(this.pageElement, this.size);

    this.lancamentoService.listSearchPage(params)
      .subscribe(
        lancamentos => {
          this.lancamentos = lancamentos.content
          this.totalElements = lancamentos.totalElements
          this.pageElement = lancamentos.number
          this.size = lancamentos.size
        },
        error => this.errorMessage
      );
  }

  onSearch() {
    this.totalElements = 0;
    this.page = 1;
    this.pageElement = 0;
    this.size = 10
    this.onRefresh()
  }

  onEdit(id) {
    this.router.navigate(['/user/lancamentos/editar', id], {relativeTo: this.route});
  }

  onDetalhe(id) {
    this.router.navigate(['/user/lancamentos/detalhe', id], {relativeTo: this.route});
  }

  onDelete(lancamento) {
    this.lancamentoSelecionado = lancamento;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover esse Lançamento?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.lancamentoService.remove(lancamento.id) : EMPTY,
        ),
      )
      .subscribe(
        success => {
          this.onRefresh();
        }
      );
  }

  public dateLayout(dt: any): String {
    //return Moment(dt).format('dddd, DD [de] MMMM [de] YYYY [às] HH:mm:ss');
    return Moment(dt).format('DD/MM/YYYY [às] HH:mm:ss');
  }


}
