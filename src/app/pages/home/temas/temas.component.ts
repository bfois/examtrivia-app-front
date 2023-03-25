import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  Router, RouterModule } from '@angular/router';
import { Materia } from 'src/app/interfaces/Materia';
import { Temas } from 'src/app/interfaces/Temas';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { DisciplinaService } from '../service/disciplina.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss'],
  standalone:true,
  imports:[CommonModule, MatButtonModule, RouterModule, FooterComponent,MatProgressSpinnerModule]
})
export class TemasComponent implements OnInit, OnChanges{
  @Input() materia: Materia | undefined;
  temas: Temas[] | undefined;
  temasSeleccionados: Temas[] = [];
  loading=false;
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
    this.loading=true;
    if (this.materia) {
      this.disciplinaService.getTemasByMateriaId(this.materia.id)
        .subscribe((data: Temas[]) => {
          this.temas = data;
          this.loading=false;
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
