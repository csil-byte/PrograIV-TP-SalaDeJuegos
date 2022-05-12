import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ChatService } from '../../shared/services/chat.service';
import { Mensaje } from './mensajes';
import { FirestoreService } from '../../shared/services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  implements OnInit {
 
  public user:any;
  mensaje:Mensaje = {mensaje:'', usuario:'', fecha:'', hora:''};

  chat:any[] = [];
  @ViewChild('scrollMe') private listadoMensajes!: ElementRef;

  constructor(private chatService:ChatService, private authSvc:AuthService, private firestore:FirestoreService) {
    this.gaurdarUsuario();
   }

  async gaurdarUsuario()
  {
    this.user = await this.authSvc.getCurentUser();
  }
  ngOnInit() {
    this.chatService.getAll('chat').subscribe((chatSnapshot) => {
      this.chat = [];
      chatSnapshot.forEach((messageData: any) => {
        this.chat.push({
          id: messageData.payload.doc.id,
          data: messageData.payload.doc.data()
        });
      })
    });
  }
  ngAfterViewChecked() {
    this.scrollear();
  }

  scrollear() {
    this.listadoMensajes.nativeElement.scrollTop = this.listadoMensajes.nativeElement.scrollHeight;
  }

  async send()
  {
    let date:Date = new Date();
    this.mensaje.usuario =  this.user.email;
    this.mensaje.fecha = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    this.mensaje.hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    this.firestore.crear('chat', {fecha:this.mensaje.fecha, hora:this.mensaje.hora, usuario:this.mensaje.usuario, mensaje:this.mensaje.mensaje });

    this.mensaje.mensaje = '';
  }
}
