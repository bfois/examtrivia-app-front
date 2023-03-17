import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import { RouterModule, Routes } from "@angular/router";
import { FooterComponent } from "src/app/shared/footer/footer.component";

import { NavbarComponent } from "src/app/shared/navbar/navbar.component";
import { ResultadosComponent } from "../resultados/resultados.component";
import { TriviaComponent } from "./trivia.component";

//RUTAS
const routes: Routes = [
  {path:"", component:TriviaComponent},
  {path:"resultados", component:ResultadosComponent}
]

@NgModule({
    declarations: [
        TriviaComponent,
        ResultadosComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NavbarComponent,
        MatButtonModule
    ]
})
export class TriviaModule { }
