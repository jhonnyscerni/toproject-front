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
export class DashboardClinicaService {


  private url: string = `${environment.apiUrl}/dashboard/clinica`;

  constructor(protected http: HttpClient) {
  }

  countPacientesAtivo(params): Observable<any> {
    return this.http.get<any>(this.url + "/countPacientesAtivo", {params});
  }

  countProfissionaisAtivo(params): Observable<any> {
    return this.http.get<any>(this.url + "/countProfissionaisAtivo", {params});
  }

  countConsultasTotais(params): Observable<any> {
    return this.http.get<any>(this.url + "/countConsultasTotais", {params});
  }

  countConsultasFinalizadas(params): Observable<any> {
    return this.http.get<any>(this.url + "/countConsultasFinalizadas", {params});
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
