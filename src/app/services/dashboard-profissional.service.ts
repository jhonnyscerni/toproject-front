import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Consulta} from "../models/consulta";
import {catchError} from "rxjs/operators";
import {EstatisticaStatus} from "../models/dto/estatistica-status";
import {EstatisticaSexo} from "../models/dto/estatistica-sexo";

@Injectable({
  providedIn: 'root'
})
export class DashboardProfissionalService {


  private url: string = `${environment.apiUrl}/dashboard/profissional`;

  constructor(protected http: HttpClient) {
  }

  countConsultasFinalizadas(params): Observable<any> {
    return this.http.get<any>(this.url + "/countConsultasFinalizadas", {params});
  }

  countConsultasConfirmadas(params): Observable<any> {
    return this.http.get<any>(this.url + "/countConsultasConfirmadas", {params});
  }

  countConsultasAgendadas(params): Observable<any> {
    return this.http.get<any>(this.url + "/countConsultasAgendadas", {params});
  }

  countConsultasCanceladas(params): Observable<any> {
    return this.http.get<any>(this.url + "/countConsultasCanceladas", {params});
  }

  countPacientesCadastradosAtivado(params): Observable<any> {
    return this.http.get<any>(this.url + "/countPacientesCadastradosAtivado", {params});
  }

  consultaEstatisticaStatus(params): Observable<EstatisticaStatus[]> {
    //console.log(params)
    return this.http.get<EstatisticaStatus[]>(this.url + "/estatisticaStatus", { params });
  }

  consultaEstatisticaSexo(params): Observable<EstatisticaSexo[]> {
    //console.log(params)
    return this.http.get<EstatisticaSexo[]>(this.url + "/estatisticaSexo", { params });
  }
}
