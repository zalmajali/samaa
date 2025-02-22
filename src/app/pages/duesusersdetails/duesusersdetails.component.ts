import { Component, OnInit,Input  } from '@angular/core';
import {LoadingController,AlertController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
@Component({
  selector: 'app-duesusersdetails',
  templateUrl: './duesusersdetails.component.html',
  styleUrls: ['./duesusersdetails.component.scss'],
})
export class DuesusersdetailsComponent  implements OnInit {
  @Input() due_id: string | any;
  @Input() price: string | any;
  @Input() dues_date: string | any;
  @Input() apartment_number: string | any;
  @Input() description: string | any;
  @Input() payment_at: string | any;
  @Input() payment_note: string | any;
  @Input() review_at: string | any;
  @Input() review_by: string | any;
  @Input() owner_name: string | any;
  @Input() mobile_user: string | any;
  @Input() type_name: string | any;
  @Input() name_due: string | any;
  @Input() building_name: string | any;
  @Input() status: string | any;
  //label for page
  public app_label_11:any;
  public app_label_147:any;
  public app_label_148:any;
  public app_label_149:any;
  public app_label_150:any;
  public app_label_151:any;
  public app_label_152:any;
  public app_label_153:any;
  public app_label_154:any;
  public app_label_155:any;
  public app_label_156:any;
  public app_label_157:any;
  public app_label_145:any;
  public app_label_146:any;
  public app_label_133:any;
  public app_label_134:any;
  public app_label_79:any;
  public app_label_80:any;
  public dues_status:any;
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
constructor(private callNumber: CallNumber,private appinformationService: AppinformationService,private usersService: UsersService,private alertController: AlertController,private modalController: ModalController,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
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
  this.translate.get('app_label_147').subscribe((res: string) => {
    this.app_label_147 = res;
  });
  this.translate.get('app_label_148').subscribe((res: string) => {
    this.app_label_148 = res;
  });
  this.translate.get('app_label_149').subscribe((res: string) => {
    this.app_label_149 = res;
  });
  this.translate.get('app_label_150').subscribe((res: string) => {
    this.app_label_150 = res;
  });
  this.translate.get('app_label_151').subscribe((res: string) => {
    this.app_label_151 = res;
  });
  this.translate.get('app_label_152').subscribe((res: string) => {
    this.app_label_152 = res;
  });
  this.translate.get('app_label_153').subscribe((res: string) => {
    this.app_label_153 = res;
  });
  this.translate.get('app_label_154').subscribe((res: string) => {
    this.app_label_154 = res;
  });
  this.translate.get('app_label_155').subscribe((res: string) => {
    this.app_label_155 = res;
  });
  this.translate.get('app_label_156').subscribe((res: string) => {
    this.app_label_156 = res;
  });
  this.translate.get('app_label_157').subscribe((res: string) => {
    this.app_label_157 = res;
  });
  this.translate.get('app_label_145').subscribe((res: string) => {
    this.app_label_145 = res;
  });
  this.translate.get('app_label_146').subscribe((res: string) => {
    this.app_label_146 = res;
  });
  this.translate.get('app_label_133').subscribe((res: string) => {
    this.app_label_133 = res;
  });
  this.translate.get('app_label_134').subscribe((res: string) => {
    this.app_label_134 = res;
  });
  this.translate.get('app_label_79').subscribe((res: string) => {
    this.app_label_79 = res;
  });
  this.translate.get('app_label_80').subscribe((res: string) => {
    this.app_label_80 = res;
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
    if(this.status == 0){
      this.dues_status = this.app_label_146; 
    }
    if(this.status == 1){
      this.dues_status  = this.app_label_145; 
    }
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
