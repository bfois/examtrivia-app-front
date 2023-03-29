import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer>
  <div class="container">
    <p>Todos los derechos reservados &copy; {{ currentYear }}</p>
  </div>
</footer>`,
  styles: [`
  footer {
    color: black;
    padding: 10px 0;
    text-align: center;
  }
`],
standalone:true
})
export class FooterComponent implements OnInit {
  currentYear!: number;
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
