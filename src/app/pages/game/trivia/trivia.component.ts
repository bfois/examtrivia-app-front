import { AfterViewInit, Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, forkJoin, mergeMap, catchError, of } from 'rxjs';
import { Pregunta } from 'src/app/interfaces/Pregunta';

import { Temas } from 'src/app/interfaces/Temas';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { DisciplinaService } from '../../home/service/disciplina.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements  AfterViewInit {
  temasSeleccionados: Temas[] = [];
  preguntas: Pregunta[] = [];

  yaSeleccionada = false;
  enunciado!: string;
  noHayMasPreguntas = false;

  constructor(private triviaDataService: TriviaDataService,
    private disciplinaService: DisciplinaService,
    private router:Router,
   ) { }

   ngAfterViewInit(): void {
    this.temasSeleccionados = this.triviaDataService.obtenerTemasSeleccionados();
    this.obtenerPreguntas();

  }

  obtenerPreguntas(): void {
    const observables: Observable<Pregunta[]>[] = this.temasSeleccionados.map(
      (tema: Temas) => {
        return this.disciplinaService.getPreguntasByTemas(tema.id);
      }
    );
    forkJoin(observables)
      .pipe(
        mergeMap((respuestas: Pregunta[][]) => respuestas),
        catchError((error) => {
          console.log('Error fetching preguntas:', error);
          return of([]);
        })
      )
      .subscribe((preguntas: Pregunta[]) => {
        this.preguntas.push(...preguntas);
        this.siguientePregunta();
      });
  }
  getRandomQuestion(): Pregunta | null {
     const preguntasDisponibles = this.preguntas.filter(
      (pregunta: Pregunta) => !pregunta.yaSeleccionada
    );
    if (preguntasDisponibles.length === 0) {
      this.noHayMasPreguntas = true;
      return null;
    }
    const selectedQuestionIndex = Math.floor(
      Math.random() * preguntasDisponibles.length
    );
    const selectedQuestion = preguntasDisponibles[selectedQuestionIndex];
    selectedQuestion.yaSeleccionada = true;
    return selectedQuestion;
  }

  siguientePregunta(): void {
    const pregunta = this.getRandomQuestion();
    if (pregunta) {
      this.enunciado = pregunta.enunciado;
    }
  }

  volverAtras(){
    this.router.navigate(['/home']);
  }
  resultados(){

  }
}
