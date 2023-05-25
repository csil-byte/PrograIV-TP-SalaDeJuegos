import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RegistrarComponent } from './registrar/registrar.component';
import { ChatComponent } from './home/chat/chat.component';
import { ReaccionComponent } from './juegos/reaccion/reaccion.component';

import { AhorcadoModule } from './juegos/ahorcado/ahorcado.module';

//i want to load AhorcadoModule lazily from my HomeComponent which has a HomeRoutingModule
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'ahorcado',
    loadChildren: () =>
      import('./juegos/ahorcado/ahorcado.module').then((m) => m.AhorcadoModule),
  },
  {
    path: 'mayor-menor',
    loadChildren: () =>
      import('./juegos/mayor-menor/mayor-menor.module').then(
        (m) => m.MayorMenorModule
      ),
  },
  {
    path: 'preguntados',
    loadChildren: () =>
      import('./juegos/preguntados/preguntados.module').then(
        (m) => m.PreguntadosModule
      ),
  },
  //TODO: ---- add the rest of the games, each need a routing and module file
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'chat', component: ChatComponent },

  { path: 'reaccion', component: ReaccionComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

//add whatever's need to load AhorcadoModule lazily
@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
