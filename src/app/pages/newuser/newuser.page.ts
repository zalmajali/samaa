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
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage implements OnInit {
//label for page
public request_title: any;
public error_internet:any;
public app_label_1:any;
public app_label_2:any;
public app_label_3:any;
public app_label_4:any;
public app_label_5:any;
public app_label_6:any;
public app_label_7:any;
public app_label_8:any;
public app_label_9:any;
public app_label_10:any;
public app_label_11:any;
public app_label_12:any;
public app_label_13:any;
public app_label_14:any;
public app_label_15:any;
public app_label_16:any;
public card_style_Color:any;
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
public returnResultDataStatuse: any;
public returnNewUserArray:any = [];
public newUser:any;
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
    this.translate.get('request_title').subscribe((res: string) => {
      this.request_title = res;
    });
    this.translate.get('error_internet').subscribe((res: string) => {
      this.error_internet = res;
    });
    this.translate.get('app_label_1').subscribe((res: string) => {
        this.app_label_1 = res;
    });
    this.translate.get('app_label_2').subscribe((res: string) => {
        this.app_label_2 = res;
    });
    this.translate.get('app_label_3').subscribe((res: string) => {
        this.app_label_3 = res;
    });
    this.translate.get('app_label_4').subscribe((res: string) => {
        this.app_label_4 = res;
    });
    this.translate.get('app_label_5').subscribe((res: string) => {
        this.app_label_5 = res;
    });
    this.translate.get('app_label_6').subscribe((res: string) => {
        this.app_label_6= res;
    });
    this.translate.get('app_label_7').subscribe((res: string) => {
        this.app_label_7 = res;
    });
    this.translate.get('app_label_8').subscribe((res: string) => {
        this.app_label_8 = res;
    });  
    this.translate.get('app_label_9').subscribe((res: string) => {
        this.app_label_9 = res;
    });
    this.translate.get('app_label_10').subscribe((res: string) => {
        this.app_label_10 = res;
    });  
    this.translate.get('app_label_11').subscribe((res: string) => {
        this.app_label_11 = res;
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
    this.translate.get('app_label_15').subscribe((res: string) => {
        this.app_label_15 = res;
    }); 
    this.translate.get('app_label_16').subscribe((res: string) => {
        this.app_label_16 = res;
    }); 
    this.translate.get('card_style_Color').subscribe((res: string) => {
        this.card_style_Color = res;
    });  
  }
  refrechPage(event:any){
    this.ngOnInit();
    setTimeout(() => {
        event.detail.complete();
      }, 2000);
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.user_type = await this.storage.get('user_type');
    this.building_id = await this.storage.get('building_id');
    this.token = await this.storage.get('token');
    this.userId = await this.storage.get('userId');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    await this.getAllNewUser();
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
  async getAllNewUser(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
    });
    let sendValues = {'building_id':this.building_id,'user_id':this.userId,"status":"0"};
    this.appinformationService.getUsersByBuilding(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
            this.returnOperationData = this.returnResultData.data;
            this.returnNewUserArray=[];
            for(let i = 0; i < this.returnOperationData.length;i++){
                this.returnNewUserArray[i]=[];
                this.returnNewUserArray[i]['user_id'] = this.returnOperationData[i].user_id;
                this.returnNewUserArray[i]['name'] = this.returnOperationData[i].name;
                this.returnNewUserArray[i]['email'] = this.returnOperationData[i].email;
                this.returnNewUserArray[i]['mobile'] = this.returnOperationData[i].mobile;
                this.returnNewUserArray[i]['ownership_id'] = this.returnOperationData[i].ownership_id;
                this.returnNewUserArray[i]['ownership_documentation'] = this.returnOperationData[i].ownership_documentation;
                this.returnNewUserArray[i]['ownership_date'] = this.returnOperationData[i].ownership_date;
                this.returnNewUserArray[i]['apartment_number'] = this.returnOperationData[i].apartment_number;
                this.returnNewUserArray[i]['building_id'] = this.returnOperationData[i].building_id;
                if(this.language == 'ar')
                    this.returnNewUserArray[i]['building_name'] = this.returnOperationData[i].building_name_ar;
                else
                    this.returnNewUserArray[i]['building_name'] = this.returnOperationData[i].building_name_en;
            }
            let countOfData = this.returnNewUserArray.length;
            if(countOfData == 0)
                this.newUser = 0;
            else{
                this.newUser = 1;
            }
        }else
            this.newUser = 0;
    }).catch(error=>{
        this.getAllNewUser()
    });
    await loading.present();
  }
  callNumberUser(mobile:any){
    this.callNumber.callNumber(mobile, true)
    .then(res => {
    }).catch(err =>{
        this.displayResult(this.app_label_11);
    });
  }
  async sendEmailUser(email:any){
    await Browser.open({ url: `mailto:${email}` });
  }
  async openFileUser(file:any){
    await Browser.open({ url: `${file}` });
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
  async changeStatus(ownershipId:any,statusUser:any){
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
              let sendValues = {'ownership_id':ownershipId,status:statusUser};
              this.appinformationService.updateOwnershipStatus(sendValues).then(async data=>{
                this.returnResultDataStatuse = data;
                let errorData = this.returnResultDataStatuse.status;
                if(errorData == 1){
                    this.displayResult(this.app_label_15);
                }else{
                    this.displayResult(this.app_label_16);
                }
              });

            }
          }
        ]
      });
      await alert.present();
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
