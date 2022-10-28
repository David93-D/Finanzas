import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  login: FormGroup;

  constructor(public fb: FormBuilder) {
    this.login = this.fb.group({
      user: new FormControl ('', [Validators.required]),
      password: new FormControl ('', Validators.required)
    })
  }

  ngOnInit(): void {  
  }

  signIn() {
    if (this.login.valid) {
      console.log(this.login.value);
      
      // Llamamos al servicio que hace la petición al servicio de login
      // Si la respuesta del servicio es vacia devolver mensaje de error y permanecer en login
      // Si existe guardar en localstorage el token devuelto y redirijia a la sección finanzaspersonales
      console.log("Envio de Formulario!");
    }
  }

}
