import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthenticationService } from '../signin/service/authentication.service';
import { Subject } from 'rxjs';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authenticationService: AuthenticationServiceMock;
  beforeEach(async () => {
    authenticationService = new AuthenticationServiceMock()
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService }
      ]
    })

    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
class AuthenticationServiceMock {
  getCurrentUser() {
    return new Subject();
  }
}
