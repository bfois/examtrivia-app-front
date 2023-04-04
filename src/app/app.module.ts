import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
//COMPONENTES
import { AppComponent } from './app.component';
import { StartComponent } from './pages/public/start/start.component';
//FIREBASE API
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
//ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
//HTTP
import { HttpClientModule } from '@angular/common/http';
import firebase from 'firebase/compat/app';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { BetaComponent } from './pages/public/beta/beta.component';
firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    BetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule, // Agregar Firebase Storage
    AngularFirestoreModule,
    MatButtonModule,
    HttpClientModule,
    NgxTypedJsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
