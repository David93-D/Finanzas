import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {  }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data["expectedRole"];
    const token = localStorage.getItem("token")!;

    const { role } = this.jwtHelper.decodeToken(token);
    
    const permiso = expectedRole.includes(role);
    
    if ( !this.authService.isAuth() || !permiso) {
      console.log("Usuario no autorizado");
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
