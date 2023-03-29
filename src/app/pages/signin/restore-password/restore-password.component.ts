import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  formRestore!:FormGroup
  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar) {
   this.formRestore = this.formBuilder.group({
    email:["",[Validators.required, Validators.email]]
   })
  }
  ngOnInit(): void {
  }
  restorePassword(){
    this.authService.restorePassword(this.formRestore.value.email).subscribe(()=>{
      this.router.navigate(['']);
      this.snackBar.open("El correo para restablecer tu contraseño fue enviado con exito", "OK",{
        duration:5000
      })
    },(error) =>{
      this.snackBar.open(error.message, "OK",{
        duration:5000
      })
    }
    )
  }
}
