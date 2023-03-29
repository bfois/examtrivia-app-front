import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  isLoggingIn = false;
  loading = false;
  restorePassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private authGuard: AuthGuard
  ) { }

  ngOnInit(): void {
    this.authGuard.resetIsNotAuthenticatedOrEmailNotVerified();
    this.form = this.formBuilder.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required]]
    })
  }

  async login() {
    this.loading = true;
    const { email, password } = this.form.value;
    try {
      await this.authenticationService.signIn({ email, password }).toPromise();
      this.loading = false;
      if (this.authGuard.getIsNotAuthenticatedOrEmailNotVerified()) {
        this.snackBar.open("Debe validar su correo electrónico para poder iniciar sesión.", "OK", {
          duration: 5000
        });
        this.authGuard.resetIsNotAuthenticatedOrEmailNotVerified()
      } else {
        this.router.navigate(['home'])
      }
    } catch (error:any) {
      this.loading = false;
      this.snackBar.open(error.message, "OK", {
        duration: 5000
      })
    }
  }
  async loginGoogle() {
    this.isLoggingIn = true;
    try {
      const userData = await this.authenticationService.loginGoogle().toPromise();
      this.router.navigate(['home']);
    } catch (error:any) {
      this.isLoggingIn = false;
      this.snackBar.open(error.message, "OK", {
        duration: 5000
      });
    }
  }
  toggleRestorePassword() {
      this.restorePassword = !this.restorePassword;
  }
}

