import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
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
  tipoUser:any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
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

  onDashboard() {
    this.tipoUser = this.authService.getGrupo();
    //console.log(this.tipoUser)
    if (this.tipoUser == 'Admin'){
          this.router.navigate(['/admin/dashboard'], { relativeTo: this.route });
    } else if (this.tipoUser == 'Clinic'){
      this.router.navigate(['/clinic/dashboard'], { relativeTo: this.route });
    }else if (this.tipoUser == 'User'){
      this.router.navigate(['/user/dashboard'], { relativeTo: this.route });
    } else if(this.tipoUser == 'Patient'){
      this.router.navigate(['/patient/dashboard'], { relativeTo: this.route });
    }
  }

  onProfile() {
    this.tipoUser = this.authService.getGrupo();
    //console.log(this.tipoUser)
    if (this.tipoUser == 'Admin'){
      this.router.navigate(['/admin/profile'], { relativeTo: this.route });
    } else if (this.tipoUser == 'Clinic'){
      this.router.navigate(['/clinic/profile'], { relativeTo: this.route });
    }else if (this.tipoUser == 'User'){
      this.router.navigate(['/user/profile'], { relativeTo: this.route });
    } else if(this.tipoUser == 'Patient'){
      this.router.navigate(['/patient/profile'], { relativeTo: this.route });
    }
  }
}



