import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
   //label for page
   public forgot_password:any;
   public forgot_password_button:any;
   public login_button:any;
   public error_internet:any;
   //label for design
   public title_border:any;
  //checkemail information
  public emailUser: any;
  public errorEmailUser:any="";
  public isErrorEmailUser:any = 1;
  public email_field:any;
  public enter_email_field_one:any;
  public enter_email_field_tow:any;
  public error_message_email_user_name:any;
  //menu lable
  public dir: any;
  public floatD: any;
  //system label
  public checkLanguage: any=0;
  public language: any;
  //return result
  public returnResultData:any;
  public forgot_password_error_one:any;
  public forgot_password_error_tow:any;
  public forgot_password_error_three:any;
  public forgot_password_error_fore:any;
  public forgot_password_error_five:any;
  constructor(private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/login");
    });
  }
  initialiseTranslation(){
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('login_button').subscribe((res: string) => {
      this.login_button = res;
    });
    this.translate.get('email_field').subscribe((res: string) => {
      this.email_field = res;
    });
    this.translate.get('forgot_password').subscribe((res: string) => {
      this.forgot_password = res;
    });
    this.translate.get('enter_email_field_one').subscribe((res: string) => {
      this.enter_email_field_one = res;
    });
    this.translate.get('enter_email_field_one').subscribe((res: string) => {
      this.enter_email_field_one = res;
    });
    this.translate.get('enter_email_field_tow').subscribe((res: string) => {
      this.enter_email_field_tow = res;
    });
    this.translate.get('title_border').subscribe((res: string) => {
      this.title_border = res;
    });
    this.translate.get('forgot_password_button').subscribe((res: string) => {
      this.forgot_password_button = res;
    });
    this.translate.get('forgot_password_error_one').subscribe((res: string) => {
      this.forgot_password_error_one = res;
    });
    this.translate.get('forgot_password_error_tow').subscribe((res: string) => {
      this.forgot_password_error_tow = res;
    });
    this.translate.get('forgot_password_error_three').subscribe((res: string) => {
      this.forgot_password_error_three = res;
    });
    this.translate.get('forgot_password_error_fore').subscribe((res: string) => {
      this.forgot_password_error_fore = res;
    });
    this.translate.get('forgot_password_error_five').subscribe((res: string) => {
      this.forgot_password_error_five = res;
    });
    this.translate.get('error_internet').subscribe((res: string) => {
      this.error_internet = res;
    });
  }
  checkEmailUser(event:any){
     this.emailUser = event.target.value;
    if(this.emailUser == "" || this.emailUser == undefined){
      this.errorEmailUser = "errorStyleEmpty";
      this.error_message_email_user_name = this.enter_email_field_one;
      this.isErrorEmailUser = 0;
    }else{
      let checkVal = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!checkVal.test(this.emailUser)){
        this.errorEmailUser = "errorStyleEmpty";
        this.error_message_email_user_name = this.enter_email_field_tow;
        this.isErrorEmailUser = 0;
      }else{
        this.errorEmailUser = "successStyleFull";
        this.isErrorEmailUser = 1;
      }
    }
  }
  async ngOnInit() {
    this.getDeviceLanguage();
    this.storage.remove('token');
    this.storage.remove('userId');
    this.storage.remove('password');
    this.storage.remove('email');
    this.storage.remove('name');
    this.storage.remove('mobile');
    this.storage.remove('user_type');
    this.storage.remove('building_id');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
  }
  async forgotpassword(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    if(this.emailUser == undefined || this.emailUser == ""){
      this.errorEmailUser = "errorStyleEmpty";
      this.isErrorEmailUser = 0;
      this.error_message_email_user_name = this.enter_email_field_one;
      return false;
    }
    if(this.emailUser != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'email':this.emailUser};//,'udid':this.udid
      this.usersService.forgotPassword(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
          this.displayResult(this.forgot_password_error_one);
          this.navCtrl.navigateRoot("/login");
        }else if(errorData == 2){
          this.displayResult(this.forgot_password_error_tow);
        }else if(errorData == 3){
          this.displayResult(this.forgot_password_error_three);
        }else if(errorData == 4){
          this.displayResult(this.forgot_password_error_fore);
        }else if(errorData == 5){
          this.displayResult(this.forgot_password_error_five);
        }
      });
      await loading.present();
    }
    return true;
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
  goToLogin() {
    this.router.navigate(['login']);
  }
}
