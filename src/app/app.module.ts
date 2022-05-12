import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './shared/services/auth.service';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { RegistrarComponent } from './registrar/registrar.component';
import { PreguntadosComponent } from './juegos/preguntados/preguntados.component';
import { MayorMenorComponent } from './juegos/mayor-menor/mayor-menor.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { ChatComponent } from './home/chat/chat.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { HttpClientModule } from '@angular/common/http';




const firebaseConfig = {
  apiKey: "AIzaSyDPDLLA6vRd0MdlBzLXFEUWMd3IEz5DqQU",
  authDomain: "tp-saladejuegos-d4757.firebaseapp.com",
  projectId: "tp-saladejuegos-d4757",
  storageBucket: "tp-saladejuegos-d4757.appspot.com",
  messagingSenderId: "392246231283",
  appId: "1:392246231283:web:c011bf4841c4b040697786"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    RegistrarComponent,
    PreguntadosComponent,
    MayorMenorComponent,
    AhorcadoComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule ,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
       AngularFireModule.initializeApp(firebaseConfig),SweetAlert2Module.forRoot({
        provideSwal: () => import('sweetalert2/dist/sweetalert2.js')
      }), provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore())
       
  ],
  providers: [ AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
