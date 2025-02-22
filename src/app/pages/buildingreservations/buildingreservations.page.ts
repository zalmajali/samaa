import { Component, OnInit } from '@angular/core';
import {LoadingController,AlertController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import {SearchutilityenComponent} from "../searchutilityen/searchutilityen.component";
import {BookingstatusComponent} from "../bookingstatus/bookingstatus.component";
import {BookingdetailsComponent} from "../bookingdetails/bookingdetails.component";
@Component({
  selector: 'app-buildingreservations',
  templateUrl: './buildingreservations.page.html',
  styleUrls: ['./buildingreservations.page.scss'],
})
export class BuildingreservationsPage implements OnInit {
//label for page
public app_label_98:any;//title
public app_label_84:any;//رقم الحجز
public app_label_34:any;//price
public app_label_9:any;//nod
public app_label_10:any;//noda
public app_label_85:any;//sts 0
public app_label_86:any;//sts 1
public app_label_87:any;//sts 2
public app_label_61:any;//build
public app_label_62:any;//aprt
public app_label_7:any;//appro
public app_label_8:any;//reject
public app_label_12:any;//yes
public app_label_13:any;//no
public app_label_14:any;//are u sh
public utility_id:any;
public apartment_data:any;
public building_data:any;
public from_date:any;
public to_date:any;
public note:any;
public status_data:any;
public from_price:any;
public to_price:any;
public building_data_index:any;
public error_internet:any;
public loopingNumber:any = 1;
//menu lable
public dir: any;
public floatD: any;
//system label
public checkLanguage: any=0;
public language: any;
//login label
public token:any;
public userId:any;
public mobile:any;
public name:any;
public user_type:any;
public building_id:any;
public apartment_id:any;
public email:any;
public password:any;
//return result
public returnResultData:any;
public returnOperationData: any;
public returnUtilityOrdersArray:any = [];
public dataUtility:any;
public lastScrollTop = 0;
constructor(private callNumber: CallNumber,private appinformationService: AppinformationService,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController,private alertController:AlertController) { 
  this.platform.backButton.subscribeWithPriority(10, () => {
    this.navCtrl.navigateRoot("/tabsen/home");
  });
}
initialiseTranslation(){
  this.translate.get('dir').subscribe((res: string) => {
    this.dir = res;
  });
  this.translate.get('floatD').subscribe((res: string) => {
    this.floatD = res;
  });
  this.translate.get('error_internet').subscribe((res: string) => {
    this.error_internet = res;
  });
  this.translate.get('app_label_98').subscribe((res: string) => {
      this.app_label_98 = res;
  });
  this.translate.get('app_label_84').subscribe((res: string) => {
    this.app_label_84 = res;
  });
  this.translate.get('app_label_34').subscribe((res: string) => {
      this.app_label_34 = res;
  });
  this.translate.get('app_label_9').subscribe((res: string) => {
      this.app_label_9 = res;
  });
  this.translate.get('app_label_10').subscribe((res: string) => {
      this.app_label_10 = res;
  });  
  this.translate.get('app_label_85').subscribe((res: string) => {
      this.app_label_85 = res;
  });
   this.translate.get('app_label_86').subscribe((res: string) => {
      this.app_label_86 = res;
  });
   this.translate.get('app_label_87').subscribe((res: string) => {
      this.app_label_87 = res;
  });
   this.translate.get('app_label_61').subscribe((res: string) => {
      this.app_label_61 = res;
  });
  this.translate.get('app_label_62').subscribe((res: string) => {
      this.app_label_62 = res;
  });
  this.translate.get('app_label_7').subscribe((res: string) => {
      this.app_label_7 = res;
  });
  this.translate.get('app_label_8').subscribe((res: string) => {
      this.app_label_8 = res;
  });
  this.translate.get('app_label_12').subscribe((res: string) => {
      this.app_label_12 = res;
  });
    this.translate.get('app_label_13').subscribe((res: string) => {
      this.app_label_13 = res;
  });
    this.translate.get('app_label_14').subscribe((res: string) => {
      this.app_label_14 = res;
  });
}
onScroll(event: any) {
  this.lastScrollTop = event.detail.scrollTop;
}
refrechPage(event:any){
  this.ngOnInit();
  setTimeout(() => {
      event.detail.complete();
    }, 2000);
}
async goToSearch(){
  let model = await this.modalController.create({
    component:SearchutilityenComponent,
    componentProps:{building_data:this.building_data,utility_id:this.utility_id,apartment_data:this.apartment_data,from_date:this.from_date,to_date:this.to_date,note:this.note,from_price:this.from_price,to_price:this.to_price,status_data:this.status_data,index_data:this.building_data_index},
    animated:true,
    cssClass:"modalFilterSortCss"
  });
  model.onDidDismiss().then((data):any=>{
    this.building_data = data.data.building_data
    this.utility_id = data.data.utility_id_data
    this.apartment_data = data.data.apartment_data
    this.from_date = data.data.from_date_data
    this.to_date = data.data.to_date_data
    this.note = data.data.note_data
    this.from_price = data.data.from_price_data
    this.to_price = data.data.to_price_data
    this.status_data = data.data.status_data
    this.building_data_index = data.data.index_data
    this.getUserOrdersUtility(data.data.building_data,data.data.utility_id_data,data.data.apartment_data,data.data.from_date_data,data.data.to_date_data,data.data.note_data,data.data.from_price_data,data.data.to_price_data,data.data.status_data)
  });
  await model.present();
}
async ngOnInit() {
  this.loopingNumber = 1;
  await this.getDeviceLanguage();
  await this.checkLoginUser();
  this.user_type = await this.storage.get('user_type');
  this.building_id = await this.storage.get('building_id');
  this.building_data = await this.storage.get('building_id');
  this.apartment_id = await this.storage.get('apartment_id');
  this.userId = await this.storage.get('userId');
  this.token = await this.storage.get('token');
  const status = await Network.getStatus();
  if(!status.connected) {
    this.displayResult(this.error_internet);
  }
  await this.getUserOrdersUtility();
}
async getUserOrdersUtility(building_data:any="",utility_id:any="",apartment_data:any="",from_date:any="",to_date:any="",note:any="",from_price:any="",to_price:any="",status_data:any=""){
  let limitNew = this.loopingNumber;
  const status = await Network.getStatus();
  if(!status.connected) {
    this.displayResult(this.error_internet);
  }
  const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
  });
  let building = this.building_id
  if(building_data!="" && !Array.isArray(building_data))
    building = [building_data]
  let sendValues = {'building_id':building,'user_id':`${this.userId}`,'status':`${status_data}`,'apartment_id':`${apartment_data}`,'utility_id':`${utility_id}`,'from_date':`${from_date}`,'to_date':`${to_date}`,'description':`${note}`,'from_price':`${from_price}`,'to_price':`${to_price}`,'limit':`${limitNew}`};
  this.appinformationService.getUtilitiesBookingInBuildingForOfficer(sendValues).then(async data=>{
    this.returnResultData = data;
    let errorData = this.returnResultData.status;
    if(errorData == 1){
        this.returnOperationData = this.returnResultData.data;
        this.returnUtilityOrdersArray=[];
        for(let i = 0; i < this.returnOperationData.length;i++){
            this.returnUtilityOrdersArray[i]=[];
            this.returnUtilityOrdersArray[i]['booking_id'] = this.returnOperationData[i].booking_id;
            this.returnUtilityOrdersArray[i]['owner_name'] = this.returnOperationData[i].owner_name;
            this.returnUtilityOrdersArray[i]['apartment_number'] = this.returnOperationData[i].apartment_number;
            this.returnUtilityOrdersArray[i]['utility_id'] = this.returnOperationData[i].utility_id;
            this.returnUtilityOrdersArray[i]['price'] = this.returnOperationData[i].price;
            this.returnUtilityOrdersArray[i]['owner_name'] = this.returnOperationData[i].owner_name;
            this.returnUtilityOrdersArray[i]['mobile'] = this.returnOperationData[i].mobile;
            this.returnUtilityOrdersArray[i]['apartment_number'] = this.returnOperationData[i].apartment_number;
            this.returnUtilityOrdersArray[i]['start_time'] = this.returnOperationData[i].start_time;
            this.returnUtilityOrdersArray[i]['end_time'] = this.returnOperationData[i].end_time;
            this.returnUtilityOrdersArray[i]['description'] = this.returnOperationData[i].description;
            this.returnUtilityOrdersArray[i]['statusUse'] = this.returnOperationData[i].status;
            if(this.language == 'ar'){
              this.returnUtilityOrdersArray[i]['building_name'] = this.returnOperationData[i].building_ar;
              this.returnUtilityOrdersArray[i]['utility_name'] = this.returnOperationData[i].utility_name_ar;
              this.returnUtilityOrdersArray[i]['description'] = this.returnOperationData[i].utility_description_ar;
            }
            else{
              this.returnUtilityOrdersArray[i]['description'] = this.returnOperationData[i].utility_description_en;
              this.returnUtilityOrdersArray[i]['building_name'] = this.returnOperationData[i].building_en;
              this.returnUtilityOrdersArray[i]['utility_name'] = this.returnOperationData[i].utility_name_en;
            }
            if(this.returnOperationData[i].status == 0){
              this.returnUtilityOrdersArray[i]['status']  = this.app_label_85; 
              this.returnUtilityOrdersArray[i]['utility_status_color']  = "#5c7784";
            }
            if(this.returnOperationData[i].status == 1){
              this.returnUtilityOrdersArray[i]['status']  = this.app_label_86; 
              this.returnUtilityOrdersArray[i]['utility_status_color'] = "#057005";
            }
            if(this.returnOperationData[i].status == 2){
              this.returnUtilityOrdersArray[i]['status']  = this.app_label_87; 
              this.returnUtilityOrdersArray[i]['utility_status_color']= "#f21707";
            }
        }
        let countOfData = this.returnUtilityOrdersArray.length;
        if(countOfData == 0)
            this.dataUtility = 0;
        else{
            this.dataUtility = 1;
        }
    }else
        this.dataUtility = 0;
  }).catch(error=>{
      this.getUserOrdersUtility(building,utility_id,apartment_data,from_date,to_date,note,from_price,to_price,status_data)
  });
  await loading.present();
}
async checkLoginUser(){
  this.token = await this.storage.get('token');
  this.userId = await this.storage.get('userId');
  this.email = await this.storage.get('email');
  this.password = await this.storage.get('password');
  if(this.token == null || this.token == undefined || this.userId == null || this.userId == undefined || this.password == null || this.password == undefined || this.email == null || this.email == undefined){
    this.storage.remove('token');
    this.storage.remove('userId');
    this.storage.remove('name');
    this.storage.remove('mobile');
    this.storage.remove('user_type');
    this.storage.remove('building_id');
    this.storage.remove('apartment_id');
    this.storage.remove('email');
    this.storage.remove('password');
    this.navCtrl.navigateRoot('login');
  }
}
loadMoreData(event:any) {
  this.loopingNumber++;
  setTimeout(() => {
    if(this.lastScrollTop!=0)
     this.getUserOrdersUtility(this.building_data,this.utility_id,this.apartment_data,this.from_date,this.to_date,this.note,this.from_price,this.to_price,this.status_data)
    event.target.complete();
  }, 2000);
}
async getDeviceLanguage() {
  await this.storage.get('checkLanguage').then(async checkLanguage=>{
    this.checkLanguage = checkLanguage
  });
  if(this.checkLanguage!=undefined && this.checkLanguage!=null && this.checkLanguage!=""){
    this.translate.setDefaultLang(this.checkLanguage);
    this.language = this.checkLanguage;
    this.translate.use(this.language);
    this.initialiseTranslation();
  }else{
    const info = await Device.getLanguageCode();
    this.translate.setDefaultLang(info.value); // اللغة الافتراضية
     this.translate.use(info.value);
    this.language = info.value;
    this.initialiseTranslation();
  }
}
async changeBockingStatus(booking_id:any,status:any){
  const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message:this.app_label_14,
      buttons: [
        {
          text: this.app_label_13,
          cssClass: 'alertButton',
          handler: () => {
          }
        }, {
          text: this.app_label_12,
          cssClass: 'alertButton',
          handler: async () => {
            let model = await this.modalController.create({
              component:BookingstatusComponent,
              componentProps:{booking_id:booking_id,status:status},
              animated:true,
              cssClass:"modalFilterSortCss"
            });
            model.onDidDismiss().then((data):any=>{
              this.ngOnInit();
            });
            await model.present();
          }
        }
      ]
    });
    await alert.present();
}
async goToBookingdetails(booking_id:any,description:any,mobile:any){
  let model = await this.modalController.create({
    component:BookingdetailsComponent,
    componentProps:{booking_id:booking_id,description:description,mobileUser:mobile},
    animated:true,
    cssClass:"modalFilterSortCss"
  });
  model.onDidDismiss().then((data):any=>{
  });
  await model.present();
}
async displayResult(message:any){
  let toast = await this.toastCtrl.create({
    message: message,
    duration: 4000,
    position: 'bottom',
    cssClass:"toastStyle",
    color:""
  });
  await toast.present();
}
  goToProfile(){
    this.navCtrl.navigateRoot("/tabsen/account");
  }

}
