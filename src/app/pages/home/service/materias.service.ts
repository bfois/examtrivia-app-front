 import { HttpClient } from '@angular/common/http';
 import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
 import { Materia } from 'src/app/interfaces/Materia';

 @Injectable({
   providedIn: 'root'
 })
 export class MateriasService {
  URL = "http://localhost:8080/api/v1";   constructor(private http: HttpClient) {
  }
  getAllMaterias(): Observable<Materia[]> {
     return this.http.get<Materia[]>(`${this.URL}/materias`);
   }
}
