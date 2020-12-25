import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Page } from '../models/page/page';
import { CrudService } from '../shared/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario> {

  private url: string = `${environment.apiUrl}/usuarios`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/usuarios`);
  }

  listSearchPage(params): Observable<Page<Usuario>> {
    console.log(params)
    return this.http.get<Page<Usuario>>(this.url, { params })
      .pipe(
        catchError(super.serviceError));
  }



  saveUserCommon(record: Usuario) {
    return this.createUserCommon(record);
  }


  private createUserCommon(record: Usuario): Observable<Usuario> {
    return this.http
      .post(this.url + "/add-usuario-comum", record)
      .pipe(
        catchError(super.serviceError));
  }

}
