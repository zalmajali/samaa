import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingrequestsPage } from './buildingrequests.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingrequestsPageRoutingModule {}
