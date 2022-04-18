import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
 {  path: 'quien-soy',
  component: QuienSoyComponent,

}, {  path: '*',
redirectTo: '',
pathMatch: 'full',
},
{  path: 'login', 
  component: LoginComponent, 
 
},
{
  path: 'home',
  component: HomeComponent,
 
},



];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
