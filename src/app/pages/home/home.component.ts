import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../signin/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  currentUser: any;
  mostrarDisciplina = true;
  constructor(
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
}

onDisciplinaSelected(disciplinaId: number) {
  this.mostrarDisciplina = false;
  // hacer algo con la disciplina seleccionada...
}
volverDisciplina(){
  this.mostrarDisciplina = true;
}
}
