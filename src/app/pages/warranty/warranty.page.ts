import { Component, OnInit,ElementRef,ViewChild,Input } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController,AlertController} from "@ionic/angular";
import { Router,ActivatedRoute } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Browser } from '@capacitor/browser';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.page.html',
  styleUrls: ['./warranty.page.scss'],
})
export class WarrantyPage implements OnInit {
//label for page
public app_label_112:any;
public app_label_113:any;
public app_label_114:any;
public app_label_115:any;
public app_label_116:any;
public app_label_118:any;
public error_internet:any;
public warranty_start_date:any;
public warranty_end_date:any;
public warranty_details:any;
public warranty_file:any;
public warranty_ownership_date:any;
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
public returnContactsArray:any = [];
public returnDataCArray:any = [];
public returnContactsDataArray:any = [];
constructor(private callNumber: CallNumber,private appinformationService: AppinformationService,private usersService: UsersService,private activaterouter: ActivatedRoute,private alertController: AlertController,private modalController: ModalController,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
  this.platform.backButton.subscribeWithPriority(10, () => {
    this.navCtrl.navigateRoot("/tabs/account");
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
  this.translate.get('app_label_112').subscribe((res: string) => {
    this.app_label_112 = res;
  });
  this.translate.get('app_label_113').subscribe((res: string) => {
    this.app_label_113 = res;
  });
  this.translate.get('app_label_114').subscribe((res: string) => {
    this.app_label_114 = res;
  });
  this.translate.get('app_label_115').subscribe((res: string) => {
    this.app_label_115 = res;
  });
  this.translate.get('app_label_116').subscribe((res: string) => {
    this.app_label_116 = res;
  });
  this.translate.get('app_label_118').subscribe((res: string) => {
    this.app_label_118 = res;
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
    await this.getWarrantyData();
  }
  async getWarrantyData(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    let sendValues = {'building_id':this.building_id,'apartment_id':this.apartment_id,'user_id':this.userId};
    this.appinformationService.getGuaranteeDetails(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData;
          this.warranty_start_date =this.returnOperationData.guarantee_start_date;
          this.warranty_end_date =this.returnOperationData.guarantee_end_date; 
          this.warranty_details =this.returnOperationData.guarantee_details;
          this.warranty_file =this.returnOperationData.ownership_documentation;
          this.warranty_ownership_date =this.returnOperationData.ownership_date;
        }
      }).catch(error=>{
          this.getWarrantyData()
      });
    await loading.present();
  }
  async openFileUser(file:any){
    await Browser.open({ url: `${file}` });
  }
  goToBack(){
    this.navCtrl.navigateRoot("/tabs/account");
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
