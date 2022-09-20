import { Component, Input, OnInit } from '@angular/core';
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

  constructor(public registrosService: RegistrosService) { }

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

  listarRegistrosHistoricos() {
    this.registrosService.getRegistrosHistoricos().subscribe(
      res => {
        this.listRegistrosMes = <any>res;
      },
      err => console.log(err)      
    );
  }

}
