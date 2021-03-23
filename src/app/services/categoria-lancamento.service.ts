import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/services/crud-service';
import {CategoriaLancamento} from "../models/categoria-lancamento";

@Injectable({
  providedIn: 'root'
})
export class CategoriaLancamentoService extends CrudService<CategoriaLancamento> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/categoria-lancamento`);
  }

}
