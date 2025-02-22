import { Component, OnInit,Input } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
@Component({
  selector: 'app-adddue',
  templateUrl: './adddue.component.html',
  styleUrls: ['./adddue.component.scss'],
})
export class AdddueComponent  implements OnInit {
  //label for page
  public app_label_166:any;//name
  public app_label_167:any;//Add
  public app_label_168:any;//Add Due
  public app_label_78:any;//Add Due
  //checkData
 //check building  information
  public building: any =  0;
  public errorBuilding:any="";
  public isErrorBuilding:any = 1;
  public app_label_79:any;
  public app_label_171:any;
  //check apartment  information
  public apartment: any;
  public errorApartment:any="";
  public isErrorApartment:any = 1;
  public app_label_80:any;
  public app_label_172:any;
  //check price  information
  public price: any;
  public errorPrice:any="";
  public isErrorPrice:any = 1;
  public app_label_150:any;
  public app_label_173:any;
  //check Note  information
  public dueNote: any;
  public errorDueNote:any="";
  public isErrorDueNote:any = 1;
  public app_label_39:any;
  public app_label_66:any;
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
  //return result
  public returnResultData:any;
  public returnOperationData: any;
  public returnApartmentArray:any = [];
  public selectedApartmentArray:any = []; 
  public app_label_169:any;
  public app_label_170:any;
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
    this.translate.get('app_label_79').subscribe((res: string) => {
        this.app_label_79 = res;
    });
     this.translate.get('app_label_80').subscribe((res: string) => {
        this.app_label_80 = res;
    });
     this.translate.get('app_label_39').subscribe((res: string) => {
        this.app_label_39 = res;
    });
     this.translate.get('app_label_150').subscribe((res: string) => {
        this.app_label_150 = res;
    });
     this.translate.get('app_label_166').subscribe((res: string) => {
        this.app_label_166 = res;
    });
    this.translate.get('app_label_167').subscribe((res: string) => {
        this.app_label_167 = res;
    });
    this.translate.get('app_label_168').subscribe((res: string) => {
      this.app_label_168 = res;
    });
    this.translate.get('app_label_169').subscribe((res: string) => {
      this.app_label_169 = res;
    });
    this.translate.get('app_label_170').subscribe((res: string) => {
      this.app_label_170 = res;
    });
    this.translate.get('app_label_171').subscribe((res: string) => {
      this.app_label_171 = res;
    });
    this.translate.get('app_label_172').subscribe((res: string) => {
      this.app_label_172 = res;
    });
    this.translate.get('app_label_173').subscribe((res: string) => {
      this.app_label_173 = res;
    });
    this.translate.get('app_label_78').subscribe((res: string) => {
      this.app_label_78 = res;
    });
    this.translate.get('app_label_66').subscribe((res: string) => {
      this.app_label_66 = res;
    });
  }
  async checkBuilding(event:any){
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
  async selectApartByBuild(val:any=0){
      this.selectedApartmentArray=[];
      for(let j = 0; j < this.returnApartmentArray[val]['apartment_data'].length;j++){
        this.selectedApartmentArray[j]=[];
        this.selectedApartmentArray[j]['apartment_id']=this.returnApartmentArray[val]['apartment_data'][j]['apartment_id'];
        this.selectedApartmentArray[j]['apartment_number']=this.returnApartmentArray[val]['apartment_data'][j]['apartment_number'];
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
  checkPrice(event:any){
    this.errorPrice = "successStyleFull";
    this.isErrorPrice = 1;
    this.price = event.target.value;
    if(this.price == "" || this.price == undefined){
      this.errorPrice = "errorStyleEmpty";
      this.isErrorPrice = 0;
    }
  }
  checkNote(event:any){
    this.errorDueNote = "successStyleFull";
    this.isErrorDueNote = 1;
    this.dueNote = event.target.value;
    if(this.dueNote == "" || this.dueNote == undefined){
      this.errorDueNote = "errorStyleEmpty";
      this.isErrorDueNote = 0;
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
    await this.getBuildingInformation();
  }
  async getBuildingInformation(){
    this.appinformationService.buildingAllInformation().then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
        this.returnOperationData = this.returnResultData.data;
       this.returnApartmentArray=[];
       let count = 0;
       for(let i = 0; i < this.returnOperationData.length;i++){
        if(this.building_id.includes(this.returnOperationData[i].building_id)) {
          this.returnApartmentArray[count]=[];
          this.returnApartmentArray[count]['building_id'] = this.returnOperationData[i].building_id;
          if(this.language == 'ar')
            this.returnApartmentArray[count]['building_name'] = this.returnOperationData[i].building_name_ar;
          else
            this.returnApartmentArray[count]['building_name'] = this.returnOperationData[i].building_name_en;
          this.returnApartmentArray[count]['apartment_data']=[];
          let countVal = 0;
          for(let j = 0; j < this.returnOperationData[i].apartments.length;j++){
            if(this.returnOperationData[i].apartments[j].is_sold == 1){
              this.returnApartmentArray[count]['apartment_data'][countVal]=[];
              this.returnApartmentArray[count]['apartment_data'][countVal]['apartment_id']= this.returnOperationData[i].apartments[j].apartment_id;
              this.returnApartmentArray[count]['apartment_data'][countVal]['apartment_number'] = this.returnOperationData[i].apartments[j].apartment_number;
              countVal++;
            }
          }
          count++;
        }
       }
    }
    }).catch(error=>{
      this.getBuildingInformation()
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
  closePage(){
    this.modalController.dismiss({
    })
  }
  async addDue(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    if((this.price == undefined || this.price == "") && (this.building == undefined || this.building == "") && (this.apartment == undefined || this.apartment == "") && (this.dueNote == undefined || this.dueNote == "")){
      this.errorBuilding="errorStyleEmpty";
      this.isErrorBuilding= 0;
      this.errorApartment="errorStyleEmpty";
      this.isErrorApartment= 0;
      this.errorPrice = "errorStyleEmpty";
      this.isErrorPrice = 0;
      this.errorDueNote = "errorStyleEmpty";
      this.isErrorDueNote = 0;
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
    if(this.price == undefined || this.price == ""){
      this.errorPrice = "errorStyleEmpty";
      this.isErrorPrice = 0;
      return false;
    }
    if(this.dueNote == undefined || this.dueNote == ""){
      this.errorDueNote = "errorStyleEmpty";
      this.isErrorDueNote = 0;
      return false;
    }
    if(this.price != undefined && this.dueNote != undefined && this.building != undefined && this.apartment != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'building_id':this.building_id,'user_id':`${this.userId}`,'apartment_id':`${this.apartment}`,'name_ar':'فاتورة','name_en':'invoice','due_type_id':'1','price':`${this.price}`,'description':`${this.dueNote}`};
      this.appinformationService.addDue(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
          this.displayResult(this.app_label_169);
            this.modalController.dismiss({ })
        }else{
          this.displayResult(this.app_label_170);
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
