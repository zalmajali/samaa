import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildingrequestsPageRoutingModule } from './buildingrequests-routing.module';

import { BuildingrequestsPage } from './buildingrequests.page';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    BuildingrequestsPageRoutingModule
  ],
  declarations: [BuildingrequestsPage]
})
export class BuildingrequestsPageModule {}
