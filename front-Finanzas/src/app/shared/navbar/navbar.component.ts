import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: string = "";

  constructor(
    private jwtHelper: JwtHelperService, 
    private authService: AuthService,
    public translate: TranslateService
  ) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {  
    const token = localStorage.getItem("token")!;
    if (token) {
      const { user } = this.jwtHelper.decodeToken(token);  
      this.authService.setMostrar(user);
    }
    this.getUser();
  }

  logout() {
    this.authService.logOut();
    this.authService.setMostrar(""); 
    this.usuario = "";
  }

  getUser() {
    this.authService.usuario.subscribe(
      user => {
        this.usuario = user;
      }
    )
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
