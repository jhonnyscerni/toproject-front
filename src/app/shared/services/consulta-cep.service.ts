import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CepConsulta } from 'src/app/models/endereco';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http
        .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json`);
}

}
