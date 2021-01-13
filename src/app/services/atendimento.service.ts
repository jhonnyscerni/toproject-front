import { Atendimento } from './../models/atendimento';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/services/crud-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page/page';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService extends CrudService<AtendimentoService> {

  private url: string = `${environment.apiUrl}/atendimentos`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/atendimentos`);
  }

  listSearchPage(params): Observable<Page<Atendimento>> {
    console.log(params)
    return this.http.get<Page<Atendimento>>(this.url, { params })
      .pipe(
        catchError(super.serviceError));
  }

  atender(record: Atendimento, idConsulta: number) {
    return this.atenderConsulta(record, idConsulta);
  }

  atenderConsulta(record: Atendimento, idConsulta: number): Observable<Atendimento> {
    return this.http
      .post(environment.apiUrl + "/consultas/"+ idConsulta + '/atendimentos', record)
      .pipe(
        catchError(super.serviceError));
  }

  verificarAtendimento(idConsulta): Observable<Atendimento> {
    return this.http
      .get<Atendimento>(environment.apiUrl + "/consultas/"+ idConsulta + '/atendimentos')
      .pipe(
        catchError(super.serviceError));
  }

}
