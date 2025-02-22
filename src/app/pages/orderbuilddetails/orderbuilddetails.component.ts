import { Component, OnInit,Input } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController,AlertController} from "@ionic/angular";
import { Router,ActivatedRoute } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
@Component({
  selector: 'app-orderbuilddetails',
  templateUrl: './orderbuilddetails.component.html',
  styleUrls: ['./orderbuilddetails.component.scss'],
})
export class OrderbuilddetailsComponent  implements OnInit {
  @Input() order_id: string | any;
  @Input() request_id: string | any;
  @Input() type: string | any;
  @Input() owner_name: string | any;
  @Input() mobile_user: string | any;
  @Input() apartment_number: string | any;
  @Input() building_name: string | any;
//post data
public app_label_22:any;
public app_label_23:any;
public app_label_45:any;
public app_label_46:any;
public app_label_11:any;
public service_price:any;
public service_schedule_date:any;
public service_schedule_time:any;
public service_description:any;
public service_type:any;
public service_name:any;
public service_status:any;
public service_status_color:any;
//label for page
public error_internet:any;
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
constructor(private callNumber: CallNumber,private appinformationService: AppinformationService,private usersService: UsersService,private activaterouter: ActivatedRoute,private alertController: AlertController,private modalController: ModalController,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
  this.platform.backButton.subscribeWithPriority(10, () => {
    this.modalController.dismiss({})
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
  this.translate.get('app_label_22').subscribe((res: string) => {
    this.app_label_22 = res;
  });
  this.translate.get('app_label_23').subscribe((res: string) => {
    this.app_label_23 = res;
  });
  this.translate.get('app_label_45').subscribe((res: string) => {
    this.app_label_45 = res;
  });
  this.translate.get('app_label_46').subscribe((res: string) => {
    this.app_label_46 = res;
  });
  this.translate.get('app_label_11').subscribe((res: string) => {
    this.app_label_11 = res;
  });
}
callNumberUser(mobile:any){
  this.callNumber.callNumber(mobile, true)
  .then(res => {
  }).catch(err =>{
      this.displayResult(this.app_label_11);
  });
}
async ngOnInit() {
await this.getDeviceLanguage();
  await this.checkLoginUser();
  this.user_type = await this.storage.get('user_type');
  this.building_id = await this.storage.get('building_id');
  this.apartment_id = await this.storage.get('apartment_id');
  this.userId = await this.storage.get('userId');
  this.user_type = await this.storage.get('user_type');
  const status = await Network.getStatus();
  if(!status.connected) {
    this.displayResult(this.error_internet);
  }
  await this.getRequestData()
}
async getRequestData(){
  const status = await Network.getStatus();
  if(!status.connected) {
    this.displayResult(this.error_internet);
  }
  const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
  });
  let sendValues = {'building_id':this.building_id,'user_id':`${this.userId}`,'request_id':`${this.request_id}`,};
  this.appinformationService.getRequestInfo(sendValues).then(async data=>{
    this.returnResultData = data;
    let errorData = this.returnResultData.status;
    if(errorData == 1){
        this.returnOperationData = this.returnResultData.data[0];
        this.service_price = this.returnOperationData.service_price;
        let fruits = this.returnOperationData.service_schedule_time.split(" ");
        this.service_schedule_date = fruits[1];
        this.service_schedule_time = fruits[0];
        this.service_description = this.returnOperationData.service_description;
        if(this.returnOperationData.service_type == 0)
          this.service_type = this.app_label_45;
        else
        this.service_type = this.app_label_46;
        if(this.language == 'ar')
            this.service_name = this.returnOperationData.service_name_ar;
        else
            this.service_name = this.returnOperationData.service_name_en;
    }
  }).catch(error=>{
      this.getRequestData()
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
closePage(){
  this.modalController.dismiss({
  })
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
}
