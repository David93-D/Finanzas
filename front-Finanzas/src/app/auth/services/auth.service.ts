import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/i-user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = '/api';

  constructor(
    private http : HttpClient,
    private jwtHelper: JwtHelperService) { }

  // npm install --save @auth0/angular-jwt
  // Importación en app.module.ts

  isAuth() {
    const token = localStorage.getItem("token")!;
    if ( this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    } 
    return true;
  }

  login( user: String, password: String) {
    return this.http.post(this.url + '/login', { user, password });
  }

  newUser(user: IUser) {
    return this.http.post(this.url + '/registroUsuarios', user);
  }

  existUser( email: String, user: String ) {
    return this.http.post(this.url + '/existUser', { email, user });
  }

}