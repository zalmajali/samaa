import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuesusersPage } from './duesusers.page';

const routes: Routes = [
  {
    path: '',
    component: DuesusersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuesusersPageRoutingModule {}
