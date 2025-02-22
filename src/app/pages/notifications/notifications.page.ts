import { Component, OnInit } from '@angular/core';
import {LoadingController,AlertController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
//label for page
public app_label_175:any;
public app_label_9:any;
public app_label_10:any;
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
public returnNotficationArray:any = [];
public lastScrollTop = 0;
public notfication:any;
constructor(private appinformationService: AppinformationService,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController,private alertController:AlertController) { 
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
    this.translate.get('error_internet').subscribe((res: string) => {
        this.error_internet = res;
    });
    this.translate.get('app_label_175').subscribe((res: string) => {
        this.app_label_175 = res;
    });
    this.translate.get('app_label_9').subscribe((res: string) => {
        this.app_label_9 = res;
    });
    this.translate.get('app_label_10').subscribe((res: string) => {
        this.app_label_10 = res;
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
async ngOnInit() {
    this.loopingNumber = 1;
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    const status = await Network.getStatus();
    if(!status.connected) {
        this.displayResult(this.error_internet);
    }
    this.userId = await this.storage.get('userId');
    await this.getNotficationUser();
}
async getNotficationUser(){
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
    let sendValues = {'user_id':`${this.userId}`,'limit':`${limitNew}`};
    this.appinformationService.getNotifications(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data;
          this.returnNotficationArray=[];
          for(let i = 0; i < this.returnOperationData.length;i++){
              this.returnNotficationArray[i]=[];
              this.returnNotficationArray[i]['title'] = this.returnOperationData[i].title;
              this.returnNotficationArray[i]['body'] = this.returnOperationData[i].body;
              let fruits = this.returnOperationData[i].date.split("T");
              this.returnNotficationArray[i]['date'] = fruits[0];
          }
          let countOfData = this.returnNotficationArray.length;
          if(countOfData == 0)
              this.notfication = 0;
          else{
              this.notfication = 1;
          }
      }else
          this.notfication = 0;
    }).catch(error=>{
        this.getNotficationUser()
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
       this.getNotficationUser()
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
async goToProfile(){
    this.user_type = await this.storage.get('user_type');
    if(this.user_type == 1)
        this.navCtrl.navigateRoot("/tabs/account");
    else
      this.navCtrl.navigateRoot("/tabsen/account");
  }
}
