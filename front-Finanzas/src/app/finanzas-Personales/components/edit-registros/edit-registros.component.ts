import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IRegistro } from '../../interfaces/i-registro';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'edit-registros',
  templateUrl: './edit-registros.component.html',
  styleUrls: ['./edit-registros.component.css']
})
export class EditRegistrosComponent implements OnInit {

  registro: IRegistro = {
    anyo: 0,
    mes: 0,
    dia: 0,
    concepto: '',
    detalle: '',
    cantidad: 0,
    tipo: ''
  }

  id: string = '';

  constructor(public registrosService: RegistrosService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    
    if (this.id) {
      this.registrosService.getRegistro(this.id).subscribe(
        res => {
          Object.values(res).map(reg => 
            this.registro = reg
          )
        },
        err => console.log(err)
      );
    }
  }

  modificar() {
    this.registrosService.editRegistro(this.id, this.registro).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
    this.router.navigate(['/finanzas-personales']);
  }

  volver() {
    this.router.navigate(['/finanzas-personales']);
  }


}