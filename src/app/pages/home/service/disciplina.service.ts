 import { HttpClient } from '@angular/common/http';
 import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
 import { Disciplina } from 'src/app/interfaces/Disciplina';
import { Materia } from 'src/app/interfaces/Materia';
import { Pregunta } from 'src/app/interfaces/Pregunta';
import { Temas } from 'src/app/interfaces/Temas';

 @Injectable({
   providedIn: 'root'
 })
 export class DisciplinaService {
  materias$: Observable<Materia[]> = new Observable<Materia[]>();
  temas$: Observable<Temas[]> = new Observable<Temas[]>();
  preguntas$: Observable<Pregunta[]> = new Observable<Pregunta[]>()
  URL = "http://localhost:8080/api/v1/home";
  TRIVIA = "http://localhost:8080/api/v1"
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

    getPreguntasByTemas(id:number): Observable<Pregunta[]> {
      return this.http.get<Pregunta[]>(`${this.TRIVIA}/temas/${id}/preguntas`);
    }
}
