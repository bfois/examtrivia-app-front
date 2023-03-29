import { animate, style, transition, trigger } from '@angular/animations';
import { Component} from '@angular/core';
const efectStart = transition('void => *', [
  style({ opacity: 0 }),
  animate('4s ease-in', style({ opacity: 1 })),
])
const animation = trigger('animation',[efectStart])

const efectStart1 = transition('void => *', [
  style({ opacity: 0 }),
  animate('1s ease-in', style({ opacity: 1 })),
])
const animation1 = trigger('animation1',[efectStart1])


@Component({
  selector: 'app-start',
  template: `
  <section class="firstPage" >
    <div class="firstPage_div" >
      <h1 [@animation1]>Polinomicos</h1>
      <div class="typed">
  <ngx-typed-js
  [strings]="['¡El trivia educativo mas grande de todo latinoamerica!']"
  [loop]="false"
  [shuffle]="true" [typeSpeed]="30"
  [startDelay]="1000"
  [showCursor]="false"
  >
  <span class="typing"></span>
  </ngx-typed-js>
</div>
      <button [@animation] mat-button routerLink="signin">JUGAR</button>
    </div>
  </section>
`,
  styles: [`
  span{
    color:white;
    margin-bottom:20px;
    font-size:20px;
  }
  .firstPage {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-direction: column;
    background-color: black;
  }
  h1{
    margin:20px;
    color:yellow;
  }
  .firstPage h1, .firstPage button {
    padding: 10px;
  }
  .firstPage button {
    background-color: orange;
    width: 20rem;
  }
  .firstPage h1 {
    font-size: 4rem;
    font-weight: bold;
  }
  .firstPage h4 {
    font-size: 3rem;
    font-family: light italic;
  }
  .firstPage_div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .typed{
    text-align:center;
    margin-top:20px;
    margin-bottom:20px;
  }
  button{
    font-size:16px;
    font-weight:bold;
  }
`],
  animations:[animation,animation1],
})
export class StartComponent {}

