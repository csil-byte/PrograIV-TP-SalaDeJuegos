import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { url } from 'inspector';
import { userInfo } from 'os';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  credentials!: FormGroup;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router
  ) {
    this.credentials = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  ngOnInit(): void {}
  // Sign up with email/password
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      window.alert('You have been successfully registered!');
    } catch (error) {
      // window.alert(error.message);
    }
  }
  // Sign in with email/password
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      alertWithSuccess('Se ha ingresado con éxito', this.router);
    } catch (error) {
      alertWithError(error);

      console.log(error);
    }
  }

  ingresoRapido() {
    this.credentials.get('email')?.setValue('cgscsilva@gmail.com');
    this.credentials.get('password')?.setValue('123456');
  }
}
function alertWithSuccess(title: any, router: Router) {
  Swal.fire({
    title: title,
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(./../../assets/img-home/back-hearts.jpg)',
  }).then(() => {
    router.navigate(['/home']);
  });
}
function alertWithError(title: any) {
  Swal.fire({
    title: title,
    width: 600,
    padding: '3em',
    color: '#dd6a6a',
    background: '#fff url(./../../assets/img-home/back-hearts.jpg)',
  }).then(function () {
    window.location.href = './../../login';
    //   this.router.navigateByUrl('/quien-soy', { replaceUrl: true });
  });
}
