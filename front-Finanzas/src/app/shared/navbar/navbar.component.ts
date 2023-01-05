import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombreUsuario: any | undefined;

  constructor(private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token")!;
    if (token) {
      const { user } = this.jwtHelper.decodeToken(token);
      this.nombreUsuario = user;
    }
  }

}
