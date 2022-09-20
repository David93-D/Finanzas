import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tr[item-registro]',
  templateUrl: './item-registros.component.html',
  styleUrls: ['./item-registros.component.css']
})
export class ItemRegistrosComponent implements OnInit {

  @Input() registro: any;

  constructor() { }

  ngOnInit(): void {
  }

  editRegister() {
    console.log("Editar Registro");
    
  }

  deleteRegister() {
    console.log("Eliminar Registro");
  }

}
