 import { HttpClient } from '@angular/common/http';
 import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
 import { Disciplina } from 'src/app/interfaces/Disciplina';

 @Injectable({
   providedIn: 'root'
 })
 export class DisciplinaService {
  URL = "http://localhost:8080/api/v1";   constructor(private http: HttpClient) {
  }
  getAllDisciplinas(): Observable<Disciplina[]> {
     return this.http.get<Disciplina[]>(`${this.URL}/disciplinas`);
   }
}
