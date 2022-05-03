import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
{  path: 'login', 
  component: LoginComponent, 
 
},
{  path: 'registrar', 
  component: RegistrarComponent, 
 
},
{
  path: 'home',
  component: HomeComponent,
 
}, {  path: 'quien-soy',
  component: QuienSoyComponent,

}, 

{  path: '',
redirectTo: 'login',
pathMatch: 'full',
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
