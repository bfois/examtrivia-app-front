import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/interfaces/Pregunta';
import { Respuesta } from 'src/app/interfaces/Respuesta';
import { Temas } from 'src/app/interfaces/Temas';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { AuthenticationService } from '../../signin/service/authentication.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  respuestasUsuario!: {pregunta: Pregunta, respuesta: Respuesta, esCorrecta: boolean}[]
  temasSeleccionados: Temas[] = [];
  nombreTemasSeleccionados: string[] = []
  currentUser: any;
  temasPreguntas:any = {}
  constructor(
    private triviaService: TriviaDataService,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
    //OBTIENE LOS DATOS DEL SERVICIO
   this.respuestasUsuario = this.triviaService.getResultados();
   //OBTIENE LOS TEMAS QUE SELECCIONO EL USUARIO
   this.temasSeleccionados = this.respuestasUsuario.map(r => r.pregunta.temas);
   //FILTRA POR NOMBRES UNICOS A LOS TEMAS, PARA MOSTRARLOS EN EL TEMPLATE
   this.nombreTemasSeleccionados = this.temasSeleccionados.map(tema => tema.name)
  .filter((nombre, index, self) => self.indexOf(nombre) === index);

  this.respuestasUsuario.forEach((respuesta) => {
    // Obtenemos el tema de la pregunta
    const tema = respuesta.pregunta.temas.name;

    // Si el tema aún no está en el objeto, lo agregamos con un array vacío
    if (!this.temasPreguntas[tema]) {
      this.temasPreguntas[tema] = [];
    }

    // Agregamos la pregunta al array del tema correspondiente
    this.temasPreguntas[tema].push({ pregunta: respuesta.pregunta,respuesta: respuesta.respuesta.texto, esCorrecta: respuesta.esCorrecta });
  });

  // Ahora tenemos un objeto con los temas como keys y un array de preguntas como valor
  console.log(this.temasPreguntas)

   this.authenticationService.getCurrentUser().subscribe(user => {
    if (user) {
      this.currentUser = user;
      console.log(this.currentUser)
      // Aquí puedes llamar a otro servicio para obtener más información del usuario si lo necesitas
    }
  });
   console.log(this.respuestasUsuario);
   console.log(this.nombreTemasSeleccionados)
  }

  getRespuestasForTema(tema: Temas) {
    return this.respuestasUsuario.filter(r => r.pregunta.temas.id === tema.id);

  }

  objectKeys(temasPreguntas:any) {
    return  Object.keys(temasPreguntas);
  }


}
