import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() tiempoLimite: number = 10; // tiempo límite en segundos
  tiempoRestante: number = this.tiempoLimite;
  tiempoTerminado = false;
  intervalo: any;

  @Output() tiempoTerminadoEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    if (this.tiempoRestante <= 0) {
      this.intervalo.unsubscribe();
      this.tiempoTerminado = true;
      this.tiempoTerminadoEvent.emit(true);
    }
    this.iniciarContador()
  }

  iniciarContador(): void {
    this.intervalo = interval(1000).subscribe(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        this.intervalo.unsubscribe();
        this.tiempoTerminado = true;
        this.tiempoTerminadoEvent.emit(true);
      }
    });
  }
  reiniciarContador(): void {
    this.tiempoRestante = this.tiempoLimite;
    this.tiempoTerminado = false;

  }

}
