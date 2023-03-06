import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take, map } from 'rxjs/operators';
import { AuthenticationService } from '../pages/signin/service/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isNotAuthenticatedOrEmailNotVerified = false;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        // Si el usuario está autenticado y su correo electrónico está verificado, permite el acceso.
        if (user && user.emailVerified) {
          return true;
        } else {
          this.isNotAuthenticatedOrEmailNotVerified = true;
          // Si el usuario no está autenticado o su correo electrónico no está verificado, redirige a la página de inicio de sesión.
          this.router.navigate(['signin']);

          return false;
        }
      })
    );
  }
  public getIsNotAuthenticatedOrEmailNotVerified(): boolean {
    return this.isNotAuthenticatedOrEmailNotVerified;
  }

  public resetIsNotAuthenticatedOrEmailNotVerified(): void {
    this.isNotAuthenticatedOrEmailNotVerified = false;
  }
}
