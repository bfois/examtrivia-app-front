import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTES
import { HomeComponent } from './home.component';

//HTTP
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

//RUTAS
const routes: Routes = [
  {path:"", component:HomeComponent}
]

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NavbarComponent
    ]
})
export class HomeModule { }
