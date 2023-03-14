import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, forkJoin, mergeMap, catchError, of } from 'rxjs';
import { Pregunta } from 'src/app/interfaces/Pregunta';
import { PreguntaRespuesta } from 'src/app/interfaces/PreguntaRespuesta';
import { RespuestaUsuario } from 'src/app/interfaces/RespuestaUsuario';
import { Temas } from 'src/app/interfaces/Temas';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { DisciplinaService } from '../../home/service/disciplina.service';
import { TimerComponent } from '../timer/timer.component';


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
  preguntaSeleccionada: Pregunta | null = null;
  respuestas!: PreguntaRespuesta[]
  respuestaSeleccionada!: PreguntaRespuesta | null;
  respuestaCorrecta = false;
  seleccionada = false;
  restartInterval = true;
  tiempoTerminado = false;
  respuestasUsuario: RespuestaUsuario[] = [];
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;

  constructor(private triviaDataService: TriviaDataService,
    private disciplinaService: DisciplinaService,
    private router:Router,
   ) { }

   ngAfterViewInit(): void {
    this.temasSeleccionados = this.triviaDataService.obtenerTemasSeleccionados();
    this.obtenerPreguntas();
    this.timerComponent.tiempoTerminadoEvent.subscribe((tiempoTerminado: boolean) => {
      this.tiempoTerminado = tiempoTerminado;
      if (tiempoTerminado) {
        this.onTiempoTerminado();
      }
    })

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
  onTiempoTerminado(): void {
    this.tiempoTerminado  = true;
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
      this.preguntaSeleccionada = pregunta;

     this.disciplinaService.getRespuestasByPregunta(this.preguntaSeleccionada.id).subscribe(
      data => {
        this.respuestas = data
      }
     )
     this.seleccionada = false;
     this.tiempoTerminado = false;
     this.timerComponent.reiniciarContador();


      this.restartInterval = !this.restartInterval
      setTimeout(()=>{
        this.restartInterval = !this.restartInterval
      },100)
    }
  }

  volverAtras(){
    this.router.navigate(['/home']);
  }

  verificarRespuesta(respuesta: PreguntaRespuesta): void {
    this.respuestaSeleccionada = respuesta;
    this.respuestaCorrecta = respuesta.esVerdadera;
    this.seleccionada = true;

    const respuestaUsuario: RespuestaUsuario = {
      pregunta:this.preguntaSeleccionada!,
      respuesta:respuesta.respuesta,
      esCorrecta:respuesta.esVerdadera
    };

    this.respuestasUsuario.push(respuestaUsuario);
  }



  resultados(): void {
    this.router.navigate(['trivia/resultados'], { state: { respuestasUsuario: this.respuestasUsuario } });
  }

}
