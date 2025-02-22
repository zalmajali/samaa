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
  selector: 'app-searcusers',
  templateUrl: './searcusers.component.html',
  styleUrls: ['./searcusers.component.scss'],
})
export class SearcusersComponent  implements OnInit {
  @Input() index_data: string | any;
  @Input() building_data: string | any;
  @Input() is_sold: string | any;
  public building_data_select:any;
  public building_data_index:any;
  public app_label_120:any;
  public app_label_78:any;
  public app_label_79:any;
  public app_label_44:any;
  public app_label_121:any;
  public app_label_122:any;
  public app_label_123:any;
  public all:any;
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
    this.translate.get('app_label_78').subscribe((res: string) => {
        this.app_label_78 = res;
    });
    this.translate.get('app_label_79').subscribe((res: string) => {
      this.app_label_79 = res;
     });
     this.translate.get('app_label_44').subscribe((res: string) => {
      this.app_label_44 = res;
     });
     this.translate.get('app_label_120').subscribe((res: string) => {
      this.app_label_120 = res;
     });
     this.translate.get('app_label_121').subscribe((res: string) => {
      this.app_label_121 = res;
     });
     this.translate.get('app_label_122').subscribe((res: string) => {
      this.app_label_122 = res;
     });
     this.translate.get('app_label_123').subscribe((res: string) => {
      this.app_label_123 = res;
     });
     this.translate.get('all').subscribe((res: string) => {
      this.all = res;
     });
  }
  async checkBuilding(event:any){
    if(event.target.value!=-1){
      this.building_data_index = event.target.value
      this.building_data_select = event.target.value
    }else
      this.building_data_select = "";
  }
  async checkApartStatus(event:any){
    this.is_sold = event.target.value;
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
    this.building_data_index = this.index_data;
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
  filterData(){
    this.modalController.dismiss({
      "building_data":this.building_data_select,
      "is_sold":this.is_sold,
      "index_data":this.building_data_index,
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
