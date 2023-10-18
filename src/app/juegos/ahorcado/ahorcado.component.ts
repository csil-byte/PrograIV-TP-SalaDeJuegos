import { Component, OnInit } from '@angular/core';
import { JsonGetterService } from '../../shared/services/json-getter.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export class AhorcadoComponent implements OnInit {
  palabraActual: string = '';
  botones: { letra: string; presionado: boolean; estado: string }[] = [];
  botonesRespuesta: { letra: string; presionado: boolean;estado: string }[] = [];
  palabras: string[] = [];
  vidas: number = 6;
  juegoEnCurso: boolean = false;
  gameOver: boolean = false;
  win: boolean = false;


  constructor(private jsonGetterService: JsonGetterService) {}
 //TODO:
 //[ ] 1. be able to add movies with more than 1 word 

  ngOnInit(): void {
    this.jsonGetterService.getResource('assets/json/ahorcado.json').subscribe((data) => {
      this.botones = data.constantes.map((letra: string) => ({
        letra,
        presionado: false,
        estado: 'mostrar-letra',

      }));
      this.palabras = data.variables; // Load words from the JSON file
    });
  }

  iniciarJuego() {
    this.juegoEnCurso = true;
    this.gameOver = false;
    this.win = false;
    this.vidas = 6;

    // Select a random word from your word list
    const randomIndex = Math.floor(Math.random() * this.palabras.length);
    this.palabraActual = this.palabras[randomIndex].toUpperCase();
    console.log(this.palabraActual);

    // Initialize the answer buttons
    this.botonesRespuesta = this.palabraActual.split('').map((letra) => ({
      letra,
      presionado: false,
      estado: 'mostrar-letra',
    }));
  }

  verificarLetra(letraSeleccionada: string) {
    if (!this.juegoEnCurso || this.gameOver || this.win) {
      return;
    }
    // Check if the selected letter is in the word
    if (this.palabraActual.includes(letraSeleccionada)) {
      // Letter is correct
     
      this.botonesRespuesta.forEach((botonRespuesta, index) => {
        if (botonRespuesta.letra === letraSeleccionada) {
          this.botonesRespuesta[index].presionado = true;
        
          this.botones.forEach((boton, index) => {
            if (boton.letra === letraSeleccionada) {
              this.botones[index].estado = 'boton-letra-acertada';
            }
          });
          console.log(this.botonesRespuesta[index]);
        }
      });

      // Check if the player has won
      const hasWon = this.botonesRespuesta.every((botonRespuesta) => botonRespuesta.presionado);
      if (hasWon) {
        this.win = true;
        this.juegoEnCurso = false;
      }
    } else {
      // Letter is incorrect
      // Change the state of the button to 'pressed'
      this.botones.forEach((boton, index) => {
        if (boton.letra === letraSeleccionada) {
          this.botones[index].estado = 'boton-letra-no-acertada';
        }
      });
      this.vidas--;
      if (this.vidas === 0) {
      this.isGameOver(true);
      }
    }
  }

  isGameOver(state : boolean) {
    if(state){
    
      this.gameOver = true;
      this.juegoEnCurso = false;
      this.botones.forEach((boton, index) => {
        this.botones[index].estado = 'mostrar-letra';
      });
    }
  }
}
