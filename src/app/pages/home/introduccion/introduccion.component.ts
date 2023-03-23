import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
const efectStart = transition('void => *', [
  style({ opacity: 0 }),
  animate('1.5s ease-in', style({ opacity: 1 })),
])
const efectStart1 = transition('void => *', [
  style({ opacity: 0 }),
  animate('1.5s ease-in', style({ opacity: 1 })),
])
const efectStart2 = transition('void => *', [
  style({ opacity: 0 }),
  animate('1.5s ease-in', style({ opacity: 1 })),
])
const animation = trigger('animation',[efectStart])
const animation1 = trigger('animation1',[efectStart1])
const animation2 = trigger('animation2',[efectStart2])

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.component.html',
  styleUrls: ['./introduccion.component.scss'],
  animations:[animation,animation1,animation2]
})
export class IntroduccionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
