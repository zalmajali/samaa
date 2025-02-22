import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersdetailsPage } from './usersdetails.page';

const routes: Routes = [
  {
    path: '',
    component: UsersdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersdetailsPageRoutingModule {}
