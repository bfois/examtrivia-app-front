import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from 'src/app/interfaces/Disciplina';
import { UserService } from '../../shared/UserService';
import { DisciplinaService } from './service/disciplina.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  currentUser: any;
  materias$: Observable<Disciplina[]> | undefined;
  constructor(
    private userService: UserService,
    private disciplinaService: DisciplinaService
   ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') ?? "");
   }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? "");
    if (currentUser) {
      this.currentUser = currentUser;
    }

    this.materias$ = this.disciplinaService.getAllDisciplinas();

  }


}
