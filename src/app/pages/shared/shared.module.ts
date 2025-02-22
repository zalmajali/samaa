import { NgModule,NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from "../search/search.component";
import {EditprofileComponent} from "../editprofile/editprofile.component";
import {ChangepasswordComponent} from "../changepassword/changepassword.component";
import {ApppagesComponent} from "../apppages/apppages.component";
import {AddserviceComponent} from "../addservice/addservice.component";
import {RequestdetailsComponent} from "../requestdetails/requestdetails.component";
import {OrderdetailsComponent} from "../orderdetails/orderdetails.component";
import {RateserviceComponent} from "../rateservice/rateservice.component";
import {RequestbuilddetailsComponent} from "../requestbuilddetails/requestbuilddetails.component";
import {SearchservenComponent} from "../searchserven/searchserven.component";
import {RequeststatusComponent} from "../requeststatus/requeststatus.component";
import {OrderbuilddetailsComponent} from "../orderbuilddetails/orderbuilddetails.component";
import {OrderstatusComponent} from "../orderstatus/orderstatus.component";
import {UtilitydetailsComponent} from "../utilitydetails/utilitydetails.component";
import {UtilityorderdetailsComponent} from "../utilityorderdetails/utilityorderdetails.component";
import {UtilitysearchComponent} from "../utilitysearch/utilitysearch.component";
import {UtilityaddComponent} from "../utilityadd/utilityadd.component";
import {SearchutilityenComponent} from "../searchutilityen/searchutilityen.component";
import {BookingstatusComponent} from "../bookingstatus/bookingstatus.component";
import {BookingdetailsComponent} from "../bookingdetails/bookingdetails.component";
import {ShowdisclaimerComponent} from "../showdisclaimer/showdisclaimer.component";
import {SearcusersComponent} from "../searcusers/searcusers.component";
import {EditwarrantyComponent} from "../editwarranty/editwarranty.component";
import {SearchduesComponent} from "../searchdues/searchdues.component";
import {DuespayComponent} from "../duespay/duespay.component";
import {DuesdetailsComponent} from "../duesdetails/duesdetails.component";
import {DuesuserssearchComponent} from "../duesuserssearch/duesuserssearch.component";
import {DuesusersdetailsComponent} from "../duesusersdetails/duesusersdetails.component";
import {AdddueComponent} from "../adddue/adddue.component";
import {DuesreviewComponent} from "../duesreview/duesreview.component";
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  declarations: [SearchComponent,DuesreviewComponent,AdddueComponent,DuesusersdetailsComponent,DuesuserssearchComponent,SearchduesComponent,DuespayComponent,DuesdetailsComponent,EditwarrantyComponent,SearcusersComponent,ShowdisclaimerComponent,BookingdetailsComponent,BookingstatusComponent,SearchutilityenComponent,UtilityaddComponent,EditprofileComponent,UtilitysearchComponent,ChangepasswordComponent,UtilityorderdetailsComponent,UtilitydetailsComponent,RateserviceComponent,OrderstatusComponent,OrderbuilddetailsComponent,RequeststatusComponent,SearchservenComponent,RequestbuilddetailsComponent,OrderdetailsComponent,RequestdetailsComponent,AddserviceComponent,ApppagesComponent],
  imports: [
    CommonModule
  ],
  exports: [SearchComponent,DuesreviewComponent,AdddueComponent,DuesusersdetailsComponent,DuesuserssearchComponent,SearchduesComponent,DuespayComponent,DuesdetailsComponent,SearcusersComponent,EditwarrantyComponent,SearchutilityenComponent,ShowdisclaimerComponent,BookingdetailsComponent,BookingstatusComponent,UtilityaddComponent,EditprofileComponent,UtilitysearchComponent,ChangepasswordComponent,UtilityorderdetailsComponent,RateserviceComponent,OrderstatusComponent,OrderbuilddetailsComponent,RequeststatusComponent,SearchservenComponent,RequestbuilddetailsComponent,OrderdetailsComponent,RequestdetailsComponent,AddserviceComponent,ApppagesComponent]
})
export class SharedModule { }
