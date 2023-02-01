import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() listaRegistros: IRegistro[] = [];
  @Input() totalMes: number = 0;

  @Output() idEliminar = new EventEmitter<string>();
  @Output() idEditar = new EventEmitter<string>();

  date: any = {
    anyo: 0,
    mes: 0
  }

  formulario: FormGroup;

  idElim: string = "";
  idEdit: string = "";

  constructor(public fb: FormBuilder, public registrosService: RegistrosService, private router: Router) {
    this.formulario = this.fb.group({
      concepto: new FormControl ('', [Validators.required]),
      detalle: new FormControl ('', [Validators.required]),
      cantidad: new FormControl ('', [Validators.required]),
      tipo: new FormControl ('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    
  }

  deleteRegister(id: string) {
    this.idEliminar.emit(id);
  }

}
