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
@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.scss'],
})
export class AddserviceComponent  implements OnInit {
  @Input() serv_id: string | any;
  //label for page
  public error_internet:any;
  public app_label_30:any;
  public app_label_31:any;
  //check name  information
  public serviceName: any;
  public errorServiceName:any="";
  public isErrorServiceName:any = 1;
  public app_label_25:any;
  public app_label_28:any;
  //check Date  information
  public serviceDate: any;
  public errorServiceDate:any="";
  public isErrorServiceDate:any = 1;
  public app_label_26:any;
  public app_label_29:any;
  //check Note  information
  public serviceNote: any;
  public app_label_27:any;
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
  public serv_add_error_one: any;
  public serv_add_error_tow: any;
  public serv_add_error_three: any;
  constructor(private appinformationService: AppinformationService,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
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
    this.translate.get('app_label_30').subscribe((res: string) => {
        this.app_label_30 = res;
    });
    this.translate.get('app_label_31').subscribe((res: string) => {
        this.app_label_31 = res;
    });  
     this.translate.get('app_label_25').subscribe((res: string) => {
        this.app_label_25 = res;
    }); 
     this.translate.get('app_label_26').subscribe((res: string) => {
        this.app_label_26 = res;
    }); 
     this.translate.get('app_label_27').subscribe((res: string) => {
        this.app_label_27 = res;
    }); 
     this.translate.get('app_label_28').subscribe((res: string) => {
        this.app_label_28 = res;
    });
     this.translate.get('app_label_29').subscribe((res: string) => {
        this.app_label_29 = res;
    }); 
     this.translate.get('serv_add_error_one').subscribe((res: string) => {
        this.serv_add_error_one = res;
    }); 
     this.translate.get('serv_add_error_tow').subscribe((res: string) => {
        this.serv_add_error_tow = res;
    }); 
     this.translate.get('serv_add_error_three').subscribe((res: string) => {
        this.serv_add_error_three = res;
    });
  }
  checkServiceName(event:any){
    this.errorServiceName = "successStyleFull";
    this.isErrorServiceName = 1;
    this.serviceName = event.target.value;
    if(this.serviceName == "" || this.serviceName == undefined || this.serviceName == 0){
      this.errorServiceName = "errorStyleEmpty";
      this.isErrorServiceName = 0;
    }
  }
  checkServiceDate(event:any){
    this.errorServiceDate = "successStyleFull";
    this.isErrorServiceDate = 1;
    this.serviceDate = event.target.value;
    if(this.serviceDate == "" || this.serviceDate == undefined){
      this.errorServiceDate = "errorStyleEmpty";
      this.isErrorServiceDate = 0;
    }
  }
  checkNote(event:any){
    this.serviceNote = event.target.value;
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
    if(this.serv_id!=undefined && this.serv_id!=null && this.serv_id!=0){
      this.serviceName =this.serv_id 
      this.errorServiceName = "successStyleFull";
      this.isErrorServiceName = 1;
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
     document.documentElement.setAttribute('lang', this.language);
      this.initialiseTranslation();
    }
  }
  async addService(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    if((this.serviceName == undefined || this.serviceName == "") && (this.serviceDate == undefined || this.serviceDate == "")){
      this.errorServiceName = "errorStyleEmpty";
      this.isErrorServiceName = 0;
      this.errorServiceDate = "errorStyleEmpty";
      this.isErrorServiceDate = 0;
      return false;
    }
    if(this.serviceName == undefined || this.serviceName == ""){
      this.errorServiceName = "errorStyleEmpty";
      this.isErrorServiceName = 0;
      return false;
    }
    if(this.serviceDate == undefined || this.serviceDate == ""){
      this.errorServiceDate = "errorStyleEmpty";
      this.isErrorServiceDate = 0;
      return false;
      return false;
    }
    if(this.serviceName != undefined && this.serviceDate != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'building_id':this.building_id,'apartment_id':this.apartment_id,'user_id':this.userId,'service_id':this.serviceName,'service_date':this.serviceDate,'service_note':this.serviceNote};
      this.appinformationService.addRequestForOwner(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
          this.displayResult(this.serv_add_error_one);
          this.modalController.dismiss({
          })
        }else if(errorData == 2){
          this.displayResult(this.serv_add_error_tow);
        }else if(errorData == 3){
          this.displayResult(this.serv_add_error_three);
        }
      });
      await loading.present();
    }
    return true;
  }
  closePage(){
    this.modalController.dismiss({
    })
  }
  async openCalender(){
    let model = await this.modalController.create({
      component:DatepickerComponent,
      animated:true,
      componentProps:{typeUs:0,useDate:1},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.serviceDate = data.data.time;
    });
    await model.present();
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
