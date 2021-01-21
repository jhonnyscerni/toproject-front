import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-clinica-paciente-lista',
  templateUrl: './clinica-paciente-lista.component.html',
  styleUrls: ['./clinica-paciente-lista.component.scss']
})
export class ClinicaPacienteListaComponent implements OnInit {

  pacientes: Paciente[];
  errorMessage: string;

  pacienteSelecionado: Paciente;

  searchForm: FormGroup
  nomeControl: FormControl
  emailControl: FormControl

  // Paginação
  totalElements = 0;
  page = 1;
  pageElement = 0;
  size = 10


  constructor(private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private pacienteService: PacienteService,
    private fb: FormBuilder,
    private authService: AuthService) { }

    usuarioId = this.authService.getUsuarioIdAutenticado();



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

    params[`clinicaId`] = this.usuarioId;

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

    this.pacienteService.listSearchPage(params)
      .subscribe(
        pacientes => {
          this.pacientes = pacientes.content
          this.totalElements = pacientes.totalElements
          this.pageElement = pacientes.number
          this.size = pacientes.size
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
    this.router.navigate(['/clinic/pacientes/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/clinic/pacientes/detalhe', id], { relativeTo: this.route });
  }

  onDelete(paciente) {
    this.pacienteSelecionado = paciente;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover esse paciente?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.pacienteService.remove(paciente.id) : EMPTY,
        ),
      )
      .subscribe(
        success => {
          this.onRefresh();
        }
      );
  }

}
