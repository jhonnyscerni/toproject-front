import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: "app-presentation",
  templateUrl: "./presentation.component.html",
  styleUrls: ["./presentation.component.scss"]
})
export class PresentationComponent implements OnInit {
  test: Date = new Date();
  isCollapsed = true;
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  usuarioLogado(): boolean {
    this.user = this.authService.getUsuarioAutenticado()
    return this.authService.isAuthenticated()
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/home'])
  }
}



