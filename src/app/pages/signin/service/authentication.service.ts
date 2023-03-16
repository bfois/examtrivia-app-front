import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, catchError,throwError, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from 'firebase/auth';
import 'firebase/auth';
import { signIn } from 'src/app/interfaces/signIn';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   private firestore = firebase.firestore();
  private storage = firebase.storage();
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
        return throwError(error);
      })
    );
  }
  getCurrentUser(): Observable<firebase.User | null> {
    return this.Afauth.authState;
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
  //subir imagen a firebase storage
   uploadImage(file: File): Observable<string> {
     const filePath = `images/${file.name}`;
    const storageRef = this.storage.ref(filePath);
     const uploadTask = storageRef.put(file);

    return from(uploadTask).pipe(
       switchMap(() => storageRef.getDownloadURL()),
     catchError((error: any) => {
         // manejo del error
        return throwError(error);
       })
     );
   }
   //actualizar usuario
   updateUserProfile(uid: string, displayName: string, photoURL: string): Observable<void> {
     return from(this.firestore.collection('users').doc(uid).update({
         displayName: displayName,
         photoURL: photoURL
      }))
       .pipe(
         catchError((error: any) => {
          // manejo del error
          return throwError(error);
        })
       );
   }
}




