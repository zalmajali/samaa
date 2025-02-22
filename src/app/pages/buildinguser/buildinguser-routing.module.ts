import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildinguserPage } from './buildinguser.page';

const routes: Routes = [
  {
    path: '',
    component: BuildinguserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildinguserPageRoutingModule {}
