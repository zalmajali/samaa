import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildingreservationsPageRoutingModule } from './buildingreservations-routing.module';

import { BuildingreservationsPage } from './buildingreservations.page';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    BuildingreservationsPageRoutingModule
  ],
  declarations: [BuildingreservationsPage]
})
export class BuildingreservationsPageModule {}
