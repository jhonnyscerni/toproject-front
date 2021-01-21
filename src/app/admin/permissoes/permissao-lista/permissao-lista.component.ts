import { PermissaoService } from './../../../services/permissao.service';
import { AlertModalService } from './../../../shared/services/alert-modal.service';
import { Permissao } from './../../../models/permissao';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-permissao-lista',
  templateUrl: './permissao-lista.component.html',
  styleUrls: ['./permissao-lista.component.scss']
})
export class PermissaoListaComponent implements OnInit {

  permissoes: Permissao[];
  errorMessage: string;

  permissaoSelecionado: Permissao;

  page:number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private permissaoService: PermissaoService
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.permissaoService.list()
    .subscribe(
      permissoes => {
        //console.log(permissoes)
        this.permissoes = permissoes
      },
      error => this.errorMessage
    );
  }

  onEdit(id) {
    this.router.navigate(['/admin/permissoes/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/admin/permissoes/detalhe', id], { relativeTo: this.route });
  }

  onDelete(permissao) {
    this.permissaoSelecionado = permissao;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover esse grupo?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.permissaoService.remove(permissao.id) : EMPTY,
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
