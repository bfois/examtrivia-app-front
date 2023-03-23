import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTypedJsModule } from 'ngx-typed-js';

import { IntroduccionComponent } from './introduccion.component';

describe('IntroduccionComponent', () => {
  let component: IntroduccionComponent;
  let fixture: ComponentFixture<IntroduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroduccionComponent ],
      imports:[NgxTypedJsModule,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
