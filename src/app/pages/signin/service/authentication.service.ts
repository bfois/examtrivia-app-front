import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  signIn(params: signIn):Observable<any>{
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password));
  }
}
type signIn = {
email: string,
password:string
}
