import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegistro } from '../../interfaces/i-registro';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'lista-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.css']
})
export class ListaRegistrosComponent implements OnInit {

  conceptos = [ "DIA", "CONCEPTO", "DETALLE", "€", "TIPO", "-"];

  listRegistrosMes: IRegistro[] = [];

  @Input() anyo: any;
  @Input() mes: any;

  date: any = {
    anyo: 0,
    mes: 0
  }

  formulario: FormGroup;

  constructor(public fb: FormBuilder, public registrosService: RegistrosService, private router: Router) {
    this.formulario = this.fb.group({
      concepto: new FormControl ('', [Validators.required]),
      detalle: new FormControl ('', [Validators.required]),
      cantidad: new FormControl ('', [Validators.required]),
      tipo: new FormControl ('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.date.anyo = this.anyo;
    this.date.mes = this.mes;
    this.listarRegistros();
  }

  listarRegistros() {
    this.registrosService.getRegistrosMes(this.date).subscribe(
      res => {
        this.listRegistrosMes = <any>res;
      },
      err => console.log(err)      
    );
  }

  deleteRegister(id: string) {
    this.registrosService.delRegistro(id).subscribe(
      res => {
        console.log("Registro eliminado");
        this.listarRegistros();
      },
      err => console.log(err)
    )
  }

  editRegister(id: string) {
    this.router.navigate(['/edit-registros/' + id]);
  }

  listarRegistrosHistoricos() {
    this.registrosService.getRegistrosHistoricos().subscribe(
      res => {
        this.listRegistrosMes = <any>res;
      },
      err => console.log(err)      
    );
  }

}
