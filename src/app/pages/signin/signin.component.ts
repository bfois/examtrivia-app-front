import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from '../../shared/UserService';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  isLoggingIn = false;
  restorePassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required]]
    })
  }
  login(){
    this.isLoggingIn = true;
    this.authenticationService.signIn({
      email:this.form.value.email,
      password:this.form.value.password
    }).subscribe(()=>{
      this.router.navigate(['home'])
    },(error) =>{
      this.isLoggingIn = false;
      this.snackBar.open(error.message, "OK",{
        duration:5000
      })
    }
    )

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

