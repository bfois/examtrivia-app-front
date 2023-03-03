import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit{
  animateElements = false;
  constructor() { }
  ngOnInit(): void {
    setTimeout(() => {
      this.animateElements = true;
    }, 500);
  }


}

