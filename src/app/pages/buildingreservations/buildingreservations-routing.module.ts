import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingreservationsPage } from './buildingreservations.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingreservationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingreservationsPageRoutingModule {}
