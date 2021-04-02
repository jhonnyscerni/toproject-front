import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/services/crud-service';
import {Lancamento} from "../models/lancamento";
import {Observable} from "rxjs";
import {Page} from "../models/page/page";
import {Consulta} from "../models/consulta";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends CrudService<Lancamento> {

  private url: string = `${environment.apiUrl}/lancamentos`;

  private urlLancamentoConsulta: string = `${environment.apiUrl}/lancamentos-consulta`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/lancamentos`);
  }

  listSearchPage(params): Observable<Page<Lancamento>> {
    //console.log(params)
    return this.http.get<Page<Lancamento>>(this.url, { params })
      .pipe(
        catchError(super.serviceError));
  }

  loadByIdConsulta(idConsulta): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.urlLancamentoConsulta}/${idConsulta}`)
      .pipe(
        catchError(super.serviceError));
  }

}
