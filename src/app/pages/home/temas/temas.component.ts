import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Materia } from 'src/app/interfaces/Materia';
import { Temas } from 'src/app/interfaces/Temas';
import { DisciplinaService } from '../service/disciplina.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss'],
  standalone:true,
  imports:[CommonModule]
})
export class TemasComponent implements OnInit {
  @Input() materia: Materia | undefined;
  temas: Temas[] | undefined;
  constructor(private disciplinaService: DisciplinaService) { }

  ngOnInit(): void {
     if (this.materia) {
       this.disciplinaService.getTemasByMateriaId(this.materia.id)
        .subscribe((data: Temas[]) => {
          this.temas = data;
         });
     }
  }

}
