 import { HttpClient } from '@angular/common/http';
 import { Injectable } from '@angular/core';
 import { forkJoin, map, Observable, switchMap } from 'rxjs';
 import { Disciplina } from 'src/app/interfaces/Disciplina';
import { Materia } from 'src/app/interfaces/Materia';
import { Pregunta } from 'src/app/interfaces/Pregunta';
import { PreguntaConRespuestas } from 'src/app/interfaces/PreguntaConRespuesta';
import { PreguntaRespuesta } from 'src/app/interfaces/PreguntaRespuesta';
import { Temas } from 'src/app/interfaces/Temas';

 @Injectable({
   providedIn: 'root'
 })
 export class DisciplinaService {
  materias$: Observable<Materia[]> = new Observable<Materia[]>();
  temas$: Observable<Temas[]> = new Observable<Temas[]>();
  preguntas$: Observable<Pregunta[]> = new Observable<Pregunta[]>()
  URL = "https://examtrivia-app-back-production-4732.up.railway.app/examtrivia-app-back-production-4732.up.railway.app/api/v1/home";
  TRIVIA = "https://examtrivia-app-back-production-4732.up.railway.app/api/v1"
  constructor(private http: HttpClient) {
  }
  getAllDisciplinas(): Observable<Disciplina[]> {
     return this.http.get<Disciplina[]>(`${this.URL}/disciplinas`);
   }
    getMateriasByDisciplinaId(id: number): Observable<Materia[]>{
    return this.materias$ = this.http.get<Materia[]>(`${this.URL}/disciplinas/${id}/materias`);
   }
    getTemasByMateriaId(id:number): Observable<Temas[]>{
     return this.temas$ = this.http.get<Temas[]>(`${this.URL}/materias/${id}/temas`)
    }
    getPreguntasByTemas(ids: number[], startIndex: number): Observable<Pregunta[]> {
      const temasIds = ids.join(',');
      return this.http.get<Pregunta[]>(`${this.TRIVIA}/temas/${temasIds}/preguntas?startIndex=${startIndex}`);
    }
    getRespuestasByPregunta(ids:number[]): Observable<PreguntaRespuesta[]> {
      const preguntaIds = ids.join(',');
      return this.http.get<PreguntaRespuesta[]>(`${this.TRIVIA}/pregunta/${preguntaIds}/respuestas`);
    }
    getPreguntasConRespuestas(temas: Temas[], startIndex: number = 0): Observable<PreguntaConRespuestas[]> {
      const temaIds = temas.map(tema => tema.id);
      const preguntasObs = this.getPreguntasByTemas(temaIds,startIndex);
      const respuestasObs = preguntasObs.pipe(
        map(preguntas => preguntas.map(pregunta => pregunta.id)),
        switchMap(preguntaIds => this.getRespuestasByPregunta(preguntaIds))
      );
      return forkJoin([preguntasObs, respuestasObs]).pipe(
        map(([preguntas, respuestas]) => {
          return preguntas.map(pregunta => {
            const respuestasPregunta = respuestas.filter(respuesta => respuesta.pregunta.id === pregunta.id);
            return {
              pregunta,
              respuestas: respuestasPregunta
            };
          })
        })
      );
    }
}

