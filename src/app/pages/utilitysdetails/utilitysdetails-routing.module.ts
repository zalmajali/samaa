import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilitysdetailsPage } from './utilitysdetails.page';

const routes: Routes = [
  {
    path: '',
    component: UtilitysdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilitysdetailsPageRoutingModule {}
