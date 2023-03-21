import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component} from '@angular/core';
import {  Router } from '@angular/router';
import { Pregunta } from 'src/app/interfaces/Pregunta';
import { PreguntaRespuesta } from 'src/app/interfaces/PreguntaRespuesta';
import { RespuestaUsuario } from 'src/app/interfaces/RespuestaUsuario';
import { Temas } from 'src/app/interfaces/Temas';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { DisciplinaService } from '../../home/service/disciplina.service';

const slideInFromLeft = [
  // Definimos un estado inicial
  style({ transform: 'translateX(-200%)' }),
  // Definimos el estado final
  animate('500ms ease-in', style({ transform: 'translateX(0)' }))
];
const efectStart = transition('void => *', [
  style({ opacity: 0 }),
  animate('1.5s ease-in', style({ opacity: 1 })),
])
const animation = trigger('animation',[efectStart])

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss'],
  animations:[trigger('slideInFromLeft',[transition('void=>*', slideInFromLeft)]), animation]
})
export class TriviaComponent implements  AfterViewInit {
  temasSeleccionados: Temas[] = [];
  yaSeleccionada = false;
  enunciado!: string;
  noHayMasPreguntas = false;
  preguntaSeleccionada: Pregunta | null = null;
  respuestas!: PreguntaRespuesta[]
  respuestaSeleccionada!: PreguntaRespuesta | null;
  respuestaCorrecta = false;
  seleccionada = false;
  respuestasUsuario: RespuestaUsuario[] = [];
  preguntasConRespuestas: (Pregunta & { respuestas: PreguntaRespuesta[] })[] = [];
  preguntaSeleccionadaIndex = 0;


  constructor(private triviaDataService: TriviaDataService,
    private disciplinaService: DisciplinaService,
    private router:Router,
   ) {
    }

   ngAfterViewInit(): void {
    this.temasSeleccionados = this.triviaDataService.obtenerTemasSeleccionados();
    this.triviaDataService.getPreguntasConRespuestas(this.temasSeleccionados).subscribe(
      (preguntasConRespuestas) => {
        this.preguntasConRespuestas = preguntasConRespuestas;
        console.log(this.preguntasConRespuestas)
      },
      (error) => {
        console.log('Error fetching preguntas con respuestas:', error);
      }
    );


  }

  siguientePregunta(): void {
    if(this.preguntasConRespuestas.length === 0 || this.preguntaSeleccionadaIndex>this.preguntasConRespuestas.length - 2){
      this.noHayMasPreguntas = true;
    }
    else{
      this.preguntaSeleccionadaIndex++}
  }

  volverAtras(){
    this.router.navigate(['/home']);
  }

  verificarRespuesta(respuesta: PreguntaRespuesta): void {
    this.respuestaSeleccionada = respuesta;
    this.respuestaCorrecta = respuesta.esVerdadera;
    this.seleccionada = true;

    const respuestaUsuario: RespuestaUsuario = {
      pregunta:this.preguntasConRespuestas[this.preguntaSeleccionadaIndex],
      respuesta:respuesta.respuesta,
      esCorrecta:respuesta.esVerdadera
    };

    this.respuestasUsuario.push(respuestaUsuario);
    console.log(this.respuestasUsuario)
  }

  resultados(): void {
    this.triviaDataService.guardarResultados(this.respuestasUsuario)
    console.log(this.respuestasUsuario)
    this.router.navigate(['trivia/resultados']);
  }

}
