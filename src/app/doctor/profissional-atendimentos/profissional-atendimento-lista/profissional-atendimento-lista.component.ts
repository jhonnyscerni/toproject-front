import { Atendimento } from './../../../models/atendimento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */
Moment.locale('pt-br');

@Component({
  selector: 'app-profissional-atendimento-lista',
  templateUrl: './profissional-atendimento-lista.component.html',
  styleUrls: ['./profissional-atendimento-lista.component.scss']
})
export class ProfissionalAtendimentoListaComponent implements OnInit {

  atendimentos: Atendimento[];
  errorMessage: string;

  atendimentoSelecionado: Atendimento;
  searchForm: FormGroup
  idControl: FormControl
  nomePacienteControl: FormControl
  emailPacienteControl:FormControl


  // Paginação
  totalElements = 0;
  page = 1;
  pageElement = 0;
  size = 10

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private atendimentoService: AtendimentoService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  profissionalId = this.authService.getUsuarioIdAutenticado();

  getRequestParams(pageElement, size) {
    let id = this.idControl.value;
    let nomePacienteControl = this.nomePacienteControl.value;
    let emailPacienteControl = this.emailPacienteControl.value;
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


    if (nomePacienteControl && (nomePacienteControl = nomePacienteControl.trim()) !== '') {
      params[`nomePaciente`] = nomePacienteControl;
    }

    if (emailPacienteControl && (emailPacienteControl = emailPacienteControl.trim()) !== '') {
      params[`emailPaciente`] = emailPacienteControl;
    }

    params[`profissionalId`] = this.profissionalId;

    return params;
  }

  ngOnInit() {
    this.idControl = this.fb.control('')
    this.nomePacienteControl = this.fb.control('')
    this.emailPacienteControl = this.fb.control('')
    this.searchForm = this.fb.group({
      idControl: this.idControl,
      nomePacienteControl: this.nomePacienteControl,
      emailPacienteControl: this.emailPacienteControl
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

    this.atendimentoService.listSearchPage(params)
      .subscribe(
        atendimentos => {
          this.atendimentos = atendimentos.content
          this.totalElements = atendimentos.totalElements
          this.pageElement = atendimentos.number
          this.size = atendimentos.size
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
    this.router.navigate(['/user/atendimentos/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/user/atendimentos/detalhe', id], { relativeTo: this.route });
  }

  onDelete(atendimento) {
    this.atendimentoSelecionado = atendimento;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover esse atendimento?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.atendimentoService.remove(atendimento.id) : EMPTY,
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
