import { Component, OnInit } from '@angular/core';
import { Carta } from '../../clases/carta';
@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css'],
})
export class MayorMenorComponent implements OnInit {
  empezo: boolean;
  terminado: boolean = false;
  final: any = '';
  mensajeFinal: string = '';
  resultado: boolean = false;

  cartasUsar: Carta[] = [];
  ultimaCarta: any;
  proximaCarta: any;
  imagenUrl: string | undefined = '';

  puntos: number;
  erroresCont: number;

  constructor() {
    this.empezo = false;
    this.puntos = 0;
    this.erroresCont = 0;
    (this.ultimaCarta = { palo: '', numero: 0, imagenUrl: '' }),
      (this.proximaCarta = { palo: '', numero: 0, imagenUrl: '' });
  }

  ngOnInit(): void {}

  comenzarJuego() {
    this.cartasUsar = this.mezclar(this.listaCartas.slice());
    console.info(this.cartasUsar);
    console.info(this.listaCartas);
    this.robar();
    this.empezo = true;
    this.puntos = 0;
    this.erroresCont = 0;
  }

  mezclar(array: any) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  robar() {
    this.ultimaCarta = this.cartasUsar?.pop();
    if (this.cartasUsar.length != 0) {
      this.proximaCarta = this.cartasUsar[this.cartasUsar.length - 1];
      this.imagenUrl = this.ultimaCarta?.imagenUrl;
      // console.info(this.ultimaCarta);
      // console.info(this.proximaCarta);
    } else {
      // Swal.fire('Termino el juego!', 'Se robaron todas las cartas', 'success');
      this.mensajeFinal = 'Se robaron todas las cartas!';
      this.resultado = true;
      this.terminarJuego();
    }
  }

  elegirBoton(eleccion: string) {
    if (eleccion == 'mayor') {
      if (this.proximaCarta.numero > this.ultimaCarta.numero) {
        this.casoAcierto();
      } else {
        this.casoError();
      }
    } else if (eleccion == 'igual') {
      if (this.proximaCarta.numero == this.ultimaCarta.numero) {
        this.casoAcierto();
      } else {
        this.casoError();
      }
    } else {
      if (this.proximaCarta.numero < this.ultimaCarta.numero) {
        this.casoAcierto();
      } else {
        this.casoError();
      }
    }
  }

  casoError() {
    this.erroresCont++;
    if (this.erroresCont >= 10) {
      // Swal.fire('Perdiste!', 'Llegaste al maximo de errores tu puntuacion final es: '+this.puntos, 'error');
      this.mensajeFinal = 'Llegaste al maximo de errores permitidos!';
      this.resultado = false;
      this.terminarJuego();
    } else {
      this.robar();
    }
  }

  casoAcierto() {
    this.puntos++;
    this.robar();
  }

  terminarJuego() {
    this.empezo = false;
    this.terminado = true;
  }

  reiniciarJuego() {
    this.terminado = false;
  }

  listaCartas: Carta[] = [
    { palo: 'oro', numero: 1, imagenUrl: '../../../assets/cartas/1.png' },
    { palo: 'oro', numero: 2, imagenUrl: '../../../assets/cartas/2.png' },
    { palo: 'oro', numero: 3, imagenUrl: '../../../assets/cartas/3.png' },
    { palo: 'oro', numero: 4, imagenUrl: '../../../assets/cartas/4.png' },
    { palo: 'oro', numero: 5, imagenUrl: '../../../assets/cartas/5.png' },
    { palo: 'oro', numero: 6, imagenUrl: '../../../assets/cartas/6.png' },
    { palo: 'oro', numero: 7, imagenUrl: '../../../assets/cartas/7.png' },
    { palo: 'oro', numero: 8, imagenUrl: '../../../assets/cartas/8.png' },
  ];
}
