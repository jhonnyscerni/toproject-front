import { GrupoService } from './../../../services/grupo.service';
import { AlertModalService } from './../../../shared/services/alert-modal.service';
import { Grupo } from './../../../models/grupo';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-grupo-lista',
  templateUrl: './grupo-lista.component.html',
  styleUrls: ['./grupo-lista.component.scss']
})
export class GrupoListaComponent implements OnInit {

  grupos: Grupo[];
  errorMessage: string; 

  grupoSelecionado: Grupo;
  page:number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private grupoService: GrupoService
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.grupoService.list()
    .subscribe(
      grupos => this.grupos = grupos,
      error => this.errorMessage
    );
  }

  onEdit(id) {
    this.router.navigate(['/admin/grupos/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/admin/grupos/detalhe', id], { relativeTo: this.route });
  }


  onDelete(grupo) {
    this.grupoSelecionado = grupo;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover esse grupo?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.grupoService.remove(grupo.id) : EMPTY,
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

