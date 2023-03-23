
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { DisciplinaService } from '../../home/service/disciplina.service';

import { TriviaComponent } from './trivia.component';

describe('TriviaComponent', () => {
  let component: TriviaComponent;
  let fixture: ComponentFixture<TriviaComponent>;
  let triviaServiceSpy: jasmine.SpyObj<TriviaDataService>
  let disciplinaServiceSpy: jasmine.SpyObj<DisciplinaService>
  beforeEach(async () => {
    const triviaSpy = jasmine.createSpyObj('TriviaDataService',['obtenerTemasSeleccionados','guardarResultados']);
    const disciplinaSpy = jasmine.createSpyObj('DisciplinaService',['getPreguntasConRespuestas']);
    await TestBed.configureTestingModule({
      declarations: [ TriviaComponent ],
      imports:[HttpClientTestingModule, BrowserAnimationsModule],
      providers:[{provide:TriviaDataService, useValue:triviaSpy},
      {provide:DisciplinaService, useValue:disciplinaSpy}]
    })
    .compileComponents();
    triviaServiceSpy = TestBed.inject(TriviaDataService) as jasmine.SpyObj<TriviaDataService>;
    disciplinaServiceSpy = TestBed.inject(DisciplinaService) as jasmine.SpyObj<DisciplinaService>
    fixture = TestBed.createComponent(TriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
