import { animate, style, transition, trigger } from '@angular/animations';
import { Component} from '@angular/core';
const efectStart = transition('void => *', [
  style({ opacity: 0 }),
  animate('1.5s ease-in', style({ opacity: 1 })),
])
const animation = trigger('animation',[efectStart])

@Component({
  selector: 'app-start',
  template: `
  <section class="firstPage" >
    <div class="firstPage_div" [@animation]>
      <h1>EXAM</h1>
      <h4>TRIVIA</h4>
      <button mat-button routerLink="signin">JUGAR</button>
    </div>
  </section>
`,
  styles: [`
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

  .firstPage h1, .firstPage h4, .firstPage button {
    color: white;
    padding: 10px;
  }

  .firstPage button {
    background-color: orange;
    width: 20rem;
  }

  .firstPage h1 {
    font-size: 6rem;
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
`],
  animations:[animation]
})
export class StartComponent {}

