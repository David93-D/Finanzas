import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  alta: FormGroup;

  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.alta = this.fb.group({
      user: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', Validators.required),
      repPassword: new FormControl ('', Validators.required)
    },
    {
      validators: this.mustmatch('password', 'repPassword')
    });
  }

  ngOnInit(): void {
  }

  async signUp() {
    if (this.alta.valid) {
      this.authService.existUser(this.alta.value.email, this.alta.value.username).subscribe( // Comprobar ya existe el usuario
        res => { 
          if (Object.values(res)[0]) { // Alta de usuario
            this.authService.newUser(this.alta.value).subscribe();
            alert("Se ha creado el usuario exitosamente!");
          } else {
            alert("Ya existe un Usuario con el mismo nombre de usuario o email");
          }
        },
        err => console.log(err)
      );      
    } else {
      alert("Usuario No Valido!!");
    }
  }

  mustmatch(password: any, repPassword: any) {

    return (formGroup: FormGroup) => {

      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[repPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['MustMatch']) {
        return;
      }
      
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustmatch: true })
      } else {
        confirmPasswordControl.setErrors(null);
      }

    }

  }

  canExit() {
    if (this.alta.value) {
      return confirm("Ha realizado cambios en el formulario. ¿Desea salir?");
    } else {
      return true;
    }
  }

}
