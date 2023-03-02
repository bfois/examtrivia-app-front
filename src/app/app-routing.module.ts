import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path:"signin", loadChildren: () => import("./pages/signin/signin.module")
  .then(m => m.SigninModule)
},{
  path:"home", loadChildren: () => import("./pages/home/home.module")
  .then(m => m.HomeModule),
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
