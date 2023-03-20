import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DisciplinaComponent } from './disciplina.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DisciplinaService } from '../service/disciplina.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DisciplinaComponent', () => {
  let component: DisciplinaComponent;
  let fixture: ComponentFixture<DisciplinaComponent>;
  let disciplinaServiceSpy: jasmine.SpyObj<DisciplinaService>
  beforeEach(async () => {
    const disciplinaSpy = jasmine.createSpyObj('DisciplinaService',['getAllDisciplinas'])
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSelectModule, MatFormFieldModule, FormsModule, CommonModule,DisciplinaComponent, BrowserAnimationsModule],
      providers:[{provide:DisciplinaService, useValue:disciplinaSpy}]
    })
    .compileComponents();
    disciplinaServiceSpy = TestBed.inject(DisciplinaService) as jasmine.SpyObj<DisciplinaService>
    fixture = TestBed.createComponent(DisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
