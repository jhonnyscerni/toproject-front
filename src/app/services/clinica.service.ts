import { Clinica } from './../models/clinica';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/services/crud-service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page/page';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Profissional} from "../models/profissional";

@Injectable({
  providedIn: 'root'
})
export class ClinicaService extends CrudService<Clinica> {

  private url: string = `${environment.apiUrl}/clinicas`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/clinicas`);
  }

  listSearchPage(params): Observable<Page<Clinica>> {
    //console.log(params)
    return this.http.get<Page<Clinica>>(this.url, { params })
      .pipe(
        catchError(super.serviceError));
  }

  saveUserCommon(record: Clinica) {
    return this.createUserCommon(record);
  }

  private createUserCommon(record: Clinica): Observable<Clinica> {
    return this.http
      .post(this.url + "/add-usuario-comum", record)
      .pipe(
        catchError(super.serviceError));
  }

  listSearchList(params): Observable<Clinica[]> {
    //console.log(params)
    return this.http.get<Clinica[]>(this.url + "/lista", { params })
      .pipe(
        catchError(super.serviceError));
  }
}
