import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Disciplina } from 'src/app/interfaces/Disciplina';
import { DisciplinaService } from '../service/disciplina.service';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.scss'],
  standalone:true,
  imports:[MatSelectModule, MatFormFieldModule, FormsModule, CommonModule]
})
export class DisciplinaComponent implements OnInit {
  disciplinas$: Observable<Disciplina[]> | undefined;
  selectedDisciplinaId!: number;
  @Output() disciplinaSelected = new EventEmitter<number>();
  constructor(private disciplinaService: DisciplinaService) { }
  ngOnInit(): void {
     this.disciplinas$ = this.disciplinaService.getAllDisciplinas();
  }
  onSelectDisciplina() {
    this.disciplinaSelected.emit(this.selectedDisciplinaId);
  }
}

