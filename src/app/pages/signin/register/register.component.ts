import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required]]
    })
  }

  createUser(){}
}
