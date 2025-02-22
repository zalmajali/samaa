import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuesPageRoutingModule } from './dues-routing.module';

import { DuesPage } from './dues.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DuesPageRoutingModule
  ],
  declarations: [DuesPage]
})
export class DuesPageModule {}
