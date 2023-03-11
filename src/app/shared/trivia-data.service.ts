import { Injectable } from '@angular/core';
import { Temas } from '../interfaces/Temas';

@Injectable({
  providedIn: 'root'
})
export class TriviaDataService {
  temasSeleccionados: Temas[] = [];
  constructor() { }

  guardarTemasSeleccionados(temas: Temas[]) {
    this.temasSeleccionados = temas;
  }

  obtenerTemasSeleccionados(): Temas[] {
    return this.temasSeleccionados;
  }
}
