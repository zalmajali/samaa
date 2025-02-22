import { Component, OnInit } from '@angular/core';
import {LoadingController,AlertController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Browser } from '@capacitor/browser';
import {SearcusersComponent} from "../searcusers/searcusers.component";
@Component({
  selector: 'app-buildinguser',
  templateUrl: './buildinguser.page.html',
  styleUrls: ['./buildinguser.page.scss'],
})
export class BuildinguserPage implements OnInit {
//label for page
public app_label_119:any//titl
public app_label_1:any//mob
public app_label_61:any//appart
public app_label_62:any//build
public app_label_11:any//error conn mobile
public app_label_9:any;
public app_label_10:any;
public app_label_3:any;
public error_internet:any;
public building_data:any;
public loopingNumber:any = 1;
public building_data_index:any;
public is_sold:any;
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
public returnResultDataStatuse: any;
public returnAllUserArray:any = [];
public allUser:any;
public lastScrollTop = 0;
constructor(private callNumber: CallNumber,private appinformationService: AppinformationService,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController,private alertController:AlertController) { 
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
  this.translate.get('app_label_119').subscribe((res: string) => {
    this.app_label_119 = res;
  });
  this.translate.get('app_label_1').subscribe((res: string) => {
    this.app_label_1 = res;
  });
  this.translate.get('app_label_61').subscribe((res: string) => {
    this.app_label_61 = res;
  });
  this.translate.get('app_label_62').subscribe((res: string) => {
    this.app_label_62 = res;
  });
  this.translate.get('app_label_11').subscribe((res: string) => {
    this.app_label_11 = res;
  });
  this.translate.get('app_label_9').subscribe((res: string) => {
    this.app_label_9 = res;
  });
  this.translate.get('app_label_10').subscribe((res: string) => {
    this.app_label_10 = res;
  });
  this.translate.get('app_label_3').subscribe((res: string) => {
    this.app_label_3 = res;
  });
}
onScroll(event: any) {
  this.lastScrollTop = event.detail.scrollTop;
}
refrechPage(event:any){
  this.ngOnInit();
  setTimeout(() => {
      event.detail.complete();
    }, 2000);
}
async goToSearch(){
  let model = await this.modalController.create({
    component:SearcusersComponent,
    componentProps:{building_data:this.building_data,index_data:this.building_data_index,is_sold:this.is_sold},
    animated:true,
    cssClass:"modalFilterSortCss"
  });
  model.onDidDismiss().then((data):any=>{
    this.building_data_index = data.data.index_data
    this.building_data = data.data.building_data
    this.is_sold = data.data.is_sold
    this.getAllUser(data.data.building_data,data.data.is_sold)
  });
  await model.present();
}
async ngOnInit() {
  this.loopingNumber = 1;
  await this.getDeviceLanguage();
  await this.checkLoginUser();
  this.user_type = await this.storage.get('user_type');
  this.building_id = await this.storage.get('building_id');
  this.building_data = await this.storage.get('building_id');
  this.token = await this.storage.get('token');
  this.userId = await this.storage.get('userId');
  const status = await Network.getStatus();
  if(!status.connected) {
    this.displayResult(this.error_internet);
  }
  await this.getAllUser();
}
async getAllUser(building_data:any="",is_sold:any=""){
  let limitNew = this.loopingNumber;
  const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
  });
  let building = this.building_id
  if(building_data!="" && !Array.isArray(building_data))
    building = [building_data];
  let sendValues = {'building_id':building,'user_id':`${this.userId}`,'limit':`${limitNew}`,'is_sold':is_sold};
  this.appinformationService.getDepartmentsForOfficer(sendValues).then(async data=>{
    this.returnResultData = data;
    let errorData = this.returnResultData.status;
    if(errorData == 1){
        this.returnOperationData = this.returnResultData.data;
        this.returnAllUserArray=[];
        for(let i = 0; i < this.returnOperationData.length;i++){
            this.returnAllUserArray[i]=[];
            this.returnAllUserArray[i]['building_id'] = this.returnOperationData[i].building_id;
            this.returnAllUserArray[i]['apartment_id'] = this.returnOperationData[i].apartment_id;
            this.returnAllUserArray[i]['apartment_number'] = this.returnOperationData[i].apartment_number; 
            if(this.language == 'ar'){
              this.returnAllUserArray[i]['building_name'] = this.returnOperationData[i].building_name_ar;
            }
            else{
              this.returnAllUserArray[i]['building_name'] = this.returnOperationData[i].building_name_en;
            }
        }
        let countOfData = this.returnAllUserArray.length;
        if(countOfData == 0)
            this.allUser = 0;
        else{
            this.allUser = 1;
        }
    }else
        this.allUser = 0;
  }).catch(error=>{
      this.getAllUser(building,is_sold)
  });
  await loading.present();
}
loadMoreData(event:any) {
  this.loopingNumber++;
  setTimeout(() => {
    if(this.lastScrollTop!=0)
     this.getAllUser(this.building_data,this.is_sold)
    event.target.complete();
  }, 2000);
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
goTodetails(apartment_id:any,apartment_number:any){
  this.navCtrl.navigateBack(["usersdetails",{apartment_id:apartment_id,apartment_number:apartment_number}]);
}
callNumberUser(mobile:any){
  this.callNumber.callNumber(mobile, true)
  .then(res => {
  }).catch(err =>{
      this.displayResult(this.app_label_11);
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
goToProfile(){
  this.navCtrl.navigateRoot("/tabsen/account");
}
}
