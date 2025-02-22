import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsenPage } from './tabsen.page';

const routes: Routes = [
  {
    path: '',
    component: TabsenPage,
    children: [
      {
        path: 'buildingservices',
        loadChildren: () => import('../buildingservices/buildingservices.module').then(m => m.BuildingservicesPageModule)
      },
      {
        path: 'buildingrequests',
        loadChildren: () => import('../buildingrequests/buildingrequests.module').then(m => m.BuildingrequestsPageModule)
      },
      {
        path: 'buildinguser',
        loadChildren: () => import('../buildinguser/buildinguser.module').then(m => m.BuildinguserPageModule)
      },
      {
        path: 'buildingreservations',
        loadChildren: () => import('../buildingreservations/buildingreservations.module').then(m => m.BuildingreservationsPageModule)
      },
      {
        path: 'buildingregistered',
        loadChildren: () => import('../newuser/newuser.module').then(m => m.NewuserPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'duesusers',
        loadChildren: () => import('../duesusers/duesusers.module').then( m => m.DuesusersPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabsen/buildingservices',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabsen/buildingservices',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsenPageRoutingModule {}
