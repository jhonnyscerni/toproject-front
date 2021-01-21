import { AlertModalService } from './../../../shared/services/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap, take } from 'rxjs/operators';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss']
})
export class UsuarioListaComponent implements OnInit {

  usuarios: Usuario[];
  errorMessage: string;

  usuarioSelecionado: Usuario;

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
    private usuarioService: UsuarioService,
    private fb: FormBuilder) {
  }

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

  ngOnInit() {

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

    this.usuarioService.listSearchPage(params)
      .subscribe(
        usuarios => {
          this.usuarios = usuarios.content
          this.totalElements = usuarios.totalElements
          this.pageElement = usuarios.number
          this.size = usuarios.size
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
    this.router.navigate(['/admin/usuarios/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/admin/usuarios/detalhe', id], { relativeTo: this.route });
  }

  onDelete(usuario) {
    this.usuarioSelecionado = usuario;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover esse usuario?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.usuarioService.remove(usuario.id) : EMPTY,
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
