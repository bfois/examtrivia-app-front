import { Component, Input, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone:true,
  imports:[MatToolbarModule,MatIconModule, MatButtonModule, CommonModule]

})
export class NavbarComponent implements OnInit {
  @Input() currentUser: any;
  photoUrl: string | undefined;
  constructor() { }

  ngOnInit(): void {

  }

}
