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
  selector: 'app-editwarranty',
  templateUrl: './editwarranty.component.html',
  styleUrls: ['./editwarranty.component.scss'],
})
export class EditwarrantyComponent  implements OnInit {
  @Input() apartment_id_data: string | any;
  @Input() guarantee_start_date: string | any;
  @Input() guarantee_end_date: string | any;
  @Input() guarantee_details: string | any;
  //label for page
  public app_label_136:any;
  public app_label_143:any;
  public error_internet:any;
  //check startdat  information
  public warrantyStartDate: any;
  public errorWarrantyStartDate:any="";
  public isErrorWarrantyStartDate:any = 1;
  public app_label_131:any;
  public app_label_138:any;
  //check startdat  information
  public warrantyEndDate: any;
  public errorWarrantyEndDate:any="";
  public isErrorWarrantyEndDate:any = 1;
  public app_label_132:any;
  public app_label_139:any;
  //check note  information
  public warrantyNote: any;
  public errorWarrantyNote:any="";
  public isErrorWarrantyNote:any = 1;
  public app_label_137:any;
  public app_label_142:any;
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
  public app_label_140:any;
  public app_label_141:any;
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
    this.translate.get('app_label_136').subscribe((res: string) => {
      this.app_label_136 = res;
   });
   this.translate.get('app_label_143').subscribe((res: string) => {
      this.app_label_143 = res;
   });
   this.translate.get('app_label_138').subscribe((res: string) => {
      this.app_label_138 = res;
   });
    this.translate.get('app_label_131').subscribe((res: string) => {
      this.app_label_131 = res;
   });
    this.translate.get('app_label_132').subscribe((res: string) => {
      this.app_label_132 = res;
   });
    this.translate.get('app_label_139').subscribe((res: string) => {
      this.app_label_139 = res;
   });
    this.translate.get('app_label_137').subscribe((res: string) => {
      this.app_label_137 = res;
   });
    this.translate.get('app_label_142').subscribe((res: string) => {
      this.app_label_142 = res;
   });
    this.translate.get('app_label_140').subscribe((res: string) => {
      this.app_label_140 = res;
   });
    this.translate.get('app_label_141').subscribe((res: string) => {
      this.app_label_141 = res;
   });
  }
  checkNote(event:any){
    this.errorWarrantyNote = "successStyleFull";
    this.isErrorWarrantyNote = 1;
    this.warrantyNote = event.target.value;
    if(this.warrantyNote == "" || this.warrantyNote == undefined){
      this.errorWarrantyNote = "errorStyleEmpty";
      this.isErrorWarrantyNote = 0;
    }
  }
  checkStartDate(event:any){
    this.errorWarrantyStartDate = "successStyleFull";
    this.isErrorWarrantyStartDate = 1;
    this.warrantyStartDate = event.target.value;
    if(this.warrantyStartDate == "" || this.warrantyStartDate == undefined){
      this.errorWarrantyStartDate = "errorStyleEmpty";
      this.isErrorWarrantyStartDate = 0;
    }
  }
  checkEndDate(event:any){
    this.errorWarrantyEndDate = "successStyleFull";
    this.isErrorWarrantyEndDate = 1;
    this.warrantyEndDate = event.target.value;
    if(this.warrantyEndDate == "" || this.warrantyEndDate == undefined){
      this.errorWarrantyEndDate = "errorStyleEmpty";
      this.isErrorWarrantyEndDate = 0;
    }
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.user_type = await this.storage.get('user_type');
    this.name = await this.storage.get('name');
    this.building_id = await this.storage.get('building_id');
    this.apartment_id = await this.storage.get('apartment_id');
    this.userId = await this.storage.get('userId');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    this.warrantyNote = this.guarantee_details;
    this.warrantyStartDate = this.guarantee_start_date;
    this.warrantyEndDate = this.guarantee_end_date;
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
  async openCalender(){
    let model = await this.modalController.create({
      component:DatepickerComponent,
      componentProps:{typeUs:1,useDate:1},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.warrantyStartDate = data.data.time;
      this.guarantee_start_date = data.data.time;
    });
    await model.present();
  }
  async openCalender2(){
    let model = await this.modalController.create({
      component:DatepickerComponent,
      componentProps:{typeUs:1,useDate:1},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.warrantyEndDate = data.data.time;
      this.guarantee_end_date = data.data.time;
    });
    await model.present();
  }
  async warrantyEdit(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    if((this.warrantyNote == undefined || this.warrantyNote == "") && (this.warrantyStartDate == undefined || this.warrantyStartDate == "") && (this.warrantyEndDate == undefined || this.warrantyEndDate == "")){
      this.errorWarrantyNote = "errorStyleEmpty";
      this.isErrorWarrantyNote = 0;
      this.errorWarrantyStartDate = "errorStyleEmpty";
      this.isErrorWarrantyStartDate = 0;
      this.errorWarrantyEndDate = "errorStyleEmpty";
      this.isErrorWarrantyEndDate = 0;
      return false;
    }
    if(this.warrantyNote == undefined || this.warrantyNote == ""){
      this.errorWarrantyNote = "errorStyleEmpty";
      this.isErrorWarrantyNote = 0;
      return false;
    }
    if(this.warrantyStartDate == undefined || this.warrantyStartDate == ""){
      this.errorWarrantyStartDate = "errorStyleEmpty";
      this.isErrorWarrantyStartDate = 0;
      return false;
    }
    if(this.warrantyEndDate == undefined || this.warrantyEndDate == ""){
      this.errorWarrantyEndDate = "errorStyleEmpty";
      this.isErrorWarrantyEndDate = 0;
      return false;
    }
    if(this.warrantyNote != undefined && this.warrantyStartDate && this.warrantyEndDate) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'building_id':this.building_id,'user_id':`${this.userId}`,'apartment_id':`${this.apartment_id_data}`,'guarantee_details':`${this.warrantyNote}`,'guarantee_start_date':`${this.warrantyStartDate}`,'guarantee_end_date':`${this.warrantyEndDate}` };
      this.appinformationService.editGuaranteeForOfficer(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
          this.displayResult(this.app_label_140);
          this.modalController.dismiss({
          })
        }else{
          this.displayResult(this.app_label_141);
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
}
