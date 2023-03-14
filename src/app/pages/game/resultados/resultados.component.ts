import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/interfaces/Pregunta';
import { Respuesta } from 'src/app/interfaces/Respuesta';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  respuestasUsuario: {pregunta: Pregunta, respuesta: Respuesta, esCorrecta: boolean}[] = [];
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.respuestasUsuario = navigation?.extras.state?.['respuestasUsuario'] || [];
    console.log(this.respuestasUsuario)
  }

  ngOnInit(): void {
  }

}
