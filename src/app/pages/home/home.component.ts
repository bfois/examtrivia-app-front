import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from 'src/app/interfaces/Materia';
import { UserService } from '../../shared/UserService';
import { MateriasService } from './service/materias.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  currentUser: any;
  materias$: Observable<Materia[]> | undefined;
  constructor(
    private userService: UserService,
    private materiasService: MateriasService
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

    this.materias$ = this.materiasService.getAllMaterias();

  }


}
