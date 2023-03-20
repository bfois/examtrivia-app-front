import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DisciplinaService } from './service/disciplina.service';

import { AuthenticationService } from '../signin/service/authentication.service';


//se describe el componente que se está probando ("HomeComponent"), y se definen las variables que se utilizarán en las pruebas.
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>
  let disciplinaServiceSpy: jasmine.SpyObj<DisciplinaService>

  //se crea una instancia del componente "HomeComponent", y se configuran los servicios que se utilizarán en las pruebas.
  beforeEach(async () => {
    const authenticationSpy = jasmine.createSpyObj('AuthenticationService',['getCurrentUser'])
    const disciplinaSpy = jasmine.createSpyObj('DisciplinaService',['getMateriasByDisciplinaId'])
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationSpy },
        { provide: DisciplinaService, useValue: disciplinaSpy }
      ]
    })

    .compileComponents();
    authenticationServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    disciplinaServiceSpy = TestBed.inject(DisciplinaService) as jasmine.SpyObj<DisciplinaService>;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.mostrarDisciplina = true;
    fixture.detectChanges();
  });

  // se verifica que el componente se ha creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });


})
