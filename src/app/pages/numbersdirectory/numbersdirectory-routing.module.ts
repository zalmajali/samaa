import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumbersdirectoryPage } from './numbersdirectory.page';

const routes: Routes = [
  {
    path: '',
    component: NumbersdirectoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumbersdirectoryPageRoutingModule {}
