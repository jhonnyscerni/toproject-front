import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';

@Injectable()
export class ContaGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService
        ){}
    
    canActivate() {
        if(this.auth.obterToken()){
            this.router.navigate(['/home']);
        }

        return true;
    }
    
}