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
import {UtilityorderdetailsComponent} from "../utilityorderdetails/utilityorderdetails.component";
import {UtilitysearchComponent} from "../utilitysearch/utilitysearch.component";
import {UtilityaddComponent} from "../utilityadd/utilityadd.component";
@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  //label for page
  public app_label_81:any;
  public app_label_84:any;
  public app_label_85:any;
  public app_label_86:any;
  public app_label_87:any;
  public app_label_34:any;
  public app_label_9:any;
  public app_label_10:any;
  public booking_id:any;
  public from_date:any;
  public to_date:any;
  public note:any;
  public from_price:any;
  public to_price:any;
  public status_data:any;
  public error_internet:any;
  public loopingNumber:any = 1;
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
 //return result
 public returnResultData:any;
 public returnOperationData: any;
 public returnUtilitysArray:any = [];
 public dataUtility:any;
 public lastScrollTop = 0;
  constructor(private callNumber: CallNumber,private appinformationService: AppinformationService,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController,private alertController:AlertController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/tabs/home");
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
    this.translate.get('app_label_81').subscribe((res: string) => {
        this.app_label_81 = res;
    });
    this.translate.get('app_label_84').subscribe((res: string) => {
      this.app_label_84 = res;
    });
    this.translate.get('app_label_85').subscribe((res: string) => {
      this.app_label_85 = res;
    });
    this.translate.get('app_label_86').subscribe((res: string) => {
      this.app_label_86 = res;
    });
    this.translate.get('app_label_87').subscribe((res: string) => {
      this.app_label_87 = res;
    });
    this.translate.get('app_label_34').subscribe((res: string) => {
        this.app_label_34 = res;
    });
    this.translate.get('app_label_9').subscribe((res: string) => {
        this.app_label_9 = res;
    });
    this.translate.get('app_label_10').subscribe((res: string) => {
        this.app_label_10 = res;
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
      component:UtilitysearchComponent,
      componentProps:{booking_id:this.booking_id,from_date:this.from_date,to_date:this.to_date,note:this.note,from_price:this.from_price,to_price:this.to_price,status_data:this.status_data},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.booking_id = data.data.booking_id_data
      this.from_date = data.data.from_date_data
      this.to_date = data.data.to_date_data
      this.note = data.data.note_data
      this.from_price = data.data.from_price_data
      this.to_price = data.data.to_price_data
      this.status_data = data.data.status_data
      this.getUserUtility(data.data.booking_id_data,data.data.from_date_data,data.data.to_date_data,data.data.note_data,data.data.from_price_data,data.data.to_price_data,data.data.status_data)
    });
   await model.present();
  }
  async goToUtilitydetails(booking_id:any){
    let model = await this.modalController.create({
      component:UtilityorderdetailsComponent,
      componentProps:{booking_id:booking_id},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async ngOnInit() {
    this.loopingNumber = 1;
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.user_type = await this.storage.get('user_type');
    this.building_id = await this.storage.get('building_id');
    this.apartment_id = await this.storage.get('apartment_id');
    this.userId = await this.storage.get('userId');
    this.token = await this.storage.get('token');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    await this.getUserUtility();
  }
  async getUserUtility(utility_id:any="",from_date:any="",to_date:any="",note:any="",from_price:any="",to_price:any="",status_data:any=""){
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
    let sendValues = {'building_id':`${this.building_id}`,'apartment_id':`${this.apartment_id}`,'user_id':`${this.userId}`,'status':`${status_data}`,'utility_id':`${utility_id}`,'from_date':`${from_date}`,'to_date':`${to_date}`,'note':`${note}`,'from_price':`${from_price}`,'to_price':`${to_price}`,'limit':`${limitNew}`};
    this.appinformationService.bookedUtilities(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data;
          this.returnUtilitysArray=[];
          for(let i = 0; i < this.returnOperationData.length;i++){
              this.returnUtilitysArray[i]=[];
              this.returnUtilitysArray[i]['booking_id'] = this.returnOperationData[i].booking_id;
              this.returnUtilitysArray[i]['utility_id'] = this.returnOperationData[i].utility_id;
              this.returnUtilitysArray[i]['booking_date_start'] = this.returnOperationData[i].booking_date_start;
              this.returnUtilitysArray[i]['booking_date_end'] = this.returnOperationData[i].booking_date_end;
              this.returnUtilitysArray[i]['booking_price'] = this.returnOperationData[i].booking_price;
              if(this.language == 'ar')
                  this.returnUtilitysArray[i]['utility_name'] = this.returnOperationData[i].utility_name_ar;
              else
                  this.returnUtilitysArray[i]['utility_name'] = this.returnOperationData[i].utility_name_en;

             if(this.returnOperationData[i].booking_status == 0){
               this.returnUtilitysArray[i]['booking_status']  = this.app_label_85; 
               this.returnUtilitysArray[i]['booking_status_color']  = "#5c7784";
             }
             if(this.returnOperationData[i].booking_status == 1){
               this.returnUtilitysArray[i]['booking_status']  = this.app_label_86; 
               this.returnUtilitysArray[i]['booking_status_color'] = "#057005";
             }
             if(this.returnOperationData[i].booking_status == 2){
               this.returnUtilitysArray[i]['booking_status']  = this.app_label_87; 
               this.returnUtilitysArray[i]['booking_status_color']= "#f21707";
             }
          }
          let countOfData = this.returnUtilitysArray.length;
          if(countOfData == 0)
              this.dataUtility = 0;
          else{
              this.dataUtility = 1;
          }
      }else
          this.dataUtility = 0;
    }).catch(error=>{
        this.getUserUtility(utility_id,from_date,to_date,note,from_price,to_price,status_data)
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
  async goToAddUtility(){
    let model = await this.modalController.create({
      component:UtilityaddComponent,
      componentProps:{utility_id:0},
      animated:true,
      cssClass:"modalFilterSortCss"
      });
      model.onDidDismiss().then((data):any=>{
        this.getUserUtility(this.booking_id,this.from_date,this.to_date,this.note,this.from_price,this.to_price)
      });
      await model.present();
  }
  loadMoreData(event:any) {
    this.loopingNumber++;
    setTimeout(() => {
      if(this.lastScrollTop!=0)
       this.getUserUtility(this.booking_id,this.from_date,this.to_date,this.note,this.from_price,this.to_price)
      event.target.complete();
    }, 2000);
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
    this.navCtrl.navigateRoot("/tabs/account");
  }
}
