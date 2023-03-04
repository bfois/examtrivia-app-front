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
    this.userSource.next(user);
  }

}

