import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegistro } from '../../interfaces/i-registro';
import { RegistrosService } from '../../services/registros.service';
import { MesesDelAnyo } from 'src/app/enums/enum';

@Component({
  selector: 'finanzas-personales',
  templateUrl: './finanzas-personales.component.html',
  styleUrls: ['./finanzas-personales.component.css'],
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

  totalMes: any = 0;

  constructor(public fb: FormBuilder, public registrosService: RegistrosService, private router: Router) {
    this.formulario = this.fb.group({
      concepto: new FormControl ('', [Validators.required]),
      detalle: new FormControl ('', [Validators.required]),
      cantidad: new FormControl ('', [Validators.required]),
      tipo: new FormControl ('', [Validators.required]),
  });
  }

  ngOnInit(): void {
    this.modificarFecha("Inicio");
  }

  prevMonth() {
    this.modificarFecha("Atras");
  }

  nextMonth() {
    this.modificarFecha("Adelante");
  }

  modificarFecha(accion: string) {
    switch (accion) {
      case "Inicio":
        this.anyoActual = this.fecha.getFullYear();
        this.mesNum = this.fecha.getMonth()+1;
        this.diaActual =  this.fecha.getDate();
        break;
      case "Atras":
        this.mesNum = this.mesNum-1;
        if (this.mesNum == 0) {
          this.mesNum = 12;
          this.mesActual = MesesDelAnyo[this.mesNum];
          this.anyoActual = this.anyoActual-1;
        }
        break;
      case "Adelante":
        this.mesNum = this.mesNum+1;
        if (this.mesNum == 13) {
          this.mesNum = 1;
          this.mesActual = MesesDelAnyo[this.mesNum];
          this.anyoActual = this.anyoActual+1;
        }
        break;
      default:
        break;
    }
    this.date.anyo = this.anyoActual;
    this.date.mes = this.mesNum;
    this.mesActual = MesesDelAnyo[this.mesNum];
    this.date.anyo = this.anyoActual;
    this.date.mes = this.mesNum;
    this.listarRegistros();
  }


  listarRegistros() {
    this.registrosService.getRegistrosMes(this.date).subscribe(
      res => {
        this.listRegistrosMes = <any>res;
        let gastos = Object.values(res).filter(function (e) { return e.tipo == "Gasto" }).reduce(function (previous, current) { return previous - current.cantidad }, 0);
        let ingresos = Object.values(res).filter(function (e) { return e.tipo == "Ingreso" }).reduce(function (previous, current) { return previous + current.cantidad }, 0);
        this.totalMes = ingresos + gastos;
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

      // Eliminamos el contenido del objeto para que no hayan datos al volver a abrir el modal
      this.formulario.reset();

    } else {
      alert("Datos incompletos!!!");
    }
  }

  eliminar(id: string) {
    this.registrosService.delRegistro(id).subscribe(
      res => {
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
