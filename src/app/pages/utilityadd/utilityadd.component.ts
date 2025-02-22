import { Component, OnInit,Input } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {ShowdisclaimerComponent} from "../showdisclaimer/showdisclaimer.component";
@Component({
  selector: 'app-utilityadd',
  templateUrl: './utilityadd.component.html',
  styleUrls: ['./utilityadd.component.scss'],
})
export class UtilityaddComponent  implements OnInit {
  @Input() utility_id: string | any;
  //label for page
  public error_internet:any;
  public app_label_92:any;
  public app_label_93:any;
  public app_label_78:any;//select
  public app_label_108:any;
  public app_label_109:any;
  public app_label_110:any;
  public showAnatherDate:any=2;
  public typeDate:any=1;
  public typeUs:any=0;
  public checkBox:any=0;
  public isPool:any=0;
  public utilityDisclaimer:any;
  //check name  information
  public utilityName: any;
  public errorUtilityName:any="";
  public isErrorUtilityName:any = 1;
  public app_label_90:any;
  public app_label_94:any;
 //check start date  information
  public fromDate: any;
  public errorFromDate:any="";
  public isErrorFromDate:any = 1;
  public app_label_37:any;
  public app_label_96:any;
  //check فخ date  information
  public toDate: any;
  public errorToDate:any="";
  public isErrorToDate:any = 1;
  public app_label_38:any;
  public app_label_97:any;
  //check Note  information
  public utilityNote: any;
  public app_label_95:any;
  //menu lable
  public dir: any;
  public floatD: any;
  public menuDirectionTow:any;
  public dirTow:any;
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
  public returnUtilitiesArray:any = [];
  public returnDateArray:any = [];
  public utility_add_error_one: any;
  public utility_add_error_tow: any;
  public utility_add_error_three: any;
  public utility_add_error_fore: any;
  constructor(private appinformationService: AppinformationService,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss({})
    });
  }
  initialiseTranslation(){
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dirTow = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('error_internet').subscribe((res: string) => {
      this.error_internet = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('app_label_92').subscribe((res: string) => {
        this.app_label_92 = res;
    });
    this.translate.get('app_label_93').subscribe((res: string) => {
        this.app_label_93 = res;
    });  
     this.translate.get('app_label_78').subscribe((res: string) => {
        this.app_label_78 = res;
    }); 
     this.translate.get('app_label_90').subscribe((res: string) => {
        this.app_label_90 = res;
    }); 
     this.translate.get('app_label_94').subscribe((res: string) => {
        this.app_label_94 = res;
    }); 
     this.translate.get('app_label_37').subscribe((res: string) => {
        this.app_label_37 = res;
    });
     this.translate.get('app_label_96').subscribe((res: string) => {
        this.app_label_96 = res;
    }); 
    this.translate.get('app_label_38').subscribe((res: string) => {
        this.app_label_38 = res;
    }); 
    this.translate.get('app_label_97').subscribe((res: string) => {
        this.app_label_97 = res;
    }); 
    this.translate.get('app_label_95').subscribe((res: string) => {
        this.app_label_95 = res;
    }); 
     this.translate.get('utility_add_error_one').subscribe((res: string) => {
        this.utility_add_error_one = res;
    }); 
     this.translate.get('utility_add_error_tow').subscribe((res: string) => {
        this.utility_add_error_tow = res;
    }); 
     this.translate.get('utility_add_error_three').subscribe((res: string) => {
        this.utility_add_error_three = res;
    });
    this.translate.get('utility_add_error_fore').subscribe((res: string) => {
      this.utility_add_error_fore = res;
    });
    this.translate.get('app_label_108').subscribe((res: string) => {
      this.app_label_108 = res;
    });
    this.translate.get('app_label_109').subscribe((res: string) => {
      this.app_label_109 = res;
    });
    this.translate.get('app_label_110').subscribe((res: string) => {
      this.app_label_110 = res;
    });
  }
  onCheckboxChange(event:any){
    if(event.detail.checked)
      this.checkBox = 1;
    else
      this.checkBox = 1;
  }
  async checkUtilityName(event:any){
    this.errorUtilityName = "successStyleFull";
    this.isErrorUtilityName = 1;
    const utilityData = event.target.value;
    if(utilityData == "" || utilityData == undefined || utilityData == 0){
      this.errorUtilityName = "errorStyleEmpty";
      this.isErrorUtilityName = 0;
    }else{
      await this.getUtilityInfo(utilityData);
      this.fromDate = "";
      this.toDate = "";
    }
  }
  getUtilityInfo(utilityData:any){
    const arrayUtility= utilityData.split("-");
    if(arrayUtility[1] == 0){
      this.utilityName = arrayUtility[0];
      this.showAnatherDate=1;
      this.typeDate=1;
      this.typeUs=0;
      this.isPool=0;
      this.returnDateArray=[];
    }else{
      this.utilityName = arrayUtility[0];
      this.showAnatherDate=0;
      this.typeDate=0;
      this.typeUs=1;
      this.isPool=1;
      let sendValues = {'building_id':this.building_id,'apartment_id':this.apartment_id,'user_id':this.userId,"building_utility_id":arrayUtility[0]};
      this.appinformationService.bookedUtilitiesPoolDetails(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
            this.returnOperationData = this.returnResultData.data;
            this.returnDateArray=[];
            for(let i = 0; i < this.returnOperationData.length;i++){
              this.returnDateArray[i]=[];
              this.returnDateArray[i]= this.returnOperationData[i].start_time;
            }
        }
        this.utilityName = Number(this.utilityName);
        const index = this.returnUtilitiesArray.findIndex((item:{ utility_id: number }) => item.utility_id === this.utilityName);
        this.utilityDisclaimer = this.returnUtilitiesArray[index]['utility_disclaimer'];
    })
    }
  }
  checkUtilityFromDate(event:any){
    this.errorFromDate = "successStyleFull";
    this.isErrorFromDate = 1;
    this.fromDate = event.target.value;
    if(this.fromDate == "" || this.fromDate == undefined){
      this.errorFromDate = "errorStyleEmpty";
      this.isErrorFromDate = 0;
    }
  }
  checkUtilityToDate(event:any){
    this.errorToDate = "successStyleFull";
    this.isErrorToDate = 1;
    this.toDate = event.target.value;
    if(this.toDate == "" || this.toDate == undefined){
      this.errorToDate = "errorStyleEmpty";
      this.isErrorToDate = 0;
    }
  } 
  checkNote(event:any){
    this.utilityNote = event.target.value;
  }
 async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.user_type = await this.storage.get('user_type');
    this.name = await this.storage.get('name');
    this.building_id = await this.storage.get('building_id');
    this.apartment_id = await this.storage.get('apartment_id');
    this.userId = await this.storage.get('userId');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    await this.getInformationOfPage();
    if(this.utility_id!=undefined && this.utility_id!=null && this.utility_id!=0){
      this.errorUtilityName = "successStyleFull";
      this.isErrorUtilityName = 1;
      this.getUtilityInfo(this.utility_id);
    }
  }
  async getInformationOfPage(){
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
    this.appinformationService.getBuildingUtilitiesForOwner(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data;
          this.returnUtilitiesArray=[];
          for(let i = 0; i < this.returnOperationData.length;i++){
            this.returnUtilitiesArray[i]=[];
            this.returnUtilitiesArray[i]['utility_id'] = this.returnOperationData[i].utility_id;
            this.returnUtilitiesArray[i]['utility_type'] = this.returnOperationData[i].utility_type;
            this.returnUtilitiesArray[i]['utility_disclaimer'] = this.returnOperationData[i].utility_disclaimer;
            if(this.language == 'ar')
              this.returnUtilitiesArray[i]['utility_name'] = this.returnOperationData[i].utility_name_ar;
            else
              this.returnUtilitiesArray[i]['utility_name'] = this.returnOperationData[i].utility_name_en;
          }
      }
  }).catch(error=>{
      this.getInformationOfPage()
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
  async addUtility(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    if((this.utilityName == undefined || this.utilityName == "") && (this.fromDate == undefined || this.fromDate == "")  && (this.toDate == undefined || this.toDate == "")){
      this.errorUtilityName = "errorStyleEmpty";
      this.isErrorUtilityName = 0;
      this.errorFromDate = "errorStyleEmpty";
      this.isErrorFromDate = 0;
      this.errorToDate = "errorStyleEmpty";
      this.isErrorToDate = 0;
      return false;
    }
    if(this.utilityName == undefined || this.utilityName == ""){
      this.errorUtilityName = "errorStyleEmpty";
      this.isErrorUtilityName = 0;
      return false;
    }
    if(this.fromDate == undefined || this.fromDate == ""){
      this.errorFromDate = "errorStyleEmpty";
      this.isErrorFromDate = 0;
      return false;
    }
    if(this.toDate == undefined || this.toDate == ""){
      this.errorToDate = "errorStyleEmpty";
      this.isErrorToDate = 0;
      return false;
    }
    if(this.isPool == 1 && this.checkBox == 0){
      this.displayResult(this.app_label_110)
      return false;
    }
    if(this.utilityName != undefined && this.fromDate != undefined && this.toDate != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'building_id':this.building_id,'apartment_id':this.apartment_id,'user_id':this.userId,'utility_id':this.utilityName,'start_time':this.fromDate,'end_time':this.toDate,'description':this.utilityNote};
      this.appinformationService.bookUtility(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
          this.displayResult(this.utility_add_error_one);
          this.modalController.dismiss({
          })
        }else if(errorData == 2){
          this.displayResult(this.utility_add_error_tow);
        }else if(errorData == 4){
          this.displayResult(this.utility_add_error_fore);
        }
        else if(errorData == 3){
          this.displayResult(this.utility_add_error_three);
        }
      });
      await loading.present();
    }
    return true;
  }
  async showDisclaimer(utilityDisclaimer:any){
    let model = await this.modalController.create({
      component:ShowdisclaimerComponent,
      animated:true,
      componentProps:{utilityDisclaimer:utilityDisclaimer},
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
  async openCalender(){
    let model = await this.modalController.create({
      component:DatepickerComponent,
      animated:true,
      componentProps:{typeUs:this.typeUs,useDate:this.typeDate,dateRes:this.returnDateArray},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      if(this.isPool==1){
        this.fromDate = data.data.time+" "+"09:00:00";
        this.errorFromDate = "successStyleFull";
        this.isErrorFromDate = 1;
        this.toDate = data.data.time+" "+"21:00:00";
        this.errorToDate = "successStyleFull";
        this.isErrorToDate = 1;
      }else{
        this.fromDate = data.data.time;
        this.errorFromDate = "successStyleFull";
        this.isErrorFromDate = 1;
      }
    });
    await model.present();
  }
  async openCalender2(){
    let model = await this.modalController.create({
      component:DatepickerComponent,
      animated:true,
      componentProps:{typeUs:0,useDate:0},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.toDate = data.data.time;
      this.errorFromDate = "successStyleFull";
      this.isErrorFromDate = 1;
    });
    await model.present();
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
