import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: any | undefined;

  modificarUser: FormGroup;

  modificaciones: any = {
    user: '',
    nombre: '',
    apellidos: '',
    email: ''
  }

  constructor(private jwtHelper: JwtHelperService, public fb: FormBuilder, public authService: AuthService, private router: Router) {
    this.modificarUser = this.fb.group({
      user:  new FormControl ('', [Validators.required, Validators.minLength(3)]),
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token")!;
    if (token) {
      const { id, user, nombre, apellidos, email, role } = this.jwtHelper.decodeToken(token);
      this.usuario = { id, user,  nombre, apellidos, email, role};
    }
  }

  updateUser() {
    if (this.modificarUser.valid) {

      this.modificaciones.user = this.modificarUser.value.user;
      this.modificaciones.nombre = this.modificarUser.value.nombre;
      this.modificaciones.apellidos = this.modificarUser.value.apellidos;
      this.modificaciones.email = this.modificarUser.value.email;

      this.authService.updateUser( this.usuario.id, this.modificaciones ).subscribe();
      alert("Se han actualizado sus datos correctamente, porfavor reinicie la sesión!");

      localStorage.removeItem("token");
      this.router.navigate(['signIn']);
    }
  }

}
