import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./pages/slider/slider.module').then( m => m.SliderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tabsen',
    loadChildren: () => import('./pages/tabsen/tabsen.module').then( m => m.TabsenPageModule)
  },
  {
    path: 'newuser',
    loadChildren: () => import('./pages/newuser/newuser.module').then( m => m.NewuserPageModule)
  },
  {
    path: 'dues',
    loadChildren: () => import('./pages/dues/dues.module').then( m => m.DuesPageModule)
  },
  {
    path: 'servicedetails',
    loadChildren: () => import('./pages/servicedetails/servicedetails.module').then( m => m.ServicedetailsPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./pages/requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'buildingservices',
    loadChildren: () => import('./pages/buildingservices/buildingservices.module').then( m => m.BuildingservicesPageModule)
  },
  {
    path: 'buildingrequests',
    loadChildren: () => import('./pages/buildingrequests/buildingrequests.module').then( m => m.BuildingrequestsPageModule)
  },
  {
    path: 'buildinguser',
    loadChildren: () => import('./pages/buildinguser/buildinguser.module').then( m => m.BuildinguserPageModule)
  },
  {
    path: 'buildingreservations',
    loadChildren: () => import('./pages/buildingreservations/buildingreservations.module').then( m => m.BuildingreservationsPageModule)
  },
  {
    path: 'utilitysdetails',
    loadChildren: () => import('./pages/utilitysdetails/utilitysdetails.module').then( m => m.UtilitysdetailsPageModule)
  },
  {
    path: 'numbersdirectory',
    loadChildren: () => import('./pages/numbersdirectory/numbersdirectory.module').then( m => m.NumbersdirectoryPageModule)
  },
  {
    path: 'warranty',
    loadChildren: () => import('./pages/warranty/warranty.module').then( m => m.WarrantyPageModule)
  },
  {
    path: 'usersdetails',
    loadChildren: () => import('./pages/usersdetails/usersdetails.module').then( m => m.UsersdetailsPageModule)
  },
  {
    path: 'duesusers',
    loadChildren: () => import('./pages/duesusers/duesusers.module').then( m => m.DuesusersPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'notificationsen',
    loadChildren: () => import('./pages/notificationsen/notificationsen.module').then( m => m.NotificationsenPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./pages/language/language.module').then( m => m.LanguagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
