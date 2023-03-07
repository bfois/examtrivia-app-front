import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
//COMPONENTES
import { SigninComponent } from './signin.component';
import { RegisterComponent } from './register/register.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

//ANGULAR MATERIAL
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

//HTTP
import { HttpClientModule } from '@angular/common/http';

//RUTAS DE LOGIN Y REGISTRO
const routes: Routes = [
  {path:"", component:SigninComponent},
  {path:"register", component:RegisterComponent}
]

@NgModule({
  declarations: [
    SigninComponent,
    RegisterComponent,
    RestorePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule
  ]
})
export class SigninModule { }
