import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/clases/preguntas';
import { getFotos } from 'src/app/shared/services/get-fotos.service';
import { preguntasConst } from 'src/app/juegos/constantes/preguntasLista';
@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css'],
})
export class PreguntadosComponent implements OnInit {
  empezo: boolean = false;
  terminado: boolean = false;
  mensajeFinal: string = 'Mensaje final de prueba';
  resultado: boolean = false;

  preguntasArray: Pregunta[] = [];
  preguntaActual: any;

  puntos: number = 0;
  errores: number = 0;

  correcta1: boolean = false;
  correcta2: boolean = false;
  correcta3: boolean = false;
  correcta4: boolean = false;
  siguiente: boolean = true;

  correcta1Estilo: string = '';
  correcta2Estilo: string = '';
  correcta3Estilo: string = '';
  correcta4Estilo: string = '';

  foto: any;
  constructor(private fotos: getFotos) {}

  ngOnInit(): void {}

  comenzarJuego() {
    this.empezo = true;
    this.puntos = 0;
    this.errores = 0;
    this.preguntasArray = this.mezclar(preguntasConst.slice());
    this.preguntar();
  }

  reiniciarJuego() {
    this.terminado = false;
  }

  terminarJuego() {
    this.terminado = true;
    this.empezo = false;
  }

  mezclar(array: any) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  preguntar() {
    this.correcta1 = false;
    this.correcta2 = false;
    this.correcta3 = false;
    this.correcta4 = false;
    this.siguiente = true;

    this.correcta1Estilo = '';
    this.correcta2Estilo = '';
    this.correcta3Estilo = '';
    this.correcta4Estilo = '';

    if (this.preguntasArray.length != 0) {
      this.preguntaActual = this.preguntasArray?.pop();
      this.fotos
        .traerFoto(this.preguntaActual.tematica)
        .subscribe((fotoRetornada) => {
          console.info('fotoRetornada', fotoRetornada);
          this.foto = fotoRetornada;
        });
    } else {
      this.mensajeFinal = 'Se terminaron las preguntas!';
      this.resultado = true;
      this.terminarJuego();
    }
  }

  elegirRespuesta(res: string, opcion: string) {
    if (res == this.preguntaActual.opcionCorrecta) {
      this.puntos++;
      switch (opcion) {
        case '1':
          this.correcta1Estilo = 'bien';
          break;
        case '2':
          this.correcta2Estilo = 'bien';
          break;
        case '3':
          this.correcta3Estilo = 'bien';
          break;
        case '4':
          this.correcta4Estilo = 'bien';
          break;
      }
    } else {
      this.errores++;

      switch (opcion) {
        case '1':
          this.correcta1Estilo = 'mal';
          break;
        case '2':
          this.correcta2Estilo = 'mal';
          break;
        case '3':
          this.correcta3Estilo = 'mal';
          break;
        case '4':
          this.correcta4Estilo = 'mal';
          break;
      }

      switch (this.preguntaActual.opcionPiola) {
        case '1':
          this.correcta1Estilo = 'bien';
          break;
        case '2':
          this.correcta2Estilo = 'bien';
          break;
        case '3':
          this.correcta3Estilo = 'bien';
          break;
        case '4':
          this.correcta4Estilo = 'bien';
          break;
      }
    }

    this.correcta1 = true;
    this.correcta2 = true;
    this.correcta3 = true;
    this.correcta4 = true;
    this.siguiente = false;
  }
}
