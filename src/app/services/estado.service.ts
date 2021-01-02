import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Estado } from '../models/estado';
import { CrudService } from '../shared/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService extends CrudService<Estado> {

  private url: string = `${environment.apiUrl}/estados`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/estados`);
  }

  loadBySigla(sigla): Observable<Estado> {
    return this.http.get<Estado>(`${this.url}/sigla/${sigla}`)
      .pipe(
        catchError(super.serviceError));
  }


}
