import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  alta: FormGroup;

  constructor(public fb: FormBuilder) {
    this.alta = this.fb.group({
      username: new FormControl ('', [Validators.required, Validators.minLength(3)]),
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

  signUp() {
    if (this.alta.valid) {
      console.log("Envio de Formulario!!");
      console.log(this.alta.value);
      
    } else {
      console.log("Invalido!!");
      
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

}
