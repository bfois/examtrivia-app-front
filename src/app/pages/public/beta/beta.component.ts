import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beta',
  template: `
  <section class="main">
  <ngx-typed-js
  [strings]="['¡Si vez este mensaje es porque nos encontramos en nuestra versión beta, actualmente puedes pobrar la aplicación con la disciplina matemática y sus materias: Calculo diferencial e integral, Estadísticas y probabilidad, que te diviertas...']"
  [loop]="false"
  [shuffle]="true" [typeSpeed]="30"
  [startDelay]="100"
  [showCursor]="false"
  >
  </ngx-typed-js>
  <button routerLink="signin" mat-button>ENTRAR A LA APP</button>
</section>
  `,
  styles: [`
  .main{
    display:flex;
    width:100%;
    height:100vh;
    justify-content:center;
    align-items:center;
    background-color:black;
    color:white;
    font-size:20px;
  }
  `]
})
export class BetaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
