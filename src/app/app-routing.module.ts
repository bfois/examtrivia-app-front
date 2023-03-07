import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { StartComponent } from './pages/public/start/start.component';

//RUTAS A LOS MODULOS
const routes: Routes = [{
  path:"signin", loadChildren: () => import("./pages/signin/signin.module")
  .then(m => m.SigninModule)
},{
  path:"home", loadChildren: () => import("./pages/home/home.module")
  .then(m => m.HomeModule),
  canActivate: [AuthGuard] //RUTA PROTEGIDA, SOLO USUARIOS REGISTRADOS Y VALIDADOS.
},
{ path:"",component:StartComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
