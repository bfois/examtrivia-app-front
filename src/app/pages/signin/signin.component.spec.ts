import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthenticationService } from './service/authentication.service';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;
  let authGuardSpy: jasmine.SpyObj<AuthGuard>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['signIn', 'loginGoogle']);
    const snackbar = jasmine.createSpyObj('MatSnackBar', ['open']);
    const authGuard = jasmine.createSpyObj('AuthGuard', ['resetIsNotAuthenticatedOrEmailNotVerified', 'getIsNotAuthenticatedOrEmailNotVerified']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [SigninComponent],
      providers: [
        { provide: AuthenticationService, useValue: authSpy },
        { provide: MatSnackBar, useValue: snackbar },
        { provide: AuthGuard, useValue: authGuard }
      ],
    }).compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    snackbarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    authGuardSpy = TestBed.inject(AuthGuard) as jasmine.SpyObj<AuthGuard>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

})



    /*
    ### Explicación del archivo de prueba

El archivo de prueba `dashboard.component.spec.ts` verifica el comportamiento del componente `DashboardComponent`. Este componente es el componente principal que se muestra cuando un usuario inicia sesión y tiene acceso a la página principal de la aplicación.

El archivo de prueba contiene tres casos de prueba que cubren diferentes situaciones en las que el usuario puede estar. El primer caso de prueba comprueba que si el usuario está autenticado y su correo electrónico está verificado, el componente se carga correctamente y no se muestra ningún mensaje de error.

El segundo caso de prueba comprueba que si el usuario no está autenticado, el componente redirecciona al usuario a la página de inicio de sesión y muestra un mensaje de error.

El tercer caso de prueba comprueba que si el correo electrónico del usuario no está verificado, el componente muestra un mensaje de error y redirecciona al usuario a la página principal.

Para realizar las pruebas, se utilizan stubs y espías de las dependencias del componente, como el servicio de autenticación (`authService`) y el servicio de Snackbar (`snackBar`). Se simulan diferentes situaciones utilizando estos stubs y espías para verificar que el componente se comporte correctamente en cada caso.*/
