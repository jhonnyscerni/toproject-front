import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Profissional } from '../models/profissional';
import { CrudService } from '../shared/services/crud-service';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page/page';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Paciente } from '../models/paciente';
import { CepConsulta } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends CrudService<Paciente> {

  private url: string = `${environment.apiUrl}/pacientes`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/pacientes`);
  }

  listSearchPage(params): Observable<Page<Paciente>> {
    //console.log(params)
    return this.http.get<Page<Paciente>>(this.url, { params })
      .pipe(
        catchError(super.serviceError));
  }

  listSearchList(params): Observable<Paciente[]> {
    //console.log(params)
    return this.http.get<Paciente[]>(this.url + "/lista", { params })
      .pipe(
        catchError(super.serviceError));
  }

}
