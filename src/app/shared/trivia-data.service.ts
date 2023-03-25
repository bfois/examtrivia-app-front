import { Injectable } from '@angular/core';
import { RespuestaUsuario } from '../interfaces/RespuestaUsuario';
import { Temas } from '../interfaces/Temas';
import { DisciplinaService } from '../pages/home/service/disciplina.service';

@Injectable({
  providedIn: 'root'
})
export class TriviaDataService {
  temasSeleccionados: Temas[] = [];
  private resultados: RespuestaUsuario[] = [];

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

  guardarResultados(resultados: RespuestaUsuario[]): void {
    this.resultados = resultados;
    localStorage.setItem('resultados', JSON.stringify(this.resultados));
  }
  getResultados(): RespuestaUsuario[] {
    return this.resultados;
  }
}
