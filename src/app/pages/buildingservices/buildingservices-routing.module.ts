import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingservicesPage } from './buildingservices.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingservicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingservicesPageRoutingModule {}
