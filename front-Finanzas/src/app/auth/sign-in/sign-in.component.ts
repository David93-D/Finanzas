import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  login: FormGroup;

  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.login = this.fb.group({
      user: new FormControl ('', [Validators.required]),
      password: new FormControl ('', Validators.required)
    })
  }

  ngOnInit(): void {  
  }

  signIn() {
    if (this.login.valid) {
      
      this.authService.login(this.login.value.user, this.login.value.password).subscribe( (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['finanzas-personales']);
      });

      // Llamamos al servicio que hace la petición al servicio de login
      // Si la respuesta del servicio es vacia devolver mensaje de error y permanecer en login
      // Si existe guardar en localstorage el token devuelto y redirijia a la sección finanzaspersonales
      //console.log("Envio de Formulario!");
    }
  }

}
