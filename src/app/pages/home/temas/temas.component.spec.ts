import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { DisciplinaService } from '../service/disciplina.service';

import { TemasComponent } from './temas.component';

describe('TemasComponent', () => {
  let component: TemasComponent;
  let fixture: ComponentFixture<TemasComponent>;
  let triviaServiceSpy: jasmine.SpyObj<TriviaDataService>
  let disciplinaServiceSpy: jasmine.SpyObj<DisciplinaService>
  beforeEach(async () => {
    const triviaSpy = jasmine.createSpyObj('TriviaDataService',['guardarTemasSeleccionados'])
    const disciplinaSpy = jasmine.createSpyObj('DisciplinaService',['getTemasByMateriaId'])
    await TestBed.configureTestingModule({
      imports:[CommonModule, MatButtonModule, RouterModule, FooterComponent, TemasComponent, HttpClientTestingModule],
      providers:[
        {provide:TriviaDataService, useValue:triviaSpy},
        {provide:DisciplinaService, useValue:disciplinaSpy}
      ]
    })
    .compileComponents();
    triviaServiceSpy = TestBed.inject(TriviaDataService) as jasmine.SpyObj<TriviaDataService>;
    disciplinaServiceSpy = TestBed.inject(DisciplinaService) as jasmine.SpyObj<DisciplinaService>;
    fixture = TestBed.createComponent(TemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
