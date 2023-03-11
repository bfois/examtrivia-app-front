import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Materia } from 'src/app/interfaces/Materia';
import { Temas } from 'src/app/interfaces/Temas';
import { DisciplinaService } from '../service/disciplina.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss'],
  standalone:true,
  imports:[CommonModule, MatButtonModule]
})
export class TemasComponent implements OnInit, OnChanges{
  @Input() materia: Materia | undefined;
  temas: Temas[] | undefined;
  constructor(private disciplinaService: DisciplinaService) { }

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

}
