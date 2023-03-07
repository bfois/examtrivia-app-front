import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTES
import { HomeComponent } from './home.component';

//HTTP
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ]
})
export class HomeModule { }
