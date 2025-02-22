import { NgModule,NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtilitysdetailsPageRoutingModule } from './utilitysdetails-routing.module';

import { UtilitysdetailsPage } from './utilitysdetails.page';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    UtilitysdetailsPageRoutingModule
  ],
  declarations: [UtilitysdetailsPage]
})
export class UtilitysdetailsPageModule {}
