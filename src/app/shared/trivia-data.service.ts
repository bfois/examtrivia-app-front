import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, mergeMap, Observable, of, toArray } from 'rxjs';
import { Pregunta } from '../interfaces/Pregunta';
import { PreguntaRespuesta } from '../interfaces/PreguntaRespuesta';
import { Respuesta } from '../interfaces/Respuesta';
import { Temas } from '../interfaces/Temas';
import { DisciplinaService } from '../pages/home/service/disciplina.service';

@Injectable({
  providedIn: 'root'
})
export class TriviaDataService {
  temasSeleccionados: Temas[] = [];
  private resultados: {pregunta: Pregunta, respuesta: Respuesta, esCorrecta: boolean}[] = [];

  constructor(private disciplinaService: DisciplinaService) {
    const resultadosGuardados = localStorage.getItem('resultados');
    if (resultadosGuardados) {
      this.resultados = JSON.parse(resultadosGuardados); }
   }

  guardarTemasSeleccionados(temas: Temas[]) {
    this.temasSeleccionados = temas;
  }

  obtenerTemasSeleccionados(): Temas[] {
    return this.temasSeleccionados;
  }

  guardarResultados(resultados: {pregunta: Pregunta, respuesta: Respuesta, esCorrecta: boolean}[]): void {
    this.resultados = resultados;
    localStorage.setItem('resultados', JSON.stringify(this.resultados));
  }
  getResultados(): {pregunta: Pregunta, respuesta: Respuesta, esCorrecta: boolean}[] {
    return this.resultados;
  }
}
