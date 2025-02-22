import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsenPage } from './notificationsen.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsenPageRoutingModule {}
