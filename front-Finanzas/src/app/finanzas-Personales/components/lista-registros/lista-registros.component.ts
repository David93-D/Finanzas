import { transition, style, trigger, state, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegistro } from '../../interfaces/i-registro';
import { RegistrosService } from '../../services/registros.service';

// ANIMACIONES Y ESTADOS

const transicionEntrada = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({opacity: 1}))
]);

const transicionSalida = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-out', style({ opacity: 0 }))
]);

const entradaElemento = trigger('entradaElemento', [transicionEntrada]);
const salidaElemento = trigger('salidaElemento', [transicionSalida]);

// ANIMACIONES CON ESTADOS

// const fadeInOut = trigger('fadeInOut', [
//   state(
//     'open', 
//     style({
//       opacity: 1,
//     })
//   ),
//   state(
//     'close', 
//     style({
//       opacity: 0,
//     })
//   ),
//   transition('open => close', [animate('1s ease-out')]),
//   transition('close => open', [animate('1s ease-in')])
// ])

@Component({
  selector: 'lista-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.css'],
  animations: [entradaElemento, salidaElemento]
  //animations: [fadeInOut]
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
