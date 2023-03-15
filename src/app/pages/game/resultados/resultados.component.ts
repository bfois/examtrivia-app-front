import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/interfaces/Pregunta';
import { Respuesta } from 'src/app/interfaces/Respuesta';
import { Temas } from 'src/app/interfaces/Temas';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { AuthenticationService } from '../../signin/service/authentication.service';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  respuestasUsuario!: {pregunta: Pregunta, respuesta: Respuesta, esCorrecta: boolean}[]
  temasSeleccionados: Temas[] = [];
  currentUser: any;
  constructor(
    private triviaService: TriviaDataService,
    private authenticationService: AuthenticationService) {

  }
  ngOnInit(): void {
   this.respuestasUsuario = this.triviaService.getResultados();

   this.temasSeleccionados = this.respuestasUsuario.map(r => r.pregunta.temas);
   this.temasSeleccionados = this.temasSeleccionados.filter((tema, index) => {
     return this.temasSeleccionados.findIndex(t => t.materia.id === tema.materia.id) === index;
   });
   this.authenticationService.getCurrentUser().subscribe(user => {
    if (user) {
      this.currentUser = user;
      console.log(this.currentUser)
      // Aquí puedes llamar a otro servicio para obtener más información del usuario si lo necesitas
    }

  });
   console.log(this.respuestasUsuario);
   console.log(this.temasSeleccionados);
  }

  getRespuestasForTema(tema: Temas) {
    return this.respuestasUsuario.filter(r => r.pregunta.temas.id === tema.id);
  }

}
