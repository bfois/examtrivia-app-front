import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { passwordMatch } from 'src/app/validators/passwordMatch';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      name:["",[Validators.required]],
      lastname:["",[Validators.required]],
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required]],
      confirmPassword:["",[Validators.required]]
    },
    {
      validator: passwordMatch("password", "confirmPassword")
    })
  }

  createUser(){
    const user = {
      name: this.formRegister.value.name,
      lastname: this.formRegister.value.lastname,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password
    };

    this.authenticationService.signUp(user.email, user.password).subscribe(
      userCredential => {
        console.log('Usuario registrado:', userCredential.user);
        this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
          duration: 3000
        });
        this.router.navigate(['home']);
      },
      error => {
        console.error('Error al registrar usuario:', error);
        this.snackBar.open('Error al registrar usuario', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }
}
