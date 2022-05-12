import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JsonGetterService } from '../../shared/services/json-getter.service';
@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export class AhorcadoComponent implements OnInit {
  botones: Array<{ letra: string; estado: string; presionado: boolean }> = [];
  jsonPath = 'assets/json/ahorcado.json';

  palabraActual:string|undefined;
  palabraActualArray: Array<string> = [];





  constructor(private jsonGetterService: JsonGetterService) {

    this.palabraActual = '';
  }
  letras: string[] = [];
  palabras: string[] = [];
  vidas: number = 6;
  palabraElegida: any=[];
  juegoEnCurso: boolean = false;
  len: number = 0;

  ngOnInit(): void {
    console.log('valor de juegoEnCurso: ' + this.juegoEnCurso);

    this.jsonGetterService.getResource(this.jsonPath).subscribe((data) => {
      this.letras = data.constantes;
      this.palabras = data.variables;
    });
  }


getSplit(theString: any) {
//RETURN ITERABLE FOR NGFOR
    return theString.split('\n');


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
  splitDescription(theString: string) {
    let value = theString.split('\n');
    return value;
  }

  iniciarJuego() {
    this.juegoEnCurso = true;
    console.log('valor de juegoEnCurso: ' + this.juegoEnCurso);
    this.elegirPalabra();
    this.crearBotones();
  }

  elegirPalabra() {
    const random = Math.floor(Math.random() * this.palabras.length);
    this.palabraElegida = this.palabras[random].toUpperCase();
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
  casosAdivina(caso: boolean) {
    if (caso) {
      //guess is correct
      console.log('guess is correct');
      //remove letter from the word this.palabraElegida
      //if the word is empty, the user should be congratulated.
      this.palabraElegida = this.palabraElegida.replace(/[^]/g, '_');
      if (this.palabraElegida === '') {
        console.log('you won');
      }
    } else {
      //guess is wrong
      if (this.vidas > 1) {
        this.vidas--;
        console.log('guess is wrong');
      } else {
        //game over
        console.log('game over');
        this.juegoEnCurso = false;
      }
    }
  }

  //function should be called when a letter is clicked to check if it is in the word.
  verificarLetra(boton: {
    letra: string;
    estado: string;
    presionado: boolean;
  }) {
    const caso = this.palabraElegida.includes(boton.letra.toUpperCase());
    this.casosAdivina(caso);
    //console.log('letra es: ' + boton.letra.toLowerCase(), 'caso es: ' + caso);
  }
}
