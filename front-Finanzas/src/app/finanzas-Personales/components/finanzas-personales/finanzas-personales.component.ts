import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegistro } from '../../interfaces/i-registro';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'finanzas-personales',
  templateUrl: './finanzas-personales.component.html',
  styleUrls: ['./finanzas-personales.component.css']
})
export class FinanzasPersonalesComponent implements OnInit {
  
  formulario: FormGroup;

  newRegistro: IRegistro = {
    anyo: 0,
    mes: 0,
    dia: 0, 
    concepto: "", 
    detalle: "",
    cantidad: 0,
    tipo: ""
  };

  fecha = new Date();

  meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  conceptosGastos = ["-", "Alimentación", "Seguros", "Viajes", "Reparaciones", "Inmovilizado", "Telf/Internet", "Tributos/Impuestos", "Prestamos y créditos", "Reformas y mejoras", "Ropa y accesorios", "Educación y aprendizaje"];

  conceptosIngresos = ["-", "Sueldos y salarios", "Dividendos", "Venta valores/partic", "Donaciones/Herencias"];

  conceptos: string[] = [];

  mesNum = 0;

  mesActual = "";
  anyoActual = 0;
  diaActual = 0;

  tipo = "";

  isdisabled = true;

  date: any = {
    anyo: 0,
    mes: 0
  }

  listRegistrosMes: IRegistro[] = [];

  // RDelete = "";
  // REdit = "";

  constructor(public fb: FormBuilder, public registrosService: RegistrosService, private router: Router) {
    this.formulario = this.fb.group({
      concepto: new FormControl ('', [Validators.required]),
      detalle: new FormControl ('', [Validators.required]),
      cantidad: new FormControl ('', [Validators.required]),
      tipo: new FormControl ('', [Validators.required]),
  });
  }

  ngOnInit(): void {
    this.anyoActual = this.fecha.getFullYear();
    this.mesNum = this.fecha.getMonth()+1;
    this.mesActual = this.meses[this.mesNum];
    this.diaActual =  this.fecha.getDate();

    this.date.anyo = this.anyoActual;
    this.date.mes = this.mesNum;

    this.listarRegistros();    
  }

  prevMonth() {
    console.log("Mes Anterior");
  }

  nextMonth() {
    console.log("Mes Siguiente");
  }

  listarRegistros() {
    this.registrosService.getRegistrosMes(this.date).subscribe(
      res => {
        this.listRegistrosMes = <any>res;
      },
      err => console.log(err)      
    );
  }


  addRegister() {    
    if (this.formulario.valid) {
      this.newRegistro = {
        anyo: this.anyoActual, 
        mes: this.mesNum,
        dia: this.diaActual,
        concepto: this.formulario.value.concepto, 
        detalle: this.formulario.value.detalle,
        cantidad: this.formulario.value.cantidad,
        tipo: this.formulario.value.tipo
      }
      
      this.registrosService.newRegistro(this.newRegistro).subscribe();
      this.listarRegistros();
    } else {
      alert("Datos incompletos!!!");
    }
  }

  eliminar(id: string) {
    this.registrosService.delRegistro(id).subscribe(
      res => {
        console.log("Registro eliminado");
        this.listarRegistros();
      },
      err => console.log(err)
    )
  }

  tipoSeleccionado(value:string) {
    this.tipo = value;
    switch (this.tipo) {
      case "":
        this.isdisabled = true;
          break;
      case "Gasto":        
        this.isdisabled = false;
        this.conceptos = this.conceptosGastos;
          break;
      case "Ingreso":
        this.isdisabled = false;
        this.conceptos = this.conceptosIngresos;
          break;
      default:
        break;
    }
  }

}
