import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  Router, RouterModule } from '@angular/router';
import { Materia } from 'src/app/interfaces/Materia';
import { Temas } from 'src/app/interfaces/Temas';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { DisciplinaService } from '../service/disciplina.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss'],
  standalone:true,
  imports:[CommonModule, MatButtonModule, RouterModule]
})
export class TemasComponent implements OnInit, OnChanges{
  @Input() materia: Materia | undefined;
  temas: Temas[] | undefined;
  temasSeleccionados: Temas[] = [];
  constructor(private disciplinaService: DisciplinaService,
    private triviaDataService: TriviaDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTemas()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['materia'] && !changes['materia'].firstChange) {
      this.getTemas();
    }
  }

  private getTemas(): void {
    if (this.materia) {
      this.disciplinaService.getTemasByMateriaId(this.materia.id)
        .subscribe((data: Temas[]) => {
          this.temas = data;
        });
    }
  }
  alternarSeleccion(tema: Temas): void{
    const index = this.temasSeleccionados.indexOf(tema);
    if (index === -1) {
      this.temasSeleccionados.push(tema);
    } else {
      this.temasSeleccionados.splice(index, 1);
    }
  }

  comenzar(){
    this.triviaDataService.guardarTemasSeleccionados(this.temasSeleccionados);
    this.router.navigate(['/trivia']);
  }

}
