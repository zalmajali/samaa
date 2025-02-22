import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsenPageRoutingModule } from './tabsen-routing.module';

import { TabsenPage } from './tabsen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsenPageRoutingModule
  ],
  declarations: [TabsenPage]
})
export class TabsenPageModule {}
