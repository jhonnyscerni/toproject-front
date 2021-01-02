import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cidade } from '../models/cidade';
import { CrudService } from '../shared/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class CidadeService extends CrudService<Cidade> {

  private url: string = `${environment.apiUrl}/cidades`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/cidades`);
  }

  loadByNomeESiglaEstado(nome, sigla): Observable<Cidade> {
    return this.http.get<Cidade>(`${this.url}/nome/${nome}/sigla/${sigla}`)
      .pipe(
        catchError(super.serviceError));
  }

  loadByEstadoId(estadoId): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.url}/estado/${estadoId}`)
      .pipe(
        catchError(super.serviceError));
  }
}
