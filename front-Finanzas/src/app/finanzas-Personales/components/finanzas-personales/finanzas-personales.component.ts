import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'finanzas-personales',
  templateUrl: './finanzas-personales.component.html',
  styleUrls: ['./finanzas-personales.component.css']
})
export class FinanzasPersonalesComponent implements OnInit {

  fecha = new Date();

  meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  conceptosGastos = ["-", "Alimentación", "Seguros", "Viajes", "Reparaciones", "Inmovilizado", "Telf/Internet", "Tributos/Impuestos", "Prestamos y créditos", "Reformas y mejoras", "Ropa y accesorios", "Educación y aprendizaje"];

  conceptosIngresos = ["-", "Sueldos y salarios", "Dividendos", "Venta valores/partic", "Donaciones/Herencias"];

  conceptos: string[] = [];

  mesNum = 0;

  mesActual = "";
  anyoActual = 0;

  tipo = "";

  isdisabled = true;

  constructor() { }

  ngOnInit(): void {
    this.anyoActual = this.fecha.getFullYear();
    this.mesNum = this.fecha.getMonth()+1;
    this.mesActual = this.meses[this.mesNum];
  }

  prevMonth() {
    console.log("Mes Anterior");
  }

  nextMonth() {
    console.log("Mes Siguiente");
  }

  addRegister() {
    console.log("Nuevo Registro");
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
