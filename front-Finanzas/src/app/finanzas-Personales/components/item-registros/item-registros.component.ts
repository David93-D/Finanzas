import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public registrosService: RegistrosService, private router: Router) { }

  ngOnInit(): void {
  }

  editRegister(id: string) {
    this.router.navigate(['/edit-registros/' + id]);
  }

  deleteRegister(id: string) {
    if (confirm('¿Seguro que desea eliminar registro?')) {
      this.registroEliminar.emit(id);
    }
  }

}
