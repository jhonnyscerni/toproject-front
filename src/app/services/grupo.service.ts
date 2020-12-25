import { environment } from './../../environments/environment';
import { Grupo } from './../models/grupo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService extends CrudService<Grupo> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/grupos`);
  }

}
