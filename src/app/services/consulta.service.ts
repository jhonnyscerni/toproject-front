import { Consulta } from './../models/consulta';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/services/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page/page';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService extends CrudService<Consulta> {

  private url: string = `${environment.apiUrl}/consultas`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/consultas`);
  }

  listSearchPage(params): Observable<Page<Consulta>> {
    console.log(params)
    return this.http.get<Page<Consulta>>(this.url, { params })
      .pipe(
        catchError(super.serviceError));
  }

}
