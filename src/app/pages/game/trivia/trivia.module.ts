import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "src/app/shared/navbar/navbar.component";
import { TimerComponent } from "../timer/timer.component";
import { TriviaComponent } from "./trivia.component";

//RUTAS
const routes: Routes = [
  {path:"", component:TriviaComponent}
]

@NgModule({
    declarations: [
        TriviaComponent,
        TimerComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NavbarComponent,
        MatButtonModule,
    ]
})
export class TriviaModule { }
