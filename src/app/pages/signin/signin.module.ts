import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { RouterModule, Routes } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterComponent } from './register/register.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
const routes: Routes = [
  {path:"", component:SigninComponent},
  {path:"register", component:RegisterComponent},
  {path:"restorePassword", component:RestorePasswordComponent}
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
    MatSnackBarModule
  ]
})
export class SigninModule { }
