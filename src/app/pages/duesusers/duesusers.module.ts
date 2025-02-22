import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuesusersPageRoutingModule } from './duesusers-routing.module';

import { DuesusersPage } from './duesusers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DuesusersPageRoutingModule
  ],
  declarations: [DuesusersPage]
})
export class DuesusersPageModule {}
