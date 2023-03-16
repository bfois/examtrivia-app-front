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
  <section class="first-page" >
    <div class="inicio-animado" [@animation]>
      <h1>EXAM</h1>
      <h4>TRIVIA</h4>
      <button mat-button routerLink="signin">JUGAR</button>
    </div>
  </section>
`,
  styles: [`
  .first-page {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    flex-direction: column;
    background-color: black;
  }

  .first-page h1, .first-page h4, .first-page button {
    color: white;
    padding: 10px;
  }

  .first-page button {
    background-color: orange;
    width: 20rem;
  }

  .first-page h1 {
    font-size: 6rem;
    font-weight: bold;
  }

  .first-page h4 {
    font-size: 3rem;
    font-family: light italic;
  }

  .inicio-animado {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`],
  animations:[animation]
})
export class StartComponent {}

