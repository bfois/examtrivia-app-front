import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { StartComponent } from './pages/public/start/start.component';
import { BetaComponent } from './pages/public/beta/beta.component';
//RUTAS A LOS MODULOS
const routes: Routes = [
  { path:"",component:StartComponent
},
{path:"beta",component:BetaComponent},
{
  path:"signin", loadChildren: () => import("./pages/signin/signin.module")
  .then(m => m.SigninModule)
},
{
  path:"home", loadChildren: () => import("./pages/home/home.module")
  .then(m => m.HomeModule),
  canActivate: [AuthGuard] //RUTA PROTEGIDA, SOLO USUARIOS REGISTRADOS Y VALIDADOS.
},
{path:"trivia",loadChildren:()=>import("./pages/game/trivia/trivia.module").then(m=>m.TriviaModule),
canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
