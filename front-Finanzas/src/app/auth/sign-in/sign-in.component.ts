import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  login: FormGroup;

  constructor(public fb: FormBuilder, private jwtHelper: JwtHelperService, private authService: AuthService, private router: Router) {
    this.login = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {  
  }

  signIn() {
    if (this.login.valid) {
      this.authService.login(this.login.value.user, this.login.value.password).subscribe( 
        (res: any) => { 
          switch (res.status) {
            case true:
              this.inicioSesion(res);
              this.router.navigate(['finanzas-personales']);
              break;
            case false:
              alert("Contraseña no valida!!!");  
              break;
            case null:
              alert("El usuario no existe!!!");    
              break;
            default:
              break;
          }
        }
      );
    } else {
      alert("Introduzca usuario y contraseña");
    }
  }

  inicioSesion(respuesta: any) {
    localStorage.setItem('token', respuesta.token);
    const token = localStorage.getItem("token")!;
    const { user } = this.jwtHelper.decodeToken(token);       
    this.authService.setMostrar(user); 
  }


}
