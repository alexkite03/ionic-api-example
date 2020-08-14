import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cambio } from '../interfaces/cambio';

@Injectable({
  providedIn: 'root'
})
export class CambiosService {

  apiUrl = 'https://api.avpc.es';

  constructor(public http: HttpClient) {
  }

  getCambios() {
    const path = `${this.apiUrl}/cambios`;
    return this.http.get<Cambio[]>(path);
  }

  getCambio(id: string){
    const path = `${this.apiUrl}/cambio/${id}`;
    return this.http.get<Cambio>(path)
  }

  addCambio(cambio: Cambio) {
    const path = `${this.apiUrl}/crear`;
    return this.http.post(path, cambio);
  }

  updateCambio(cambio: Cambio){
    const path = `${this.apiUrl}/cambio/${cambio.id}`;
    return this.http.put<Cambio>(path, cambio);
  }

  deleteCambio(id: string){
    const path = `${this.apiUrl}/borrar/${id}`;
    return this.http.delete(path);
  }


}