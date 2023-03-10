import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DisciplinaService } from './service/disciplina.service';
import { Materia } from 'src/app/interfaces/Materia';
import { Observable, of, Subject } from 'rxjs';
import { AuthenticationService } from '../signin/service/authentication.service';


//se describe el componente que se está probando ("HomeComponent"), y se definen las variables que se utilizarán en las pruebas.
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authenticationService: AuthenticationServiceMock;
  let disciplinaService: DisciplinaServiceMock;

  //se crea una instancia del componente "HomeComponent", y se configuran los servicios que se utilizarán en las pruebas.
  beforeEach(async () => {
    authenticationService = new AuthenticationServiceMock();
    disciplinaService = new DisciplinaServiceMock();
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: DisciplinaService, useValue: disciplinaService }
      ]
    })

    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.mostrarDisciplina = true;
    fixture.detectChanges();
  });

  // se verifica que el componente se ha creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //se simula una selección de disciplina y se verifica que el componente ha actualizado la vista para mostrar una lista de materias.
  it('should fetch and show materias when a disciplina is selected', () => {
    const disciplinaId = 1;
    const materias: Materia[] = [
      { id: 1, name: 'Materia 1' },
      { id: 2, name: 'Materia 2' },
    ];
    //"spyOn()" para simular llamadas a los servicios
    spyOn(authenticationService, 'getCurrentUser').and.returnValue(of({ id: 1 }));

    spyOn(disciplinaService, 'getMateriasByDisciplinaId').and.returnValue(of(materias));

    //onDisciplinaSelected()" que se llama cuando se selecciona una disciplina.
    component.onDisciplinaSelected(disciplinaId);

    expect(component.mostrarDisciplina).toBe(false);

    //"toEqual()" para comparar los resultados esperados con los resultados reales.
    expect(component.materias).toEqual(materias);
  });
});
//En lugar de utilizar los servicios reales, se han creado versiones de los servicios que devuelven observables Subject y of que emiten datos simulados en lugar de llamar a un backend real.
//El uso de mocks en pruebas unitarias es útil para aislar el componente o la clase que se está probando de las dependencias externas, de esta manera, las pruebas pueden centrarse en la lógica del componente o clase y no en el comportamiento de los servicios o dependencias externas.
interface AuthenticationServiceMock {
  getCurrentUser(): Observable<{ id: number }>;
  login(username: string, password: string): Observable<any>;
  logout(): void;
}

class AuthenticationServiceMock implements AuthenticationServiceMock {
  getCurrentUser(): Observable<{ id: number }> {
    return new Subject<{ id: number }>().asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return of({});
  }

  logout(): void {}
}

class DisciplinaServiceMock {
  getMateriasByDisciplinaId(disciplinaId: number) {
    return new Subject<Materia[]>().asObservable();
  }
}
