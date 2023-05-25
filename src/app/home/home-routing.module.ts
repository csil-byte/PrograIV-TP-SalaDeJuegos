import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../juegos/ahorcado/ahorcado.component';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'ahorcado',
    loadChildren: () =>
      import('./../juegos/ahorcado/ahorcado.module').then(
        (m) => m.AhorcadoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
