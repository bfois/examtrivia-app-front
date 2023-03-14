import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() tiempoLimite: number = 30; // tiempo límite en segundos
  tiempoRestante: number = this.tiempoLimite;
  tiempoTerminado = false;
  intervalo: any;

  constructor() { }

  ngOnInit(): void {
    this.iniciarContador()
  }

  iniciarContador(): void {
    this.intervalo = interval(1000).subscribe(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        this.intervalo.unsubscribe();
        this.tiempoTerminado = true;// detener el intervalo cuando el tiempo se acabe
      }
    });
  }
  reiniciarContador(): void {
    this.tiempoRestante = this.tiempoLimite;
    this.tiempoTerminado = false;

  }

}
