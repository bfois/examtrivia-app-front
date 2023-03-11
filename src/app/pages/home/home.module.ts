import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
//COMPONENTES
import { HomeComponent } from './home.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
//HTTP
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

//Angular material
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
//RUTAS
const routes: Routes = [
  {path:"", component:HomeComponent}
]

@NgModule({
    declarations: [
        HomeComponent,
        DisciplinaComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NavbarComponent,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule

    ]
})
export class HomeModule { }
