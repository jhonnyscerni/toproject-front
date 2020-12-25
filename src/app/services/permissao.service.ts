import { environment } from './../../environments/environment';
import { Permissao } from './../models/permissao';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends CrudService<Permissao> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/permissoes`);
  }

}
