import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from 'src/app/interfaces/Disciplina';

import { DisciplinaService } from './service/disciplina.service';
import { AuthenticationService } from '../signin/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  currentUser: any;
  disciplinas$: Observable<Disciplina[]> | undefined;
  constructor(
    private disciplinaService: DisciplinaService,
    private authenticationService: AuthenticationService
   ) {

   }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log(this.currentUser)
        // Aquí puedes llamar a otro servicio para obtener más información del usuario si lo necesitas
      }
    });


    this.disciplinas$ = this.disciplinaService.getAllDisciplinas();

}
}
