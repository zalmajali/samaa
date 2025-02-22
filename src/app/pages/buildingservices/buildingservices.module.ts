import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildingservicesPageRoutingModule } from './buildingservices-routing.module';

import { BuildingservicesPage } from './buildingservices.page';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    BuildingservicesPageRoutingModule
  ],
  declarations: [BuildingservicesPage]
})
export class BuildingservicesPageModule {}
