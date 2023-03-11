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
import { TemasComponent } from './temas/temas.component';

//RUTAS
const routes: Routes = [
  {path:"", component:HomeComponent}
]

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NavbarComponent,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule,
        TemasComponent,
        DisciplinaComponent
    ]
})
export class HomeModule { }
