import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsenPageRoutingModule } from './notificationsen-routing.module';

import { NotificationsenPage } from './notificationsen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsenPageRoutingModule
  ],
  declarations: [NotificationsenPage]
})
export class NotificationsenPageModule {}
