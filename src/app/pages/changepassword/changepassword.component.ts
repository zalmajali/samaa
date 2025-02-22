import { Component, OnInit } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent  implements OnInit {
  //label for page
  public account_change_password: any;
  public chane_password_button: any;
  public passwordStrengthClass: any;
  public passwordStrengthValue: any=0;
  public passwordStrengthValuePersent: any;
  public error_internet:any;
  //check name  information
  public oldPassword: any;
  public errorOldPassword:any="";
  public isErrorOldPassword:any = 1;
  public old_password:any;
  public chane_old_password_field:any;
  //check mobile  information
  public newPassword: any;
  public errorNewPassword:any="";
  public isErrorNewPassword:any = 1;
  public new_password:any;
  public chane_new_password_field:any;
  public new_password_note_one:any;
  public new_password_note_tow:any;
  public new_password_note_three:any;
  public new_password_note_for:any;
  public new_password_note_five:any;
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
  public change_password_error_one: any;
  public change_password_error_tow: any;
  public change_password_error_three: any;
  constructor(private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
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
    this.translate.get('account_change_password').subscribe((res: string) => {
      this.account_change_password = res;
    });
    this.translate.get('chane_password_button').subscribe((res: string) => {
      this.chane_password_button = res;
    });
    this.translate.get('chane_password_button').subscribe((res: string) => {
      this.chane_password_button = res;
    });
    this.translate.get('old_password').subscribe((res: string) => {
      this.old_password = res;
    });
    this.translate.get('chane_old_password_field').subscribe((res: string) => {
      this.chane_old_password_field = res;
    });
    this.translate.get('chane_old_password_field').subscribe((res: string) => {
      this.chane_old_password_field = res;
    });
    this.translate.get('chane_new_password_field').subscribe((res: string) => {
      this.chane_new_password_field = res;
    });
    this.translate.get('new_password').subscribe((res: string) => {
      this.new_password = res;
    });
    this.translate.get('change_password_error_one').subscribe((res: string) => {
      this.change_password_error_one = res;
    });
    this.translate.get('change_password_error_tow').subscribe((res: string) => {
      this.change_password_error_tow = res;
    });
    this.translate.get('change_password_error_three').subscribe((res: string) => {
      this.change_password_error_three = res;
    });
    this.translate.get('error_internet').subscribe((res: string) => {
      this.error_internet = res;
    });
    this.translate.get('new_password_note_one').subscribe((res: string) => {
      this.new_password_note_one = res;
    });
    this.translate.get('new_password_note_tow').subscribe((res: string) => {
      this.new_password_note_tow = res;
    });
    this.translate.get('new_password_note_three').subscribe((res: string) => {
      this.new_password_note_three = res;
    });
    this.translate.get('new_password_note_for').subscribe((res: string) => {
      this.new_password_note_for = res;
    });
    this.translate.get('new_password_note_five').subscribe((res: string) => {
      this.new_password_note_five = res;
    });
  }
  checkOldPassword(event:any){
    this.errorOldPassword = "successStyleFull";
    this.isErrorOldPassword = 1;
    this.oldPassword = event.target.value;
    if(this.oldPassword == "" || this.oldPassword == undefined){
      this.errorOldPassword = "errorStyleEmpty";
      this.isErrorOldPassword = 0;
    }
  }
  async checkNewPassword(event:any){
    this.errorNewPassword = "successStyleFull";
    this.isErrorNewPassword = 1;
    this.newPassword = event.target.value;
    if(this.newPassword == "" || this.newPassword == undefined){
      this.errorNewPassword = "errorStyleEmpty";
      this.isErrorNewPassword = 0;
    }
    await this.checkPasswordStrength(this.newPassword);
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.user_type = await this.storage.get('user_type');
    this.userId = await this.storage.get('userId');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
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
  async generatePassword() {
    const length = Math.floor(Math.random() * 3) + 6; // طول بين 6 و 8 أحرف
    const lettersAndNumbers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    let hasSymbol = false;
    for (let i = 0; i < length; i++) {
      const includeSymbol = Math.random() < 0.2;
      if (includeSymbol || (!hasSymbol && i === length - 1)) {
        const randomSymbolIndex = Math.floor(Math.random() * symbols.length);
        password += symbols[randomSymbolIndex];
        hasSymbol = true;
      } else {
        const randomIndex = Math.floor(Math.random() * lettersAndNumbers.length);
        password += lettersAndNumbers[randomIndex];
      }
    }
    this.errorNewPassword = "successStyleFull";
    this.isErrorNewPassword = 1;
    this.newPassword = password;
    await this.checkPasswordStrength(password);
  }
  checkPasswordStrength(password: string) {
    let strength = 0;    
    if (password.length >= 6) 
      strength++;
    if (/[A-Z]/.test(password)) 
      strength++;
    if (/[a-z]/.test(password)) 
      strength++;
    if (/[0-9]/.test(password)) 
      strength++;
    if (/[^A-Za-z0-9]/.test(password)) 
      strength++;
    this.passwordStrengthValue = 0;
    if (strength == 1) {
      this.passwordStrengthValuePersent = "25%";
      this.passwordStrengthValue = 1;
      this.passwordStrengthClass = 'red';
    }
     else if (strength == 2){
      this.passwordStrengthValuePersent = "50%";
      this.passwordStrengthValue = 1;
      this.passwordStrengthClass = 'orange';
     }
     else if (strength == 3){
      this.passwordStrengthValuePersent = "75%";
      this.passwordStrengthValue = 1;
      this.passwordStrengthClass = 'orange';
    }
    else if (strength == 5 || strength == 4){
      this.passwordStrengthValuePersent = "100%";
      this.passwordStrengthValue = 1;
      this.passwordStrengthClass = 'green';
    }
  }
  async changePassword(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    if((this.oldPassword == undefined || this.oldPassword == "") && (this.newPassword == undefined || this.newPassword == "")){
      this.errorOldPassword = "errorStyleEmpty";
      this.isErrorOldPassword = 0;
      this.errorNewPassword = "errorStyleEmpty";
      this.isErrorNewPassword = 0;
      return false;
    }
    if(this.oldPassword == undefined || this.oldPassword == ""){
      this.errorOldPassword = "errorStyleEmpty";
      this.isErrorOldPassword = 0;
      return false;
    }
    if(this.newPassword == undefined || this.newPassword == ""){
      this.errorNewPassword = "errorStyleEmpty";
      this.isErrorNewPassword = 0;
      return false;
    }
    if(this.newPassword != undefined && this.oldPassword != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'current_password':this.oldPassword,'new_password':this.newPassword,'user_id':this.userId};
      this.usersService.changePassword(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
          await this.storage.set('password',this.newPassword);
          this.displayResult(this.change_password_error_one);
          this.modalController.dismiss({})
        }else if(errorData == 2){
          this.displayResult(this.change_password_error_tow);
        }else if(errorData == 3){
          this.displayResult(this.change_password_error_three);
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
