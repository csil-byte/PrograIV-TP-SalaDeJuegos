import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PreguntadosComponent } from './preguntados.component';

@NgModule({
  declarations: [PreguntadosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PreguntadosComponent,
      },
    ]),
  ],
})
export class PreguntadosModule {}
