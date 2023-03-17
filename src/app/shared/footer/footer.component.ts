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
    background-color: #f5f5f5;
    color: #333;
    padding: 20px 0;
    text-align: center;
  }
`],
standalone:true
})
export class FooterComponent implements OnInit {
  currentYear!: number;
  constructor() { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

}
