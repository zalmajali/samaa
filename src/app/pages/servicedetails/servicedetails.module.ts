import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicedetailsPageRoutingModule } from './servicedetails-routing.module';

import { ServicedetailsPage } from './servicedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicedetailsPageRoutingModule
  ],
  declarations: [ServicedetailsPage]
})
export class ServicedetailsPageModule {}
