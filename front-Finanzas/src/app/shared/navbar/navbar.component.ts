import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: string = "";

  constructor(
    private jwtHelper: JwtHelperService, 
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {  
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

}
