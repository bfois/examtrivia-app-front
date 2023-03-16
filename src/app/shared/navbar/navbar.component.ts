import { Component, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import Usuario from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone:true,
  imports:[MatToolbarModule,MatIconModule, MatButtonModule, CommonModule,FormsModule]

})
export class NavbarComponent {
  @Input() currentUser!: Usuario | null;


  constructor() { }



}
