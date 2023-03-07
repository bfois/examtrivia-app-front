import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/UserService';
import { passwordMatch } from 'src/app/validators/passwordMatch';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  currentUser: any;
  posRegister = false;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: passwordMatch('password', 'confirmPassword')
    });
  }

  async createUser() {
    if (!this.formRegister) {
      return;
    }

    const { name, lastname, email, password } = this.formRegister.value;
    const user = { name, lastname, email, password };

    try {
      const userCredential = await this.authenticationService.signUp(user.email, user.password);
      console.log('Usuario registrado:', userCredential.user);

      await userCredential.user.sendEmailVerification();

      this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', { duration: 3000 });
      this.userService.setUser(userCredential);
      this.currentUser = user;
      this.posRegister = true;

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      this.snackBar.open('Error al registrar usuario', 'Cerrar', { duration: 3000 });
    }
  }
}
