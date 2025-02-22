import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Filesystem, Directory,Encoding } from '@capacitor/filesystem';
import {DatepickerComponent} from "../datepicker/datepicker.component";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public register_title:any;
  public register_deed_field:any;
  public register_have_account_field:any;
  public error_internet:any;
  public register_select:any;
  public register_button:any;
  public add_account_or:any;
  public register_have_account:any;
  public login_button:any;
  public passwordStrengthClass: any;
  public passwordStrengthValue: any=0;
  public passwordStrengthValuePersent: any;
  public selectedValue: any =  0;
  //check name  information
  public fullName: any;
  public errorFullName:any="";
  public isErrorFullName:any = 1;
  public register_full_name:any;
  public register_full_name_field:any;
  //check mobile  information
  public mobile: any;
  public errorMobile:any="";
  public isErrorMobile:any = 1;
  public register_full_mobile:any;
  public register_full_mobile_field:any;
  //check building  information
  public building: any =  0;
  public errorBuilding:any="";
  public isErrorBuilding:any = 1;
  public register_full_building:any;
  public register_full_building_field:any;
  //check apartment  information
  public apartment: any;
  public errorApartment:any="";
  public isErrorApartment:any = 1;
  public register_full_apartment:any;
  public register_full_apartment_field:any;
  //checkemail information
  public emailUser: any;
  public errorEmailUser:any="";
  public isErrorEmailUser:any = 1;
  public register_email_field:any;
  public register_enter_email_field_one:any;
  public register_enter_email_field_tow:any;
  public error_message_email_user_name:any;
  //checkPassawrd information
  public userPassword: any;
  public errorUserPassword:any="";
  public isErrorUserPassword:any = 1;
  public register_password_field:any;
  public register_enter_password_field:any;
  public new_password_note_one:any;
  public new_password_note_tow:any;
  public new_password_note_three:any;
  public new_password_note_for:any;
  public new_password_note_five:any;
  //check Date
  public byDate: any;
  public errorByDate:any="";
  public isErrorByDate:any = 1;
  public register_Date_by_field:any;
  public register_Date_by_:any;
  //check file
  public fileName: any;
  public errorFile:any="";
  public isErrorFile:any = 1;
  public register_file_error:any;
  public register_file_field:any;
  public selectedFile:any="";
  public filePath: any;
  public istherFile: any = 0;
  //menu lable
  public dir: any;
  public floatD: any;
  //label for design
  public title_border:any;
  //system label
  public checkLanguage: any=0;
  public language: any;
  //return result
  public returnResultData:any;
  public register_error_one:any;
  public register_error_tow:any;
  public register_error_three:any;
  public register_error_for:any;
  public returnOperationData: any;
  public returnApartmentArray:any = [];
  public selectedApartmentArray:any = [];
  constructor(private modalController: ModalController,private appinformationService: AppinformationService,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
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
    this.translate.get('register_title').subscribe((res: string) => {
      this.register_title = res;
    });
    this.translate.get('register_full_name').subscribe((res: string) => {
      this.register_full_name = res;
    });
    this.translate.get('register_full_name_field').subscribe((res: string) => {
      this.register_full_name_field = res;
    });
    this.translate.get('register_full_mobile').subscribe((res: string) => {
      this.register_full_mobile = res;
    });
    this.translate.get('register_full_mobile_field').subscribe((res: string) => {
      this.register_full_mobile_field = res;
    });
    this.translate.get('register_full_building').subscribe((res: string) => {
      this.register_full_building = res;
    });
    this.translate.get('register_full_building_field').subscribe((res: string) => {
      this.register_full_building_field = res;
    });
    this.translate.get('register_full_apartment').subscribe((res: string) => {
      this.register_full_apartment = res;
    });
    this.translate.get('register_full_apartment_field').subscribe((res: string) => {
      this.register_full_apartment_field = res;
    });
    this.translate.get('register_email_field').subscribe((res: string) => {
      this.register_email_field = res;
    });
    this.translate.get('register_password_field').subscribe((res: string) => {
      this.register_password_field = res;
    });
    this.translate.get('register_enter_email_field_one').subscribe((res: string) => {
      this.register_enter_email_field_one = res;
    });
    this.translate.get('register_enter_email_field_tow').subscribe((res: string) => {
      this.register_enter_email_field_tow = res;
    });
    this.translate.get('register_enter_password_field').subscribe((res: string) => {
      this.register_enter_password_field = res;
    });
    this.translate.get('register_deed_field').subscribe((res: string) => {
      this.register_deed_field = res;
    });
    this.translate.get('register_have_account_field').subscribe((res: string) => {
      this.register_have_account_field = res;
    });
    this.translate.get('register_error_one').subscribe((res: string) => {
      this.register_error_one = res;
    });
    this.translate.get('register_error_tow').subscribe((res: string) => {
      this.register_error_tow = res;
    });
    this.translate.get('register_error_three').subscribe((res: string) => {
      this.register_error_three = res;
    });
    this.translate.get('register_error_for').subscribe((res: string) => {
      this.register_error_for = res;
    });
    this.translate.get('error_internet').subscribe((res: string) => {
      this.error_internet = res;
    });
    this.translate.get('register_select').subscribe((res: string) => {
      this.register_select = res;
    });
    this.translate.get('register_button').subscribe((res: string) => {
      this.register_button = res;
    });
    this.translate.get('add_account_or').subscribe((res: string) => {
      this.add_account_or = res;
    });
    this.translate.get('register_have_account').subscribe((res: string) => {
      this.register_have_account = res;
    });
    this.translate.get('login_button').subscribe((res: string) => {
      this.login_button = res;
    });
    this.translate.get('title_border').subscribe((res: string) => {
      this.title_border = res;
    });
    this.translate.get('register_file_error').subscribe((res: string) => {
      this.register_file_error = res;
    });
    this.translate.get('register_file_field').subscribe((res: string) => {
      this.register_file_field = res;
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
    this.translate.get('register_Date_by_field').subscribe((res: string) => {
      this.register_Date_by_field = res;
    });
    this.translate.get('register_Date_by_').subscribe((res: string) => {
      this.register_Date_by_ = res;
    });
  }
  checkFullName(event:any){
    this.errorFullName = "successStyleFull";
    this.isErrorFullName = 1;
    this.fullName = event.target.value;
    if(this.fullName == "" || this.fullName == undefined){
      this.errorFullName = "errorStyleEmpty";
      this.isErrorFullName = 0;
    }
  }
  checkMobile(event:any){
    this.errorMobile = "successStyleFull";
    this.isErrorMobile = 1;
    this.mobile = event.target.value;
    if(this.mobile == "" || this.mobile == undefined){
      this.errorMobile = "errorStyleEmpty";
      this.isErrorMobile = 0;
    }
  }
  async checkBuilding(event:any){
    this.selectedValue = 0;
    this.building = event.target.value;
    if(this.building == "" || this.building == undefined || this.building == -1){
      this.errorBuilding = "errorStyleEmpty";
      this.isErrorBuilding = 0;
    }else{
      this.errorBuilding = "successStyleFull";
      this.isErrorBuilding = 1;
      await this.selectApartByBuild(this.building)
    }
  }
  checkApartment(event:any){
    this.apartment = event.target.value;
    if(this.apartment == "" || this.apartment == undefined || this.apartment == 0){
      this.errorApartment = "errorStyleEmpty";
      this.isErrorApartment = 0;
    }else{
      this.errorApartment = "successStyleFull";
      this.isErrorApartment = 1;
    }
  }
  checkDate(event:any){
    this.errorByDate = "successStyleFull";
    this.isErrorByDate = 1;
    this.byDate = event.target.value;
    if(this.byDate == "" || this.byDate == undefined){
      this.errorByDate = "errorStyleEmpty";
      this.isErrorByDate = 0;
    }
  }
  checkEmailUser(event:any){
    this.emailUser = event.target.value;
   if(this.emailUser == "" || this.emailUser == undefined){
     this.errorEmailUser = "errorStyleEmpty";
     this.error_message_email_user_name = this.register_enter_email_field_one;
     this.isErrorEmailUser = 0;
   }else{
     let checkVal = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(!checkVal.test(this.emailUser)){
       this.errorEmailUser = "errorStyleEmpty";
       this.error_message_email_user_name = this.register_enter_email_field_tow;
       this.isErrorEmailUser = 0;
     }else{
       this.errorEmailUser = "successStyleFull";
       this.isErrorEmailUser = 1;
     }
   }
 }
  async checkPassword(event:any){
    this.errorUserPassword = "successStyleFull";
    this.isErrorUserPassword = 1;
    this.userPassword = event.target.value;
    if(this.userPassword == "" || this.userPassword == undefined){
      this.errorUserPassword = "errorStyleEmpty";
      this.isErrorUserPassword = 0;
    }
    await this.checkPasswordStrength(this.userPassword);
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
    this.errorUserPassword = "successStyleFull";
    this.isErrorUserPassword = 1;
    this.userPassword = password;
    await this.checkPasswordStrength(password);
  }
  async checkPasswordStrength(password: string) {
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
 async ngOnInit() {
    await this.getDeviceLanguage();
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
    await this.getBuildingInformation();
  }
  async getBuildingInformation(){
    this.appinformationService.buildingInformation().then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
        this.returnOperationData = this.returnResultData.data;
       this.returnApartmentArray=[];
       for(let i = 0; i < this.returnOperationData.length;i++){
        this.returnApartmentArray[i]=[];
        this.returnApartmentArray[i]['building_id'] = this.returnOperationData[i].building_id;
        if(this.language == 'ar')
          this.returnApartmentArray[i]['building_name'] = this.returnOperationData[i].building_name_ar;
        else
          this.returnApartmentArray[i]['building_name'] = this.returnOperationData[i].building_name_en;
        this.returnApartmentArray[i]['apartment_data']=[];
        for(let j = 0; j < this.returnOperationData[i].apartments.length;j++){
          this.returnApartmentArray[i]['apartment_data'][j]=[];
          this.returnApartmentArray[i]['apartment_data'][j]['apartment_id']= this.returnOperationData[i].apartments[j].apartment_id;
          this.returnApartmentArray[i]['apartment_data'][j]['apartment_number'] = this.returnOperationData[i].apartments[j].apartment_number;
        }
       }
      }
    }).catch(error=>{
      this.getBuildingInformation()
    });
  }
 async selectApartByBuild(val:any=0){
    this.selectedApartmentArray=[];
    for(let j = 0; j < this.returnApartmentArray[val]['apartment_data'].length;j++){
      this.selectedApartmentArray[j]=[];
      this.selectedApartmentArray[j]['apartment_id']=this.returnApartmentArray[val]['apartment_data'][j]['apartment_id'];
      this.selectedApartmentArray[j]['apartment_number']=this.returnApartmentArray[val]['apartment_data'][j]['apartment_number'];
    }
    console.log(this.selectedApartmentArray);
  }
  async openCalender2(){
    let model = await this.modalController.create({
      component:DatepickerComponent,
      componentProps:{typeUs:1,useDate:1},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.byDate = data.data.time;
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
      this.language = info.value
      this.translate.setDefaultLang(info.value); // اللغة الافتراضية
       this.translate.use(info.value);
      this.language = info.value;
      this.initialiseTranslation();
    }
  }
  async selectFile() {
    try {
      const result = await FilePicker.pickFiles({});
      const file = result.files[0];
      this.selectedFile = file;
      this.fileName = file.name
    }catch (error) {
      this.displayResult(this.register_file_error);
    }
  }
  async registration(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    if((this.fullName == undefined || this.fullName == "") && (this.mobile == undefined || this.mobile == "") && (this.building == undefined || this.building == "") && (this.apartment == undefined || this.apartment == "") && (this.emailUser == undefined || this.emailUser == "") && (this.userPassword == undefined || this.userPassword == "") && (this.byDate == undefined || this.byDate == "")){
      this.errorFullName="errorStyleEmpty";
      this.isErrorFullName= 0;
      this.errorMobile="errorStyleEmpty";
      this.isErrorMobile= 0;
      this.errorBuilding="errorStyleEmpty";
      this.isErrorBuilding= 0;
      this.errorApartment="errorStyleEmpty";
      this.isErrorApartment= 0;
      this.errorUserPassword="errorStyleEmpty";
      this.isErrorUserPassword = 0;
      this.errorEmailUser = "errorStyleEmpty";
      this.isErrorEmailUser = 0;
      this.error_message_email_user_name = this.register_enter_email_field_one;
      this.errorByDate = "errorStyleEmpty";
      this.isErrorByDate = 0;
      return false;
    }
    if(this.fullName == undefined || this.fullName == ""){
      this.errorFullName="errorStyleEmpty";
      this.isErrorFullName= 0;
      return false;
    }
    if(this.mobile == undefined || this.mobile == ""){
      this.errorMobile="errorStyleEmpty";
      this.isErrorMobile= 0;
      return false;
    }
    if(this.building == undefined || this.building == ""){
      this.errorBuilding="errorStyleEmpty";
      this.isErrorBuilding= 0;
      return false;
    }
    if(this.apartment == undefined || this.apartment == ""){
        this.errorApartment="errorStyleEmpty";
        this.isErrorApartment= 0;
        return false;
    }
    if(this.emailUser == undefined || this.emailUser == ""){
        this.errorEmailUser = "errorStyleEmpty";
        this.isErrorEmailUser = 0;
        this.error_message_email_user_name = this.register_enter_email_field_one;
        return false;
    }
    if(this.userPassword == undefined || this.userPassword == ""){
        this.errorUserPassword="errorStyleEmpty";
        this.isErrorUserPassword = 0;
        return false;
    }
    if(this.selectedFile!=undefined && this.selectedFile!=null && this.selectedFile!="" && this.selectedFile!=0){
      const filePath = this.selectedFile;
      const file = await Filesystem.readFile({
        path: filePath.path,
      });
      this.filePath = file.data;
    }
    if(this.byDate == undefined || this.byDate == ""){
      this.errorByDate = "errorStyleEmpty";
      this.isErrorByDate = 0;
      return false;
    }
    if(this.fullName != undefined && this.mobile != undefined && this.building != undefined && this.apartment != undefined && this.emailUser != undefined && this.userPassword != undefined && this.byDate != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'full_name':this.fullName,'email':this.emailUser,'password':this.userPassword,'mobile':this.mobile,'apartment_id':this.apartment,'ownership_documentation':this.filePath,'ownership_date':this.byDate};
      this.usersService.registration(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
          this.displayResult(this.register_error_one);
          this.navCtrl.navigateRoot("/login");
        }else if(errorData == 2){
          this.displayResult(this.register_error_tow);
        }else if(errorData == 3){
          this.displayResult(this.register_error_three);
        }else if(errorData == 4){
          this.displayResult(this.register_error_for);
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
  goToLogin() {
    this.router.navigate(['login']);
  }
}
