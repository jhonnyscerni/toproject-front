import {Injectable} from '@angular/core';
import {Profissional} from '../models/profissional';
import {CrudService} from '../shared/services/crud-service';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Page} from '../models/page/page';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService extends CrudService<Profissional> {

  private url: string = `${environment.apiUrl}/profissionais`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/profissionais`);
  }

  listSearchPage(params): Observable<Page<Profissional>> {
    //console.log(params)
    return this.http.get<Page<Profissional>>(this.url, {params})
      .pipe(
        catchError(super.serviceError));
  }

  listSearchList(params): Observable<Profissional[]> {
    //console.log(params)
    return this.http.get<Profissional[]>(this.url + "/lista", {params})
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

  saveComFoto(record: any, id: any) {
    //console.log("receord------>" + id);
    if (id) {
      //console.log('update!')
      return this.updateComFoto(record, id);
    }
    //console.log('create!')
    return this.createComFoto(record);
  }

  createComFoto(record: any): Observable<any> {

    return this.http
      .post(this.url, record)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  updateComFoto(record: any, id: any): Observable<any> {
    return this.http
      .put(`${this.url}/${id}`, record)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }
}
