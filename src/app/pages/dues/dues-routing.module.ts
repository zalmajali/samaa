import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuesPage } from './dues.page';

const routes: Routes = [
  {
    path: '',
    component: DuesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuesPageRoutingModule {}
