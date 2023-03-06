import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  formRestore!:FormGroup
  constructor(private formBuilder: FormBuilder) {
   this.formRestore = this.formBuilder.group({
    email:["",[Validators.required, Validators.email]]
   })
  }

  ngOnInit(): void {
  }

}
