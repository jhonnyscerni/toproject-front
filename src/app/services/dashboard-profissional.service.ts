import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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

  countPacientesCadastradosAtivado(params): Observable<any> {
    return this.http.get<any>(this.url + "/countPacientesCadastradosAtivado", {params});
  }
}
