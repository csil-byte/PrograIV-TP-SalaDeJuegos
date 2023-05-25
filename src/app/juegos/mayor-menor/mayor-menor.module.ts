import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MayorMenorComponent } from './mayor-menor.component';


@NgModule({
  declarations: [MayorMenorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MayorMenorComponent,
      },
    ]),
  ]
})
export class MayorMenorModule { }
