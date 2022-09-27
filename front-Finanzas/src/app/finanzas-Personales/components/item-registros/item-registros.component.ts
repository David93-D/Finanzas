import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRegistro } from '../../interfaces/i-registro';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'tr[item-registro]',
  templateUrl: './item-registros.component.html',
  styleUrls: ['./item-registros.component.css']
})
export class ItemRegistrosComponent implements OnInit {

  @Input() registro: any;

  @Output() registroEliminar = new EventEmitter<string>();
  @Output() registroEditar = new EventEmitter<string>();

  constructor(public registrosService: RegistrosService) { }

  ngOnInit(): void {
  }

  editRegister(id: string) {
    this.registroEditar.emit(id);
  }

  deleteRegister(id: string) {
    this.registroEliminar.emit(id);
  }

}
