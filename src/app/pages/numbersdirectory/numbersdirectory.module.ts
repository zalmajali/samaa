import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NumbersdirectoryPageRoutingModule } from './numbersdirectory-routing.module';

import { NumbersdirectoryPage } from './numbersdirectory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NumbersdirectoryPageRoutingModule
  ],
  declarations: [NumbersdirectoryPage]
})
export class NumbersdirectoryPageModule {}
