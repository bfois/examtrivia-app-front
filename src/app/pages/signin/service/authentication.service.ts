import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, catchError,throwError } from 'rxjs';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from 'firebase/auth';
import 'firebase/auth';
import { signIn } from 'src/app/interfaces/signIn';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user$: Observable<firebase.User | null>
  constructor(
    private Afauth: AngularFireAuth
  ) {
    this.user$ = this.Afauth.authState.pipe(map(user => user));
  }

  signIn(params: signIn):Observable<any>{
    return from(this.Afauth.signInWithEmailAndPassword(params.email, params.password));
  }
  signUp(email: string, password: string): Promise<any> {
    return this.Afauth.createUserWithEmailAndPassword(email, password);
  }

  loginGoogle(): Observable<any> {
    return from(this.Afauth.signInWithPopup(new GoogleAuthProvider())).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }


  restorePassword(email: string): Observable<void> {
    return from(this.Afauth.sendPasswordResetEmail(email))
      .pipe(
        catchError((error: any) => {
          // manejo del error
          return throwError(error);
        })
      );
  }
}




