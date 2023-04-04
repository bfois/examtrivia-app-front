import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
const efectStart = transition('void => *', [
  style({ opacity: 0 }),
  animate('5s ease-in', style({ opacity: 1 })),
])
const animation = trigger('animation',[efectStart])

@Component({
  selector: 'app-beta',
  template: `
  <section class="main">
  <ngx-typed-js
  [strings]="['¡Si vez este mensaje es porque nos encontramos en nuestra versión beta, actualmente puedes pobrar la aplicación con la disciplina matemática y sus materias: Calculo diferencial e integral, Estadísticas y Probabilidad, que te diviertas...']"
  [loop]="false"
  [shuffle]="true" [typeSpeed]="30"
  [startDelay]="100"
  [showCursor]="false"
  >
  <span class="typing"></span>
  </ngx-typed-js>
  <button [@animation] routerLink="/signin" mat-button>ENTRAR A LA APP</button>
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
    flex-direction:column;
  }
  button{
    margin-top:20px;
    background-color:orange;
    font-weight:bold;
    font-size:16px;
    padding:5px;
    color:black;
  }
  ngx-typed-js{
    width:50%;
    height:10%;
    text-align:justify;
  }
  @media (max-width: 767px){
    ngx-typed-js{
      width:90%;
    }
  }
  `],
  animations:[animation]
})
export class BetaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
