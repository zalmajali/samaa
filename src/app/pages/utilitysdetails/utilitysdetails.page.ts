import { Component, OnInit,ElementRef,ViewChild,Input } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController,AlertController} from "@ionic/angular";
import { Router,ActivatedRoute } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import {UtilitydetailsComponent} from "../utilitydetails/utilitydetails.component";
import {UtilityaddComponent} from "../utilityadd/utilityadd.component";
import Swiper from 'swiper';
@Component({
  selector: 'app-utilitysdetails',
  templateUrl: './utilitysdetails.page.html',
  styleUrls: ['./utilitysdetails.page.scss'],
})
export class UtilitysdetailsPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  //post data
  public app_label_82:any;
  public app_label_22:any;
  public app_label_83:any;
  public utility_id:any;
  public utility_price:any;
  public utility_monthly_booking:any;
  public utility_name:any;
  public utility_details:any;
  public is_image:any=0;
  public utility_type:any;
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
  public returnImagesArray:any = [];
  public returnImagesForeArray:any = [];
  constructor(private appinformationService: AppinformationService,private usersService: UsersService,private activaterouter: ActivatedRoute,private alertController: AlertController,private modalController: ModalController,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/tabs/home");
    });
  }
  ngAfterViewInit() {
    this.swiper = this.swiperRef?.nativeElement.swiper
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
    this.translate.get('app_label_82').subscribe((res: string) => {
      this.app_label_82 = res;
    });
    this.translate.get('app_label_22').subscribe((res: string) => {
      this.app_label_22 = res;
    });
    this.translate.get('app_label_83').subscribe((res: string) => {
      this.app_label_83 = res;
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
      if(params['utility_id']!="" && params['utility_id']!=null && params['utility_id']!=undefined && params['utility_id']!=0){
        this.utility_id = params['utility_id'];
      }
      await this.getUtilityData(this.utility_id)
    });
  }
  async getUtilityData(utility_id:any){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
    });
    let sendValues = {'building_id':`${this.building_id}`,'apartment_id':`${this.apartment_id}`,'user_id':`${this.userId}`,'utility_id':`${utility_id}`,};
    this.appinformationService.getUtilityDetails(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data;
          this.utility_type = this.returnOperationData.utility_type;
          this.utility_price = this.returnOperationData.utility_price;
          this.utility_monthly_booking = this.returnOperationData.utility_monthly_booking;
          if(this.language == 'ar'){
            this.utility_details = this.returnOperationData.utility_details_ar;
            this.utility_name = this.returnOperationData.utility_name_ar;
          }
          else{
            this.utility_details = this.returnOperationData.utility_details_en;
            this.utility_name = this.returnOperationData.utility_name_en;
          }
          for(let i = 0; i < this.returnOperationData.utility_images.length;i++){
            this.returnImagesArray[i]=[];
            this.returnImagesArray[i] = this.returnOperationData.utility_images[i];
            this.is_image = 1;
          }
          let count = 0;
          for(let i = 0; i < this.returnOperationData.utility_images.length;i++){
            if(count>=4)
                break;
            this.returnImagesForeArray[i]=[];
            this.returnImagesForeArray[i] = this.returnOperationData.utility_images[i];
            this.is_image = 1;
            count++;
          }
      }
    }).catch(error=>{
        this.getUtilityData(utility_id)
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
      this.initialiseTranslation();
    }
  }
  async goToAddUtility(utility_id:any,utility_type:any){
    const dataUse = utility_id+'-'+utility_type
    let model = await this.modalController.create({
      component:UtilityaddComponent,
      componentProps:{utility_id:dataUse},
      animated:true,
      cssClass:"modalFilterSortCss"
      });
      model.onDidDismiss().then((data):any=>{
      });
      await model.present();
  }
  async showImage(img:any){
    let model = await this.modalController.create({
    component:UtilitydetailsComponent,
    componentProps:{img:img},
    animated:true,
    cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  goToBack(){
    this.navCtrl.back();
  }
  goToProfile(){
    this.navCtrl.navigateRoot("/tabs/account");
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
