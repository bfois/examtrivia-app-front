import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { AuthenticationService } from '../../signin/service/authentication.service';

import { ResultadosComponent } from './resultados.component';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;
  let fixture: ComponentFixture<ResultadosComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let triviaServiceSpy: jasmine.SpyObj<TriviaDataService>
  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthenticationService',['getCurrentUser'] );
    const triviaSpy = jasmine.createSpyObj('TriviaDataService',['getResultados'])
    await TestBed.configureTestingModule({
      declarations: [ ResultadosComponent ],
      providers:[{provide:AuthenticationService, useValue:authSpy},
          {provide:TriviaDataService, useValue:triviaSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosComponent) ;
    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>
    triviaServiceSpy = TestBed.inject(TriviaDataService) as jasmine.SpyObj<TriviaDataService>
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
