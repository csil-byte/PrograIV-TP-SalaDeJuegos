import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from './shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TP-SalaDeJuegos';
  items: Observable<any[]>;
  public user$: Observable<any> = this.authSvc.afAuth.user;
  constructor(public authSvc: AuthService, firestore: AngularFirestore) {
    //this.items = firestore.collection('items').valueChanges();
    this.items = firestore.collection('chat_msj').valueChanges();
  }
  // isLoggedIn()
  // {
  //   if(localStorage.getItem('token')!=null)
  //   {
  //     return true;
  //   }
  //   else
  //   {
  //     return false;
  //   }

  // }

  simpleAlert() {
    Swal.fire({
      title: 'Custom width, padding, color, background.',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(./../assets/img-home/powerpuff.jpg)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    });
  }

  alertLogin() {
    Swal.fire({
      title: 'Favor iniciar sesión',
      width: 400,
      padding: '3em',
      color: '#716add',
      background: '#fff url(./../../assets/img-home/back-hearts.jpg)',
    }).then(function () {
      window.location.href = './../../home';
      //   this.router.navigateByUrl('/quien-soy', { replaceUrl: true });
    });
  }

  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}
