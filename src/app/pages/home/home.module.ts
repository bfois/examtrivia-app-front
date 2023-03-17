import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTES
import { HomeComponent } from './home.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
//HTTP
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

//Angular material
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TemasComponent } from './temas/temas.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { IntroduccionComponent } from './introduccion/introduccion.component';

//RUTAS
const routes: Routes = [
  {path:"", component:HomeComponent}
]

@NgModule({
    declarations: [
        HomeComponent,
        IntroduccionComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NavbarComponent,
        MatSelectModule,
        MatButtonModule,
        TemasComponent,
        DisciplinaComponent,
        FooterComponent

    ]
})
export class HomeModule { }
