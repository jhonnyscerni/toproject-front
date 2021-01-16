import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';import { AuthService } from './auth.service';
;

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      let authorities = this.authService.getAutorizacoes();

      let authorized: any = next.data[0];
      //console.log(authorized)

      if (authorized !== undefined) {
        if(!authorities){
          this.navegarAcessoNegado();
        }

        let userAuthorities = authorities.find(x => x === authorized);
                
        if(!userAuthorities){
            this.navegarAcessoNegado();
        }
        console.log("userAuthorities" + userAuthorities)
      }

      return true
  }

  
  private navegarAcessoNegado() {
    this.router.navigate(['/painel/acesso-negado']);
}  
  
}