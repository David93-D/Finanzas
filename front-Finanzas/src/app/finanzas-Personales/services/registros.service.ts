import { Injectable } from '@angular/core';
import { IRegistro } from '../interfaces/i-registro';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  url = '/api';

  constructor(private http : HttpClient) { }

  getRegistrosMes(date: any) {
    return this.http.post(this.url, date);
  }

  getRegistrosHistoricos() {
    return this.http.get(this.url + "/historico");
  }

  newRegistro(registro: IRegistro) {
    return this.http.post(this.url + "/add", registro);
  }

  delRegistro(id: string) {
    return this.http.delete(this.url + "/" + id);
  }

  getRegistro(id: string) {
    return this.http.get(this.url + "/" + id);
  }

  editRegistro(id: string, registroModificar: IRegistro) {
    return this.http.put(this.url + "/" + id, registroModificar);
  }

}