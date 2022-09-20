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

  newRegistro() {
    
  }


}