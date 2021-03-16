import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/services/crud-service';
import {FormaPagamento} from "../models/forma-pagamento";

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService extends CrudService<FormaPagamento> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/formas-pagamento`);
  }

}
