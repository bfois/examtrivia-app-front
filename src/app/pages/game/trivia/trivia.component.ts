import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/interfaces/Pregunta';
import { PreguntaConRespuestas } from 'src/app/interfaces/PreguntaConRespuesta';
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
export class TriviaComponent implements OnInit {
  temasSeleccionados: Temas[] = [];
  noHayMasPreguntas = false;
  preguntaSeleccionada: Pregunta | null = null;
  respuestas!: PreguntaRespuesta[]
  respuestaSeleccionada!: PreguntaRespuesta | null;
  respuestaCorrecta = false;
  seleccionada = false;
  respuestasUsuario: RespuestaUsuario[] = [];
  preguntasConRespuestas!:PreguntaConRespuestas[];
  preguntaSeleccionadaIndex = 0;
  loading = false;
  desactivar= false;
  counterTrue= 0;
  counterFalse = 0;


  constructor(private triviaDataService: TriviaDataService,
    private disciplinaService: DisciplinaService,
    private router:Router,
   ) {
    this.loading = true;
    }
  ngOnInit(): void {
    this.temasSeleccionados = this.triviaDataService.obtenerTemasSeleccionados();
    if(this.temasSeleccionados){
    this.disciplinaService.getPreguntasConRespuestas(this.temasSeleccionados).subscribe(

      (preguntasConRespuestas) => {
        this.loading = false;
        this.preguntasConRespuestas = preguntasConRespuestas;
      },
      (error) => {
        console.log('Error fetching preguntas con respuestas:', error);
      }
    );

    }
  }

  siguientePregunta(): void {
    let n = 1
    this.respuestaSeleccionada = null;
    if(this.preguntasConRespuestas?.length === 0 || this.preguntaSeleccionadaIndex>this.preguntasConRespuestas.length - 1){
      this.noHayMasPreguntas = true;
    } else if(this.preguntaSeleccionadaIndex === 15 * n) {
      const startIndex = this.preguntaSeleccionadaIndex / 15;
      this.disciplinaService.getPreguntasConRespuestas(this.temasSeleccionados, startIndex).subscribe(
          (preguntasConRespuestas) => {
              this.preguntasConRespuestas = this.preguntasConRespuestas.concat(preguntasConRespuestas);
              n++
          },
          (error) => {
              console.log('Error fetching preguntas con respuestas:', error);
          }
      );}
      this.preguntaSeleccionadaIndex++
  }

  volverAtras(){
    this.router.navigate(['/home']);
  }

  verificarRespuesta(respuesta: PreguntaRespuesta): void {
    if(!this.respuestaSeleccionada){
    this.respuestaSeleccionada = respuesta;
    this.respuestaCorrecta = respuesta.esVerdadera;
    if(this.respuestaCorrecta){
      this.counterTrue++
    }else{
      this.counterFalse++
    }

    this.seleccionada = true;

    const respuestaUsuario: RespuestaUsuario = {
      pregunta:this.preguntasConRespuestas[this.preguntaSeleccionadaIndex].pregunta,
      respuesta:respuesta.respuesta,
      esCorrecta:respuesta.esVerdadera,
      opcionCorrecta:this.preguntasConRespuestas[this.preguntaSeleccionadaIndex].respuestas.find(opcion => opcion.esVerdadera)

    };

    this.respuestasUsuario.push(respuestaUsuario);
  }
  }

  resultados(): void {
    this.triviaDataService.guardarResultados(this.respuestasUsuario)
    this.router.navigate(['trivia/resultados']);
  }

}
