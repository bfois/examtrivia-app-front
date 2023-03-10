import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordComponent } from './restore-password.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Subject } from 'rxjs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RestorePasswordComponent', () => {
  let component: RestorePasswordComponent;
  let fixture: ComponentFixture<RestorePasswordComponent>;
  let authenticationService: AuthenticationServiceMock;
  beforeEach(async () => {
    authenticationService = new AuthenticationServiceMock()
    await TestBed.configureTestingModule({
      imports:[MatInputModule, MatFormFieldModule, MatButtonModule,ReactiveFormsModule, MatSnackBarModule, BrowserAnimationsModule ],
      declarations: [ RestorePasswordComponent ]
    })
    .overrideProvider(AuthenticationService, {useValue:authenticationService})
    .compileComponents();

    fixture = TestBed.createComponent(RestorePasswordComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("form validations",()=>{
    it('if email is invalid, should be expect form invalid',()=>{
    component.formRestore.get('email')?.setValue("")
     fixture.detectChanges();

      expect(component.formRestore.invalid).toBeTruthy();
    })
  })

});
 class AuthenticationServiceMock {
  _signInResponse = new Subject();
  signIn(){
     return this._signInResponse.asObservable();
  }
}
