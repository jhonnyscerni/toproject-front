import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Clinica} from "../../../models/clinica";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertModalService} from "../../../shared/services/alert-modal.service";
import {switchMap, take} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {ClinicaService} from "../../../services/clinica.service";

@Component({
  selector: 'app-clinica-lista',
  templateUrl: './clinica-lista.component.html',
  styleUrls: ['./clinica-lista.component.scss']
})
export class ClinicaListaComponent implements OnInit {

  clinicas: Clinica[];
  errorMessage: string;

  clinicaSelecionada: Clinica;

  searchForm: FormGroup
  nomeControl: FormControl
  emailControl: FormControl

  // Paginação
  totalElements = 0;
  page = 1;
  pageElement = 0;
  size = 10

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private clinicaService: ClinicaService,
    private fb: FormBuilder
  ) { }

  getRequestParams(pageElement, size) {
    // tslint:disable-next-line:prefer-const
    //console.log(this.nomeControl.value);
    let nome = this.nomeControl.value;
    let email = this.emailControl.value;
    let params = {};

    if (pageElement) {
      params[`page`] = pageElement;
    }

    if (size) {
      params[`size`] = size;
    }

    if (nome && (nome = nome.trim()) !== '') {
      params[`nome`] = nome;
    }

    if (email && (email = email.trim()) !== '') {
      params[`email`] = email;
    }

    return params;
  }

  ngOnInit(): void {
    this.nomeControl = this.fb.control('')
    this.emailControl = this.fb.control('')
    this.searchForm = this.fb.group({
      nomeControl: this.nomeControl,
      emailControl: this.emailControl
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

    this.clinicaService.listSearchPage(params)
      .subscribe(
        clinicas => {
          this.clinicas = clinicas.content
          this.totalElements = clinicas.totalElements
          this.pageElement = clinicas.number
          this.size = clinicas.size
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
    this.router.navigate(['/admin/clinicas/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/admin/clinicas/detalhe', id], { relativeTo: this.route });
  }

  onDelete(clinica) {
    this.clinicaSelecionada = clinica;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover essa Clinica?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.clinicaService.remove(clinica.id) : EMPTY,
        ),
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        // error => {
        //   this.alertService.showAlertDanger(
        //     'Erro ao remover curso. Tente novamente mais tarde.',
        //   );
        // },
      );
  }

}
