import { Injectable } from '@angular/core';
import { Profissional } from '../models/profissional';
import { CrudService } from '../shared/services/crud-service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page/page';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService extends CrudService<Profissional> {

  private url: string = `${environment.apiUrl}/profissionais`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/profissionais`);
  }

  listSearchPage(params): Observable<Page<Profissional>> {
    console.log(params)
    return this.http.get<Page<Profissional>>(this.url, { params })
      .pipe(
        catchError(super.serviceError));
  }

  saveUserCommon(record: Profissional) {
    return this.createUserCommon(record);
  }

  private createUserCommon(record: Profissional): Observable<Profissional> {
    return this.http
      .post(this.url + "/add-usuario-comum", record)
      .pipe(
        catchError(super.serviceError));
  }
}
