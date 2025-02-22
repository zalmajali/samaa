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
  selector: 'app-utilitysearch',
  templateUrl: './utilitysearch.component.html',
  styleUrls: ['./utilitysearch.component.scss'],
})
export class UtilitysearchComponent  implements OnInit {
  @Input() booking_id: string | any;
  @Input() from_date: string | any;
  @Input() to_date: string | any;
  @Input() note: string | any;
  @Input() from_price: string | any;
  @Input() to_price: string | any;
  @Input() status_data: string | any;
    //label for page
    public app_label_37:any;
    public app_label_38:any;
    public app_label_39:any;
    public app_label_40:any;
    public app_label_41:any;
    public app_label_44:any;
    public app_label_85:any;
    public app_label_78:any;
    public app_label_86:any;
    public app_label_87:any;
    public app_label_88:any;
    public app_label_89:any;
    public app_label_90:any;
    public app_label_91:any;
    public app_label_51:any;
    public error_internet:any;
    
    public booking_id_data:any;
    public from_date_data:any;
    public to_date_data:any;
    public note_data:any;
    public from_price_data:any;
    public to_price_data:any;

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
   public returnUtilitiesArray:any = [];
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
    this.translate.get('app_label_37').subscribe((res: string) => {
        this.app_label_37 = res;
    });
     this.translate.get('app_label_38').subscribe((res: string) => {
        this.app_label_38 = res;
    });
     this.translate.get('app_label_39').subscribe((res: string) => {
        this.app_label_39 = res;
    });
     this.translate.get('app_label_40').subscribe((res: string) => {
        this.app_label_40 = res;
    });
     this.translate.get('app_label_41').subscribe((res: string) => {
        this.app_label_41 = res;
    });
    this.translate.get('app_label_44').subscribe((res: string) => {
        this.app_label_44 = res;
    });
     this.translate.get('app_label_85').subscribe((res: string) => {
        this.app_label_85 = res;
    });
     this.translate.get('app_label_86').subscribe((res: string) => {
        this.app_label_86 = res;
    });
     this.translate.get('app_label_78').subscribe((res: string) => {
        this.app_label_78 = res;
    });
    this.translate.get('app_label_87').subscribe((res: string) => {
        this.app_label_87 = res;
    });
    this.translate.get('app_label_88').subscribe((res: string) => {
        this.app_label_88 = res;
    });
    this.translate.get('app_label_89').subscribe((res: string) => {
        this.app_label_89 = res;
    });
    this.translate.get('app_label_90').subscribe((res: string) => {
        this.app_label_90 = res;
    }); 
    this.translate.get('app_label_91').subscribe((res: string) => {
        this.app_label_91 = res;
    }); 
  }
  checkUtilityName(event:any){
    this.booking_id_data = event.target.value;
  }
  checkStatusDataType(event:any){
    this.status_data = event.target.value;
  }
  checkFromDat(event:any){
    this.from_date_data = event.target.value;
  }
  checkToDat(event:any){
    this.to_date_data = event.target.value;
  }
  checkNot(event:any){
    this.note_data = event.target.value;
  }
  checkFromPrice(event:any){
    this.from_price_data = event.target.value;
  }
  checkToPrice(event:any){
    this.to_price_data = event.target.value;
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
    this.booking_id_data = this.booking_id;
    this.from_date_data = this.from_date;
    this.to_date_data = this.to_date;
    this.note_data = this.note;
    this.from_price_data = this.from_price;
    this.to_price_data = this.to_price;
    this.status_data = this.status_data;
    await this.getInformationOfPage();
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
    this.appinformationService.getBuildingUtilitiesForOwner(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data;
          this.returnUtilitiesArray=[];
          for(let i = 0; i < this.returnOperationData.length;i++){
            this.returnUtilitiesArray[i]=[];
            this.returnUtilitiesArray[i]['utility_id'] = this.returnOperationData[i].utility_id;
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
      this.from_date_data = data.data.time;
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
      this.to_date_data = data.data.time;
    });
    await model.present();
  }
  filterData(){
    this.modalController.dismiss({
      "booking_id_data":this.booking_id_data,
      "from_date_data":this.from_date_data,
      "to_date_data":this.to_date_data,
      "note_data":this.note_data,
      "from_price_data":this.from_price_data,
      "to_price_data":this.to_price_data,
      "status_data":this.status_data
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
