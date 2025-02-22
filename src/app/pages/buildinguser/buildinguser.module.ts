import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildinguserPageRoutingModule } from './buildinguser-routing.module';

import { BuildinguserPage } from './buildinguser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildinguserPageRoutingModule
  ],
  declarations: [BuildinguserPage]
})
export class BuildinguserPageModule {}
