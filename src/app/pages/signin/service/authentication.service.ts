import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user$: Observable<firebase.User | null>
  constructor(
    private auth: AngularFireAuth
  ) {
    this.user$ = this.auth.authState.pipe(map(user => user));
  }

  signIn(params: signIn):Observable<any>{
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password));
  }
}
type signIn = {
email: string,
password:string
}
