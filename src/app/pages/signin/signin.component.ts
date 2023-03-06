import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from '../../shared/UserService';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  isLoggingIn = false;
  isLoading = false;
  restorePassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private authGuard: AuthGuard
  ) { }

  ngOnInit(): void {
    this.authGuard.resetIsNotAuthenticatedOrEmailNotVerified();
    this.form = this.formBuilder.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required]]
    })
  }
  login() {
    this.isLoading = true;
    this.authenticationService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe(() => {
      this.isLoading = false;
      if (this.authGuard.getIsNotAuthenticatedOrEmailNotVerified()) {
        this.snackBar.open("Debe validar su correo electrónico para poder iniciar sesión.", "OK", {
          duration: 5000
        });
        this.authGuard.resetIsNotAuthenticatedOrEmailNotVerified()
      }
        else{this.router.navigate(['home'])}
    }, (error) => {
      this.isLoading = false;
      this.snackBar.open(error.message, "OK",{
        duration:5000
      })
    });
  }
  loginGoogle() {
    this.isLoggingIn = true;
    this.authenticationService.loginGoogle().subscribe((userData) => {
      this.userService.setUser(userData); // almacenar los datos del usuario en el servicio
      this.router.navigate(['home']);
    }, (error) => {
      this.isLoggingIn = false;
      this.snackBar.open(error.message, "OK", {
        duration: 5000
      });
    });
  }

  activeRestore(){
      this.restorePassword = true;
  }
  desactiveRestore(){
    this.restorePassword = false;
  }
  }

