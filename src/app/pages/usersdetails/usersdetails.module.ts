import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersdetailsPageRoutingModule } from './usersdetails-routing.module';

import { UsersdetailsPage } from './usersdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersdetailsPageRoutingModule
  ],
  declarations: [UsersdetailsPage]
})
export class UsersdetailsPageModule {}
