import { Component, OnInit} from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Materia } from 'src/app/interfaces/Materia';
import { AuthenticationService } from '../signin/service/authentication.service';
import { DisciplinaService } from './service/disciplina.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  mostrarDisciplina = true;
  materias: Materia[] | undefined;
  materias$: Observable<Materia[]> | undefined;
  materiaSeleccionada!:Materia;
  nombreMateriaSeleccionada:string="Materia"
  mostrarTemas = false;
  loading = false;
  constructor(
    private authenticationService: AuthenticationService,
    private disciplinaService: DisciplinaService
   ) {
   }
  ngOnInit(){
if(this.authenticationService.getCurrentUser()){
    this.authenticationService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
        // Aquí puedes llamar a otro servicio para obtener más información del usuario si lo necesitas
      }
    });}
}
onDisciplinaSelected(disciplinaId: number) {
  this.mostrarDisciplina = false;
  this.loading=true;
  // hacer algo con la disciplina seleccionada...
  this.materias$ = this.disciplinaService.getMateriasByDisciplinaId(disciplinaId)
    .pipe(
      tap((data: Materia[]) => {
        this.materias = data;
        this.loading=false;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(error));
      })
    );
}
volverDisciplina(){
  this.mostrarDisciplina = true;
}
onMateriaSelected(materia: Materia) {
  if (!materia) {
    return;
  }
  this.materiaSeleccionada = materia;
  this.nombreMateriaSeleccionada = materia.name;
  this.mostrarTemas = true;
}
volverMateria(){
  this.mostrarTemas = false;
  this.nombreMateriaSeleccionada = "Materia"
}
}
