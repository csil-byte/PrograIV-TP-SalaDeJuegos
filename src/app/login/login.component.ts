import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { url } from 'inspector';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  [x: string]: any;
 
  credentials!: FormGroup;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router
        ) {}
  ngOnInit(): void { 
  }
  // Sign up with email/password
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth
        .createUserWithEmailAndPassword(email, password);
      window.alert('You have been successfully registered!');
      console.log(result.user);
    } catch (error) {
     // window.alert(error.message);
    }
  }
  // Sign in with email/password
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth
        .signInWithEmailAndPassword(email, password);
       alertWithSuccess();
    } catch (error) {
    //this.showAlert('Error', error);
    console.log(error);
    }
  }





}

  
function alertWithSuccess(){     
Swal.fire({
  title: 'Se ha ingresado sesión con éxito.',
  width: 400,
  padding: '3em',
  color: '#716add',
  background: '#fff url(./../../assets/img-home/back-hearts.jpg)',
 
}).then(function() {
  window.location.href = './../../quien-soy';
  //   this.router.navigateByUrl('/quien-soy', { replaceUrl: true });
})
}
 

