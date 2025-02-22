import { Component, OnInit,ElementRef,ViewChild,Input } from '@angular/core';
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
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-numbersdirectory',
  templateUrl: './numbersdirectory.page.html',
  styleUrls: ['./numbersdirectory.page.scss'],
})
export class NumbersdirectoryPage implements OnInit {
//post data
public app_label_111:any;
public app_label_11:any;
public app_label_117:any;
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
public returnContactsArray:any = [];
public returnDataCArray:any = [];
public returnContactsDataArray:any = [];
constructor(private callNumber: CallNumber,private appinformationService: AppinformationService,private usersService: UsersService,private activaterouter: ActivatedRoute,private alertController: AlertController,private modalController: ModalController,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
  this.platform.backButton.subscribeWithPriority(10, () => {
    this.navCtrl.navigateRoot("/tabs/account");
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
  this.translate.get('app_label_111').subscribe((res: string) => {
    this.app_label_111 = res;
  });
  this.translate.get('app_label_11').subscribe((res: string) => {
    this.app_label_11 = res;
  });
  this.translate.get('app_label_117').subscribe((res: string) => {
    this.app_label_117 = res;
  });
}
async openDirections(location:any)
{
  try {
    await Geolocation.requestPermissions();
    const position = await Geolocation.getCurrentPosition();
    const currentLat = position.coords.latitude;
    const currentLng = position.coords.longitude;
    const [latitude, longitude] = location.split(",");
    const destinationLat = latitude;
    const destinationLng = longitude;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
    window.open(url, '_system');
  } catch (error) {
    this.displayResult(this.app_label_117);
  }
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
    await this.getContactData();
  }
  async getContactData(){
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
    this.appinformationService.getContacts(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
        this.returnOperationData = this.returnResultData.data;
        this.returnContactsArray=[];
        for(let i = 0; i < this.returnOperationData.length;i++){
            this.returnContactsArray[i]=[];
            this.returnContactsArray[i]['type_id'] = this.returnOperationData[i].type_id;
            this.returnContactsArray[i]['phone'] = this.returnOperationData[i].phone;
            this.returnContactsArray[i]['location'] = this.returnOperationData[i].location;
            if(this.language == 'ar'){
              this.returnContactsArray[i]['type_name'] = this.returnOperationData[i].type_ar;
              this.returnContactsArray[i]['name'] = this.returnOperationData[i].name_ar;
            }
            else{
              this.returnContactsArray[i]['type_name'] = this.returnOperationData[i].type_en;
              this.returnContactsArray[i]['name'] = this.returnOperationData[i].name_en;
            }
          }
          this.returnContactsDataArray=[];
          const groupedData = this.returnContactsArray.reduce((result:any, item:any) => {
            if (!result[item.type_name]) {
                result[item.type_name] = [];
            }
            result[item.type_name].push(item);
            return result;
        }, {});
        const groupedDataVal = Object.entries(groupedData);
        this.returnContactsDataArray = groupedDataVal;
        console.log(this.returnContactsDataArray);
        }
      }).catch(error=>{
          this.getContactData()
      });
    await loading.present();
  }
  goToBack(){
    this.navCtrl.navigateRoot("/tabs/account");
  }
  callNumberUser(mobile:any){
    this.callNumber.callNumber(mobile, true)
    .then(res => {
    }).catch(err =>{
        this.displayResult(this.app_label_11);
    });
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
