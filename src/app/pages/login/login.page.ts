import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //label for page
  public login_title:any;
  public forgot_password:any;
  public add_account:any;
  public add_account_or:any;
  public login_button:any;
  public showPassword: boolean = false;
  public error_internet:any;
  //label for design
  public title_border:any;
  //label for form
  //check email
  //checkemail information
  public emailUser: any;
  public errorEmailUser:any="";
  public isErrorEmailUser:any = 1;
  public email_field:any;
  public enter_email_field_one:any;
  public enter_email_field_tow:any;
  public error_message_email_user_name:any;
  //checkPassawrd information
  public userPassword: any;
  public errorUserPassword:any="";
  public isErrorUserPassword:any = 1;
  public password_field:any;
  public enter_password_field:any;
  //system label
  public checkLanguage: any=0;
  public language: any;
  //menu lable
  public dir: any;
  public floatD: any;
  //return result
  public returnResultData:any;
  public login_error_one:any;
  public login_error_tow:any;
  public login_error_three:any;
  public login_error_fore:any;
  public login_error_five:any;
  constructor(private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 

  }
  initialiseTranslation(){
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('login_title').subscribe((res: string) => {
      this.login_title = res;
    });
    this.translate.get('email_field').subscribe((res: string) => {
      this.email_field = res;
    });
    this.translate.get('password_field').subscribe((res: string) => {
      this.password_field = res;
    });
    this.translate.get('forgot_password').subscribe((res: string) => {
      this.forgot_password = res;
    });
    this.translate.get('add_account').subscribe((res: string) => {
      this.add_account = res;
    });
    this.translate.get('add_account_or').subscribe((res: string) => {
      this.add_account_or = res;
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
    this.translate.get('enter_password_field').subscribe((res: string) => {
      this.enter_password_field = res;
    });
    this.translate.get('title_border').subscribe((res: string) => {
      this.title_border = res;
    });
    this.translate.get('login_button').subscribe((res: string) => {
      this.login_button = res;
    });
    this.translate.get('login_error_one').subscribe((res: string) => {
      this.login_error_one = res;
    });
    this.translate.get('login_error_tow').subscribe((res: string) => {
      this.login_error_tow = res;
    });
    this.translate.get('login_error_three').subscribe((res: string) => {
      this.login_error_three = res;
    });
    this.translate.get('login_error_fore').subscribe((res: string) => {
      this.login_error_fore = res;
    });
    this.translate.get('login_error_five').subscribe((res: string) => {
      this.login_error_five = res;
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
  checkPassword(event:any){
    this.errorUserPassword = "successStyleFull";
    this.isErrorUserPassword = 1;
    this.userPassword = event.target.value;
    if(this.userPassword == "" || this.userPassword == undefined){
      this.errorUserPassword = "errorStyleEmpty";
      this.isErrorUserPassword = 0;
    }
  }
  changeInputType(){
    this.showPassword = !this.showPassword;
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
    await this.storage.get('emailSave').then((email:any)=>{
      if(email!=null && email!=undefined){
        this.emailUser = email;
      }
    });
    await this.storage.get('passwordSave').then((password:any)=>{
      if(password!=null && password!=undefined){
        this.userPassword = password;
      }
    });
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
  async checkUser() {
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    if((this.emailUser == undefined || this.emailUser == "") && (this.userPassword == undefined || this.userPassword == "")){
      this.errorEmailUser = "errorStyleEmpty";
      this.isErrorEmailUser = 0;
      this.errorUserPassword = "errorStyleEmpty";
      this.isErrorUserPassword = 0;
      this.error_message_email_user_name = this.enter_email_field_one;
      return false;
    }
    if(this.emailUser == undefined || this.emailUser == ""){
      this.errorEmailUser = "errorStyleEmpty";
      this.isErrorEmailUser = 0;
      this.error_message_email_user_name = this.enter_email_field_one;
      return false;
    }
    if(this.userPassword == undefined || this.userPassword == ""){
      this.errorUserPassword = "errorStyleEmpty";
      this.isErrorUserPassword = 0;
      return false;
    }
    if(this.emailUser != undefined && this.userPassword != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'email':this.emailUser,'password':this.userPassword};//,'udid':this.udid
      this.usersService.login(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
          await this.storage.set('token',this.returnResultData.token);
          await this.storage.set('userId',this.returnResultData.id);
          await this.storage.set('name',this.returnResultData.name);
          await this.storage.set('mobile',this.returnResultData.mobile);
          await this.storage.set('user_type',this.returnResultData.user_type);
          await this.storage.set('apartment_id',this.returnResultData.apartment_id);
          await this.storage.set('email',this.emailUser);
          await this.storage.set('password',this.userPassword);
          await this.storage.set('emailSave',this.emailUser);
          await this.storage.set('passwordSave',this.userPassword);
          this.displayResult(this.login_error_one);
          if(this.returnResultData.user_type == 1){
            this.navCtrl.navigateRoot("/tabs");
            await this.storage.set('building_id',this.returnResultData.building_id[0]);
          }
          else{
            this.navCtrl.navigateRoot("/tabsen");
            await this.storage.set('building_id',this.returnResultData.building_id);
          }
        }else if(errorData == 2){
          this.displayResult(this.login_error_tow);
        }else if(errorData == 3){
          this.displayResult(this.login_error_three);
        }else if(errorData == 4){
          this.displayResult(this.login_error_fore);
        }else if(errorData == 5){
          this.displayResult(this.login_error_five);
        }
      });
      await loading.present();
    }
    return true;
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

  goToRegister() {
    this.router.navigate(['register']);
  }
  goToForgotPassword(){
    this.router.navigate(['forgotpassword']);
  }
}
