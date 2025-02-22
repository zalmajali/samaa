import { Component, OnInit } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController,AlertController} from "@ionic/angular";
import { Router,ActivatedRoute } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Browser } from '@capacitor/browser';
import {EditwarrantyComponent} from "../editwarranty/editwarranty.component";
@Component({
  selector: 'app-usersdetails',
  templateUrl: './usersdetails.page.html',
  styleUrls: ['./usersdetails.page.scss'],
})
export class UsersdetailsPage implements OnInit {
  public apartment_id_selects:any;
  public apartment_number:any;
  public app_label_124:any;
  public app_label_125:any;
  public app_label_126:any;
  public app_label_127:any;
  public app_label_128:any;
  public app_label_129:any;
  public app_label_130:any;
  public app_label_131:any;
  public app_label_132:any;
  public app_label_133:any;
  public app_label_134:any;
  public app_label_135:any;
  public app_label_3:any;
  public app_label_136:any;
  public app_label_11:any;
  public app_label_137:any;
  public owner_name:any;
  public mobile_aprt:any;
  public email_aprt:any;
  public apartment_floor:any;
  public ownership_documentation:any;
  public ownership_date:any;
  public guarantee_start_date:any;
  public guarantee_end_date:any;
  public guarantee_details:any;
  public apartment_type:any;
  public building_name:any;
  public building_type:any;
  public building_address:any;
  //label for page
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
  constructor(private activaterouter: ActivatedRoute,private callNumber: CallNumber,private appinformationService: AppinformationService,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController,private alertController:AlertController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/tabsen/home");
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
    this.translate.get('app_label_124').subscribe((res: string) => {
      this.app_label_124 = res;
    });
    this.translate.get('app_label_125').subscribe((res: string) => {
      this.app_label_125 = res;
    });
    this.translate.get('app_label_126').subscribe((res: string) => {
      this.app_label_126 = res;
    });
    this.translate.get('app_label_127').subscribe((res: string) => {
      this.app_label_127 = res;
    });
    this.translate.get('app_label_128').subscribe((res: string) => {
      this.app_label_128 = res;
    });
    this.translate.get('app_label_129').subscribe((res: string) => {
      this.app_label_129 = res;
    });
    this.translate.get('app_label_130').subscribe((res: string) => {
      this.app_label_130 = res;
    });
    this.translate.get('app_label_131').subscribe((res: string) => {
      this.app_label_131 = res;
    });
    this.translate.get('app_label_132').subscribe((res: string) => {
      this.app_label_132 = res;
    });
    this.translate.get('app_label_133').subscribe((res: string) => {
      this.app_label_133 = res;
    });
    this.translate.get('app_label_134').subscribe((res: string) => {
      this.app_label_134 = res;
    });
    this.translate.get('app_label_135').subscribe((res: string) => {
      this.app_label_135 = res;
    });
    this.translate.get('app_label_3').subscribe((res: string) => {
      this.app_label_3 = res;
    });
    this.translate.get('app_label_136').subscribe((res: string) => {
      this.app_label_136 = res;
    });
    this.translate.get('app_label_11').subscribe((res: string) => {
      this.app_label_11 = res;
    });
    this.translate.get('app_label_137').subscribe((res: string) => {
      this.app_label_137 = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
      await this.checkLoginUser();
      this.user_type = await this.storage.get('user_type');
      this.building_id = await this.storage.get('building_id');
      this.apartment_id = await this.storage.get('apartment_id');
      this.userId = await this.storage.get('userId');
      this.user_type = await this.storage.get('user_type');
      const status = await Network.getStatus();
      if(!status.connected) {
        this.displayResult(this.error_internet);
      }
      await this.activaterouter.params.subscribe(async (params:any) => {
        if(params['apartment_number']!="" && params['apartment_number']!=null && params['apartment_number']!=undefined && params['apartment_number']!=0){
          this.apartment_number = params['apartment_number'];
        }
        if(params['apartment_id']!="" && params['apartment_id']!=null && params['apartment_id']!=undefined && params['apartment_id']!=0){
          this.apartment_id_selects = params['apartment_id'];
        }
        await this.getUserData(this.apartment_id_selects)
      });
  }
  async openFileUser(file:any){
    await Browser.open({ url: `${file}` });
  }
  async getUserData(apartment_id:any){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
    });
    let sendValues = {'building_id':this.building_id,'apartment_id':`${apartment_id}`,'user_id':`${this.userId}`};
    this.appinformationService.getDepartmentsDetailesForOfficer(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data[0];
          this.owner_name = this.returnOperationData.owner_name;
          this.mobile_aprt = this.returnOperationData.mobile;
          this.email_aprt = this.returnOperationData.email;
          this.apartment_floor = this.returnOperationData.apartment_floor;
          this.ownership_documentation = this.returnOperationData.ownership_documentation;
          this.ownership_date = this.returnOperationData.ownership_date;
          this.guarantee_start_date = this.returnOperationData.guarantee_start_date;
          this.guarantee_end_date = this.returnOperationData.guarantee_end_date;
          this.guarantee_details = this.returnOperationData.guarantee_details;
          if(this.language == 'ar'){
            this.apartment_type = this.returnOperationData.apartment_type_ar;
            this.building_name = this.returnOperationData.building_name_ar;
            this.building_type = this.returnOperationData.building_type_ar;
            this.building_address = this.returnOperationData.building_address_ar;
          }
          else{
            this.apartment_type = this.returnOperationData.apartment_type_en;
            this.building_name = this.returnOperationData.building_name_en;
            this.building_type = this.returnOperationData.building_type_en;
            this.building_address = this.returnOperationData.building_address_en;
          }
      }
    }).catch(error=>{
        this.getUserData(apartment_id)
    });
    await loading.present();
  }
  goToBack(){
    this.navCtrl.back();
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
      this.initialiseTranslation();
    }
  }
  async goToEditWarranty(apartment_id:any,guarantee_start_date:any,guarantee_end_date:any,guarantee_details:any){
    let model = await this.modalController.create({
      component:EditwarrantyComponent,
      componentProps:{apartment_id_data:apartment_id,guarantee_start_date:guarantee_start_date,guarantee_end_date:guarantee_end_date,guarantee_details:guarantee_details},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.ngOnInit();
    });
    await model.present();
  }
  callNumberUser(mobile:any){
    this.callNumber.callNumber(mobile, true)
    .then(res => {
    }).catch(err =>{
        this.displayResult(this.app_label_11);
    });
  }
  goToProfile(){
    this.navCtrl.navigateRoot("/tabsen/account");
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
