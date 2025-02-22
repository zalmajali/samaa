import { Component, OnInit } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController,AlertController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {EditprofileComponent} from "../editprofile/editprofile.component";
import {ChangepasswordComponent} from "../changepassword/changepassword.component";
import {ApppagesComponent} from "../apppages/apppages.component";
import {AppinformationService} from "../../service/appinformation.service";
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  //label for page
  public account_title: any;
  public account_information: any;
  public account_change_password: any;
  public account_notification: any;
  public account_language: any;
  public account_dues: any;
  public account_warranty: any;
  public account_about: any;
  public account_contact: any;
  public account_privacy: any;
  public account_logout: any;
  public error_internet:any;
  public app_label_12:any;
  public app_label_13:any;
  public app_label_14:any;
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
 public returnPagesArray:any = [];
  constructor(private appinformationService: AppinformationService,private alertController: AlertController,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
    });
  }
  initialiseTranslation(){
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('account_title').subscribe((res: string) => {
      this.account_title = res;
    });
    this.translate.get('account_information').subscribe((res: string) => {
      this.account_information = res;
    });
    this.translate.get('account_change_password').subscribe((res: string) => {
      this.account_change_password = res;
    });
    this.translate.get('account_notification').subscribe((res: string) => {
      this.account_notification = res;
    });
    this.translate.get('account_language').subscribe((res: string) => {
      this.account_language = res;
    });
    this.translate.get('account_dues').subscribe((res: string) => {
      this.account_dues = res;
    });
    this.translate.get('account_warranty').subscribe((res: string) => {
      this.account_warranty = res;
    });
    this.translate.get('account_about').subscribe((res: string) => {
      this.account_about = res;
    });
    this.translate.get('account_contact').subscribe((res: string) => {
      this.account_contact = res;
    });
    this.translate.get('account_privacy').subscribe((res: string) => {
      this.account_privacy = res;
    });
    this.translate.get('account_logout').subscribe((res: string) => {
      this.account_logout = res;
    });
    this.translate.get('error_internet').subscribe((res: string) => {
      this.error_internet = res;
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

  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.user_type = await this.storage.get('user_type');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    await this.getPagesInformation();
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
  async getPagesInformation(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    let sendValues = {};
    this.appinformationService.getPages(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data;
          this.returnPagesArray=[];
          for(let i = 0; i < this.returnOperationData.length;i++){
            this.returnPagesArray[i]=[];
            this.returnPagesArray[i]['page_id'] = this.returnOperationData[i].page_id;
            if(this.language == 'ar')
              this.returnPagesArray[i]['page_name'] = this.returnOperationData[i].page_name_ar;
            else
              this.returnPagesArray[i]['page_name'] = this.returnOperationData[i].page_name_en;
          }
      }
    })
  }
  async goToEditProfile(){
    let model = await this.modalController.create({
      component:EditprofileComponent,
      animated:true,
      //componentProps:{eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId,propertyNumberRequired:propertyNumberRequired},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
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
 async goToChangePassword() {
    let model = await this.modalController.create({
      component:ChangepasswordComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async goToNotification() {
    this.user_type = await this.storage.get('user_type');
    if(this.user_type == 1)
      this.navCtrl.navigateRoot('/tabs/notifications');
    else
      this.navCtrl.navigateRoot('/tabsen/notifications');
  }
  goToLanguage() {
    this.router.navigate(['language']);
  }
  goToDues() {
    this.navCtrl.navigateRoot("/tabs/dues");
  }
  async goToWarranty() {
    this.navCtrl.navigateBack("warranty");
  }
  goToContact(){
    this.navCtrl.navigateBack("numbersdirectory");
  }
  async goToPages(pageId:any,pageName:any) {
    let model = await this.modalController.create({
      component:ApppagesComponent,
      componentProps:{pageId:pageId,pageName:pageName},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async signOut(){
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
            this.appinformationService.logout().then(async data=>{
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
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
