import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {
  credentials!: UntypedFormGroup;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.credentials = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {}
  async register(email: string, password: string, name: any) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      result.user?.updateProfile({
        displayName: name,
      });

      console.log(result);
      alertWithSuccess('Se ha registrado con éxito');
    } catch (error) {
      alertWithError(error);
    }
  }
}

function alertWithSuccess(title: any) {
  Swal.fire({
    title: title,
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(./../../assets/img-home/back-hearts.jpg)',
  }).then(function () {
    window.location.href = './../../home';
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
    window.location.href = './../../register';
    //   this.router.navigateByUrl('/quien-soy', { replaceUrl: true });
  });
}
