import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JsonGetterService } from '../../shared/services/json-getter.service';
@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export class AhorcadoComponent implements OnInit {
  botones: Array<{ letra: string; estado: string; presionado: boolean }> = [];
  botonesRespuesta: Array<{
    letra: string;
    estado: string;
    presionado: boolean;
  }> = [];

  jsonPath = 'assets/json/ahorcado.json';

  palabraActual: string | undefined;
  palabraActualArray: Array<string> = [];

  constructor(private jsonGetterService: JsonGetterService) {
    this.palabraActual = '';
  }
  letras: string[] = [];
  palabras: string[] = [];
  vidas: number = 6;
  palabraElegida: any = [];
  palabraElegidaE: any = [];
  juegoEnCurso: boolean = false;
  len: number = 0;

  ngOnInit(): void {
    console.log('valor de juegoEnCurso: ' + this.juegoEnCurso);

    this.jsonGetterService.getResource(this.jsonPath).subscribe((data) => {
      this.letras = data.constantes;
      this.palabras = data.variables;
    });
  }

  crearBotones() {
    this.botones = [];

    for (let i = 0; i < this.letras.length; i++) {
      // console.log('letras' + this.letras[i]);
      this.botones.push({
        letra: this.letras[i],
        presionado: false,
        estado: 'boton-no-seleccionado',
      });
      //console.log('botones', this.botones);
    }
  }

  crearBotonesRespuesta() {
    this.botonesRespuesta = [];

    for (let i = 0; i < this.palabraElegida.length; i++) {
      // console.log('letras' + this.letras[i]);
      this.botonesRespuesta.push({
        letra: this.palabraElegida[i],
        presionado: false,
        estado: 'sin-mostrar',
      });
      //  console.log('palabra elegida' + this.palabraElegida);
      // console.log('palabra actual array: ' + this.palabraActualArray);
      // console.log('botonesRespuesta', this.botonesRespuesta);
    }
  }
  splitDescription(theString: string) {
    let value = theString.split('\n');
    return value;
  }

  iniciarJuego() {
    this.juegoEnCurso = true;
    console.log('valor de juegoEnCurso: ' + this.juegoEnCurso);
    this.elegirPalabra();
    this.crearBotones();
    this.crearBotonesRespuesta();
  }

  elegirPalabra() {
    const random = Math.floor(Math.random() * this.palabras.length);
    this.palabraElegida = this.palabras[random].toUpperCase();
    this.palabraElegidaE = this.palabraElegida;
    console.log('palabra elegida: ' + this.palabraElegida);

    for (let index = 0; index < this.palabraElegida.length; index++) {
      this.palabraActualArray[index] = this.palabraElegida[index];
    }
    console.log('palabra elegida: ' + this.palabraElegida);
    console.log('palabra actual array: ' + this.palabraActualArray);

    return this.palabraActualArray;
  }
  //hangman game, function should be called when the user clicks on the button of a letter in the alphabet. if the letter is in the word, the letter should be displayed in the word. if the letter is not in the word, the hangman should be drawn.
  //if the user has guessed all the letters, the game should end and the user should be congratulated.
  //if the user has guessed the wrong letter 6 times, the game should end and the user should be 'game over'.
  casosAdivina(
    caso: boolean,
    boton: { letra: string; estado: string; presionado: boolean },
    botonRespuesta: {
      letra: string;
      estado: string;
      presionado: boolean;
    }
  ) {
    //console.log('botonRespuesta: ' + botonRespuesta);
    if (caso) {
      //guess is correct
      console.log('guess is correct');
      botonRespuesta.estado = 'mostrar-letra';
      boton.estado = 'boton-letra-acertada';
      boton.presionado = true;

      // console.log('botonRespuesta: ' + botonRespuesta.letra);

      // console.log('palabraElegida: ' + this.palabraElegida);
    } else {
      //guess is wrong
      if (this.vidas > 1) {
        this.vidas--;
        boton.estado = 'boton-letra-no-acertada';
        boton.presionado = true;
        console.log('guess is wrong');
      } else {
        //game over
        console.log('game over');
        //set timeout for 5 seconds
        setTimeout(() => {
          this.juegoEnCurso = false;
        }, 5000);
      }
    }
  }

  //function should be called when a letter is clicked to check if it is in the word.
  verificarLetra(boton: {
    letra: string;
    estado: string;
    presionado: boolean;
  }) {
    console.log('-----------VERIFICAR LETRA--------------');
    console.log('Letra presionada: ' + boton.letra);

    let caso = 0;
    //const caso = this.palabraElegida.includes(boton.letra.toUpperCase());

    for (let i = 0; i < this.palabraElegidaE.length; i++) {
      console.log('palabraElegidaE: ' + this.palabraElegidaE);
      console.log('palabraElegidaE - loop: ' + this.palabraElegidaE[i]);
      if (this.palabraElegidaE[i] == boton.letra.toUpperCase()) {
        this.botonesRespuesta.forEach((botonRespuesta) => {
          if (botonRespuesta.letra == boton.letra.toUpperCase()) {
            botonRespuesta.estado = 'mostrar-letra';
          }
        });

        this.botonesRespuesta[i].estado = 'mostrar-letra';
        this.casosAdivina(true, boton, this.botonesRespuesta[i]);

        caso++;
        this.palabraElegidaE = this.palabraElegidaE.replaceAll(
          boton.letra.toLocaleUpperCase(),
          ''
        );
      }
    }
    if (caso === 0) {
      this.casosAdivina(false, boton, this.botonesRespuesta[1]);
    }
    if (this.palabraElegidaE == '') {
      console.log('you won');
    }
    //console.log('letra es: ' + boton.letra.toLowerCase(), 'caso es: ' + caso);
  }
}
