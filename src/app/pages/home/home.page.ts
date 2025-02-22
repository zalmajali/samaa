import { Component, OnInit } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController,AlertController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import { PushNotifications, Token } from '@capacitor/push-notifications';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //label for page
  public error_internet:any;
  public home_title:any;
  public app_label_17:any;
  public app_label_18:any;
  public app_label_19:any;
  public app_label_20:any;
  public app_label_21:any;
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
  public returnServicesArray:any = [];
  public returnUtilitiesArray:any = [];
  public dataServices:any;
  public dataUtilities:any;
  constructor(private appinformationService: AppinformationService,private alertController: AlertController,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/tabs/home");
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
    this.translate.get('home_title').subscribe((res: string) => {
      this.home_title = res;
    });
    this.translate.get('app_label_17').subscribe((res: string) => {
      this.app_label_17 = res;
    });
    this.translate.get('app_label_18').subscribe((res: string) => {
      this.app_label_18 = res;
    });
    this.translate.get('app_label_19').subscribe((res: string) => {
      this.app_label_19 = res;
    });
    this.translate.get('app_label_20').subscribe((res: string) => {
      this.app_label_20 = res;
    });
    this.translate.get('app_label_21').subscribe((res: string) => {
      this.app_label_21 = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    await this.saveUdidUser();
    this.user_type = await this.storage.get('user_type');
    this.name = await this.storage.get('name');
    this.building_id = await this.storage.get('building_id');
    this.apartment_id = await this.storage.get('apartment_id');
    this.userId = await this.storage.get('userId');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    await this.getInformationServPage();
    await this.getInformationUtilitiesOfPage();
    await loading.present();
  }
  async saveUdidUser(){
    PushNotifications.addListener('registration', async (tokenData: Token) => {
      //token.value
      this.token = await this.storage.get('token');
      this.userId = await this.storage.get('userId');
      if(this.token != null && this.token != undefined && this.userId != null && this.userId != undefined){
        let sendValues = {'user_id':this.userId,'udid':tokenData.value};
        this.usersService.userUdid(sendValues).then(async data=>{
        });
      }
    });
  }
  async getInformationServPage(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    let sendValues = {'building_id':this.building_id,'apartment_id':this.apartment_id,'user_id':this.userId,'type':'2'};
    this.appinformationService.getBuildingServicesForOwner(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data;
          this.returnServicesArray=[];
          for(let i = 0; i < this.returnOperationData.length;i++){
              this.returnServicesArray[i]=[];
              this.returnServicesArray[i]['service_id'] = this.returnOperationData[i].service_id;
              this.returnServicesArray[i]['service_price'] = this.returnOperationData[i].service_price;
              if(this.language == 'ar'){
                this.returnServicesArray[i]['service_name'] = this.returnOperationData[i].service_name_ar;
                this.returnServicesArray[i]['service_details'] = this.returnOperationData[i].service_details_ar;
              }
              else{
                this.returnServicesArray[i]['service_name'] = this.returnOperationData[i].service_name_en;
                this.returnServicesArray[i]['service_details'] = this.returnOperationData[i].service_details_en;
              }
          }
          let countOfData = this.returnServicesArray.length;
          if(countOfData == 0)
              this.dataServices = 0;
          else{
              this.dataServices = 1;
          }
      }else
          this.dataServices = 0;
    }).catch(error=>{
        this.getInformationServPage()
    });
  }
  async getInformationUtilitiesOfPage(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    let sendValues = {'building_id':this.building_id,'apartment_id':this.apartment_id,'user_id':this.userId};
    this.appinformationService.getBuildingUtilitiesForOwner(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data;
          this.returnUtilitiesArray=[];
          for(let i = 0; i < this.returnOperationData.length;i++){
              this.returnUtilitiesArray[i]=[];
              this.returnUtilitiesArray[i]['utility_id'] = this.returnOperationData[i].utility_id;
              this.returnUtilitiesArray[i]['utility_price'] = this.returnOperationData[i].utility_price;
              if(this.language == 'ar')
                this.returnUtilitiesArray[i]['utility_name'] = this.returnOperationData[i].utility_name_ar;
              else
                this.returnUtilitiesArray[i]['utility_name'] = this.returnOperationData[i].utility_name_en;
              if(this.returnOperationData[i].utility_images.length!=0)
                this.returnUtilitiesArray[i]['utility_images'] = this.returnOperationData[i].utility_images[0];
              else
                this.returnUtilitiesArray[i]['utility_images'] = "../../assets/img/banner.png";
          }
          let countOfData = this.returnUtilitiesArray.length;
          if(countOfData == 0)
              this.dataUtilities = 0;
          else{
              this.dataUtilities = 1;
          }
      }else
          this.dataUtilities = 0;
    }).catch(error=>{
        this.getInformationUtilitiesOfPage()
    });
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
  goToProfile(){
    this.navCtrl.navigateRoot("/tabs/account");
  }
  async utilitiesDatails(utility_id:any){
    this.navCtrl.navigateBack(["utilitysdetails",{utility_id:utility_id}]);
  }
  async serviceDetails(serv_id:any,serv_name:any,serv_price:any,serv_details:any){
    this.navCtrl.navigateBack(["servicedetails",{serv_id:serv_id,serv_name:serv_name,serv_price:serv_price,serv_details:serv_details}]);
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
  async goToNotification() {
    this.user_type = await this.storage.get('user_type');
    if(this.user_type == 1)
      this.navCtrl.navigateRoot('/tabs/notifications');
    else
      this.navCtrl.navigateRoot('/tabsen/notifications');
  }
}
