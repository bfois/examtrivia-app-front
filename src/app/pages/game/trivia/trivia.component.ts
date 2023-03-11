import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Temas } from 'src/app/interfaces/Temas';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit {
  temasSeleccionados: Temas[] = [];
  constructor(private triviaDataService: TriviaDataService,
    private router:Router) { }

  ngOnInit(): void {
    this.temasSeleccionados = this.triviaDataService.obtenerTemasSeleccionados();
    console.log(this.temasSeleccionados)
  }

  volverAtras(){
    this.router.navigate(['/home']);
  }
}
