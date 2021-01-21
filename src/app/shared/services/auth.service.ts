import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { UsuarioRecuperarSenha } from 'src/app/models/dto/usuario-recuperar-senha';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  apiURL: string = environment.apiUrl + "/usuarios"
  apiURLRecuperarSenha: string = environment.apiUrl + "/recuperar-senha"
  tokenURL: string = environment.apiUrl + environment.obterTokenUrl
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  obterToken() {
    const tokenString = localStorage.getItem('access_token')
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    return of({ success: false });
  }

  getUsuarioAutenticado() {
    const token = this.obterToken();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario;
    }
    return null;
  }

  getUsuarioIdAutenticado() {
    const token = this.obterToken();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).usuario_id
      //console.log(usuario)
      return usuario;
    }
    return null;
  }

  getGrupo() {
    const token = this.obterToken();
    if (token) {
      const grupo = this.jwtHelper.decodeToken(token).tipo
      return grupo;
    }
    return null;
  }

  getAutorizacoes() {
    const token = this.obterToken();
    if (token) {
      const autorizacoes = this.jwtHelper.decodeToken(token).authorities
      //console.log("Autorizações: "+ autorizacoes)
      return autorizacoes;
    }
    return null;
  }

  // getGrupos() {

  //   const token = this.obterToken();
  //   if (token) {
  //     this.grupos = this.jwtHelper.decodeToken(token).grupos
  //     return this.grupos;
  //   }
  //   return null;
  // }

  // getGrupo(nome){
  //   return this.getGrupos().find(x => x.nome === nome);
  // }


  isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false;
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // console.log(params)
    // console.log(headers)

    return this.http.post(this.tokenURL, params.toString(), { headers });
  }

  recuperarLogin(record: UsuarioRecuperarSenha): Observable<UsuarioRecuperarSenha> {
    return this.http
      .post(this.apiURLRecuperarSenha, record)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }


}
