import { AtendimentoService } from 'src/app/services/atendimento.service';
import { Consulta } from './../../../models/consulta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */
import { Atendimento } from 'src/app/models/atendimento';
Moment.locale('pt-br');

import { statusConsultaEnum } from '../../../models/enums/statusConsultaEnum';

@Component({
  selector: 'app-profissional-consulta-lista',
  templateUrl: './profissional-consulta-lista.component.html',
  styleUrls: ['./profissional-consulta-lista.component.scss']
})
export class ProfissionalConsultaListaComponent implements OnInit {

  consultas: Consulta[];
  errorMessage: string;

  consultaSelecionado: Consulta;
  statusConsultaEnum = statusConsultaEnum;
  keys = Object.keys;

  searchForm: FormGroup
  idControl: FormControl
  nomePacienteControl: FormControl
  dataInicioControl: FormControl
  dataFimControl: FormControl
  statusConsultaControl: FormControl

  // Paginação
  totalElements = 0;
  page = 1;
  pageElement = 0;
  size = 10
  atendimento: Atendimento


  constructor(private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private consultaService: ConsultaService,
    private atendimentoService: AtendimentoService,
    private fb: FormBuilder,
    private authService: AuthService) { }
    profissional = this.authService.getUsuarioIdAutenticado();

    getRequestParams(pageElement, size) {
      let id = this.idControl.value;
      let nomePacienteControl = this.nomePacienteControl.value;
      let dataInicioControl = this.dataInicioControl.value;
      let dataFimControl = this.dataFimControl.value;
      let statusConsultaControl = this.statusConsultaControl.value
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

      if (nomePacienteControl && (nomePacienteControl = nomePacienteControl.trim()) !== '') {
        params[`nomePaciente`] = nomePacienteControl;
      }
      if (dataInicioControl && dataInicioControl !== '') {
        params[`dataInicio`] = Moment(dataInicioControl).format('YYYY-MM-DDThh:mm:ssZ');
      }
      if (dataFimControl && dataFimControl !== '') {
        params[`dataFim`] = Moment(dataFimControl).format('YYYY-MM-DDThh:mm:ssZ');
      }

      if (statusConsultaControl && (statusConsultaControl = statusConsultaControl.trim()) !== '') {
        params[`statusConsultaEnum`] = statusConsultaControl;
      }

      params[`profissional`] = this.profissional;

      return params;
    }

    ngOnInit() {
      this.idControl = this.fb.control('')
      this.nomePacienteControl = this.fb.control('')
      this.dataInicioControl = this.fb.control('')
      this.dataFimControl = this.fb.control('')
      this.statusConsultaControl = this.fb.control('')

      this.searchForm = this.fb.group({
        idControl: this.idControl,
        nomePacienteControl: this.nomePacienteControl,
        dataInicioControl: this.dataInicioControl,
        dataFimControl: this.dataFimControl,
        statusConsultaControl: this.statusConsultaControl
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

      this.consultaService.listSearchPage(params)
        .subscribe(
          consultas => {
            this.consultas = consultas.content
            this.totalElements = consultas.totalElements
            this.pageElement = consultas.number
            this.size = consultas.size
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
      this.router.navigate(['/user/consultas/editar', id], { relativeTo: this.route });
    }

    onDetalhe(id) {
      this.router.navigate(['/user/consultas/detalhe', id], { relativeTo: this.route });
    }


    onAtendimento(id) {
      this.router.navigate(['/user/consultas/', id, 'atendimento'], { relativeTo: this.route });
    }

    onDelete(consulta) {
      this.consultaSelecionado = consulta;
      const result$ = this.alertService.showConfirm(
        'Confirmacao',
        'Tem certeza que deseja remover essa consulta?',
      );
      result$
        .asObservable()
        .pipe(
          take(1),
          switchMap(result =>
            result ? this.consultaService.remove(consulta.id) : EMPTY,
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
