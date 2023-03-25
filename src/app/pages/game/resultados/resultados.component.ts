import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { RespuestaUsuario } from 'src/app/interfaces/RespuestaUsuario';
import { Temas } from 'src/app/interfaces/Temas';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { AuthenticationService } from '../../signin/service/authentication.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit{
  respuestasUsuario!: RespuestaUsuario[];
  materia: string = '';
  disciplina:String = "";
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
   if(this.respuestasUsuario){
   this.temasSeleccionados = this.respuestasUsuario.map(r => r.pregunta.temas);
   if(this.temasSeleccionados){
    this.materia = this.temasSeleccionados[0].materia.name;
    this.disciplina = this.temasSeleccionados[0].materia.disciplina.name;
   }
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

    // Agregamos las pregunta y respuestas al array del tema correspondiente
    this.temasPreguntas[tema].push({ pregunta: respuesta.pregunta,respuesta: respuesta.respuesta.texto, esCorrecta: respuesta.esCorrecta, opcionCorrecta: respuesta.opcionCorrecta});
  });
   this.authenticationService.getCurrentUser().subscribe(user => {
    if (user) {
      this.currentUser = user;
      // Aquí puedes llamar a otro servicio para obtener más información del usuario si lo necesitas
    }
  });}

  this.temasSeleccionados.map(tema =>
    this.getRespuestasForTema(tema))
  }

  getRespuestasForTema(tema: Temas) {
   return this.respuestasUsuario.filter(r => r.pregunta.temas.id === tema.id);
  }

  objectKeys(temasPreguntas:any) {
    return  Object.keys(temasPreguntas);
  }

  generatePDF(){
    const element = document.getElementById('analisis-completo') as HTMLElement; // Replace 'my-element' with the ID of your HTML element

    const opt = {
        margin: 0,
        filename: 'cuestionario.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

   return html2pdf(element, opt);}
}
