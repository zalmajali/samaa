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
  selector: 'app-duesuserssearch',
  templateUrl: './duesuserssearch.component.html',
  styleUrls: ['./duesuserssearch.component.scss'],
})
export class DuesuserssearchComponent  implements OnInit {
  @Input() index_data: string | any;
  @Input() building_data: string | any;
  @Input() apartment_data: string | any;
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
  public app_label_145:any;
  public app_label_146:any;
  public app_label_152:any;
  public app_label_158:any;
  public app_label_78:any;
  public app_label_79:any;
  public app_label_80:any;
  public building_data_index:any;
  public building_data_select:any;
  public apartment_data_select:any;
  public error_internet:any;
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
  public returnResultDataServ:any;
  public returnOperationDataServ: any;
  public returnServicesArray:any = [];
  public returnApartmentArray:any = [];
  public selectedApartmentArray:any = [];
  public selectedServiceArray:any = [];
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
    this.translate.get('app_label_145').subscribe((res: string) => {
      this.app_label_145 = res;
    });
    this.translate.get('app_label_146').subscribe((res: string) => {
      this.app_label_146 = res;
    });
    this.translate.get('app_label_152').subscribe((res: string) => {
      this.app_label_152 = res;
    });
    this.translate.get('app_label_158').subscribe((res: string) => {
      this.app_label_158 = res;
    });
    this.translate.get('app_label_78').subscribe((res: string) => {
      this.app_label_78 = res;
    });
    this.translate.get('app_label_79').subscribe((res: string) => {
      this.app_label_79 = res;
    });
    this.translate.get('app_label_80').subscribe((res: string) => {
      this.app_label_80 = res;
    });
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
  async checkBuilding(event:any){
    if(event.target.value!=-1){
      this.building_data_index = event.target.value
      await this.selectApartByBuild(event.target.value);
      await this.selectServByBuild(event.target.value);
    }else
      this.building_data_select = "";
  }
  checkApartment(event:any){
    this.apartment_data_select = event.target.value;
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
    this.building_data_select = this.building_data;
    this.apartment_data_select = this.apartment_data;
    this.from_date_data = this.from_date;
    this.to_date_data = this.to_date;
    this.note_data = this.note;
    this.from_price_data = this.from_price;
    this.to_price_data = this.to_price;
    this.status_data = this.status_data;
  }
  async getBuildingInformation(){
    this.appinformationService.buildingInformation().then(async data=>{
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
          for(let j = 0; j < this.returnOperationData[i].apartments.length;j++){
            this.returnApartmentArray[count]['apartment_data'][j]=[];
            this.returnApartmentArray[count]['apartment_data'][j]['apartment_id']= this.returnOperationData[i].apartments[j].apartment_id;
            this.returnApartmentArray[count]['apartment_data'][j]['apartment_number'] = this.returnOperationData[i].apartments[j].apartment_number;
          }
          let sendValuesSer = {'building_id':this.returnApartmentArray[count]['building_id'],'apartment_id':this.apartment_id,'user_id':this.userId,'type':'2'};
          await this.appinformationService.getBuildingServicesForOwner(sendValuesSer).then(async data=>{
            this.returnResultDataServ = data;
            let errorDataserv = this.returnResultDataServ.status;
            if(errorDataserv == 1){
              this.returnOperationDataServ = this.returnResultDataServ.data;
              this.returnApartmentArray[count]['service']=[];
              for(let j = 0; j < this.returnOperationDataServ.length;j++){
                this.returnApartmentArray[count]['service'][j]=[];
                this.returnApartmentArray[count]['service'][j]['service_id'] = this.returnOperationDataServ[j].service_id;
                if(this.language == 'ar')
                  this.returnApartmentArray[count]['service'][j]['service_name'] = this.returnOperationDataServ[j].service_name_ar;
                else
                  this.returnApartmentArray[count]['service'][j]['service_name'] = this.returnOperationDataServ[j].service_name_en;
              }
            }
          })
          count++;
        }
       }
       this.building_data_index = this.index_data;
       if(this.building_data_index!=undefined && this.building_data_index!=""){
         await this.selectApartByBuild(this.building_data_index);
         await this.selectServByBuild(this.building_data_index);
       }
      }
    }).catch(error=>{
      this.getBuildingInformation()
    });
  }
  async selectApartByBuild(val:any=0){
    this.building_data_select = this.returnApartmentArray[val]['building_id'];
      this.selectedApartmentArray=[];
      for(let j = 0; j < this.returnApartmentArray[val]['apartment_data'].length;j++){
        this.selectedApartmentArray[j]=[];
        this.selectedApartmentArray[j]['apartment_id']=this.returnApartmentArray[val]['apartment_data'][j]['apartment_id'];
        this.selectedApartmentArray[j]['apartment_number']=this.returnApartmentArray[val]['apartment_data'][j]['apartment_number'];
      }
  }
  async selectServByBuild(val:any=0){
    if (this.returnApartmentArray[val] && this.returnApartmentArray[val]['service']) {
      this.selectedServiceArray=[];
      for(let j = 0; j < this.returnApartmentArray[val]['service'].length;j++){
        this.selectedServiceArray[j]=[];
        this.selectedServiceArray[j]['service_id']=this.returnApartmentArray[val]['service'][j]['service_id'];
        this.selectedServiceArray[j]['service_name']=this.returnApartmentArray[val]['service'][j]['service_name'];
      }
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
      "building_data":this.building_data_select,
      "index_data":this.building_data_index,
      "apartment_data":this.apartment_data_select,
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
