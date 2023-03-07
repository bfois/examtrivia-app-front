import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject(null);
  currentUser = this.userSource.asObservable();

  constructor() { }

  setUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSource.next(user);
  }
}

