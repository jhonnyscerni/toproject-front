import {AuthoritiesGuard} from './../../shared/services/authorities.guard';
import {Routes} from '@angular/router';
import {ProfissionalLancamentoListaComponent} from "./profissional-lancamento-lista/profissional-lancamento-lista.component";
import {ProfissionalLancamentoFormComponent} from "./profissional-lancamento-form/profissional-lancamento-form.component";


export const profissionalLancamentosRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: ProfissionalLancamentoFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_LANCAMENTOS']
      },
      {
        path: "editar/:idLancamento", component: ProfissionalLancamentoFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_LANCAMENTOS']
      },
      {
        path: "detalhe/:idLancamento", component: ProfissionalLancamentoFormComponent
      },
      {
        path: "lista", component: ProfissionalLancamentoListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_LANCAMENTOS']
      },
      {path: "", redirectTo: '/user/lancamentos/lista', pathMatch: 'full'}
    ]
  }
];
