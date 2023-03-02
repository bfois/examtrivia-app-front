import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let page: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports:[ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement
    fixture.detectChanges();
  });



  describe('Login flow', () => {
  describe("given form", ()=>{

    it('when email is empty, then login button should be disabled', () => {
        setEmail('');
        setPassword('anyPassword');

        expect(loginButton().disabled).toBeTruthy();
      })

      it('when email is invalid, then login button should be disabled', () => {
        setEmail('invalidEmail');
        setPassword('anyPassword');

        expect(loginButton().disabled).toBeTruthy();
      })

      it('when password is empty, then login button should be disabled', () => {
        setEmail('valid@email.com');
        setPassword('');

        expect(loginButton().disabled).toBeTruthy();
      })

      it('when form is valid, then login button should be enabled', () => {
        setEmail('valid@email.com');
        setPassword('anyPassword');

        expect(loginButton().disabled).toBeFalsy();
      })
      it('when email is empty, then recover password button should be disabled', () => {
        setEmail('');

        expect(recoverPasswordButton().disabled).toBeTruthy();
      })

      it('when email is invalid, then recover password button should be disabled', () => {
        setEmail('invalidEmail');

        expect(recoverPasswordButton().disabled).toBeTruthy();
      })

      it('when email is valid, then recover password button should be enabled', () => {
        setEmail('valid@email.com');

        expect(recoverPasswordButton().disabled).toBeFalsy();
      })
  })



})



function setEmail(value:string){
    component.form.get('email')?.setValue(value)
    fixture.detectChanges();
  }
  function setPassword(value:string){
    component.form.get('password')?.setValue(value);
    fixture.detectChanges();
  }

  function recoverPasswordButton(){
    return page.querySelector('[test-id="recover-password-button"]')
  }

  function loginButton(){
    return page.querySelector('[test-id="login-button"]')
  }

});
