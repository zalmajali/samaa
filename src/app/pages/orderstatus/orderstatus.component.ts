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
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss'],
})
export class OrderstatusComponent  implements OnInit {
  @Input() order_id: string | any;
  @Input() order_status: string | any;
  //label for page
  public app_label_72:any;
  public app_label_73:any;
  public app_label_69:any;
  public page_name:any;
  public status_number:any;
  public error_internet:any;
  //check Note  information
  public reqNote: any;
  public errorReqNoteDate:any="";
  public isErrorReqNoteDate:any = 1;
  public app_label_39:any;
  public app_label_66:any;
  //check Note  information
  public reqEndDate: any = "";
  public app_label_68:any;
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
  public app_label_74:any;
  public app_label_75:any;
  public app_label_76:any;
  public app_label_77:any;
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
    this.translate.get('app_label_39').subscribe((res: string) => {
      this.app_label_39 = res;
   });
    this.translate.get('app_label_66').subscribe((res: string) => {
      this.app_label_66 = res;
   });
    this.translate.get('app_label_68').subscribe((res: string) => {
      this.app_label_68 = res;
   });
    this.translate.get('app_label_69').subscribe((res: string) => {
      this.app_label_69 = res;
   });
    this.translate.get('app_label_72').subscribe((res: string) => {
      this.app_label_72 = res;
   });
    this.translate.get('app_label_73').subscribe((res: string) => {
      this.app_label_73 = res;
   });
    this.translate.get('app_label_74').subscribe((res: string) => {
      this.app_label_74 = res;
   });
    this.translate.get('app_label_75').subscribe((res: string) => {
      this.app_label_75 = res;
   });
    this.translate.get('app_label_76').subscribe((res: string) => {
      this.app_label_76 = res;
   });
    this.translate.get('app_label_77').subscribe((res: string) => {
      this.app_label_77 = res;
   });
  }
  checkNote(event:any){
    this.errorReqNoteDate = "successStyleFull";
    this.isErrorReqNoteDate = 1;
    this.reqNote = event.target.value;
    if(this.reqNote == "" || this.reqNote == undefined){
      this.errorReqNoteDate = "errorStyleEmpty";
      this.isErrorReqNoteDate = 0;
    }
  }
  checkEndDate(event:any){
    this.reqEndDate = event.target.value;
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
    if(this.order_status == 0){
      this.page_name = this.app_label_72;
      this.status_number = 1;
    }
    if(this.order_status == 1){
      this.page_name = this.app_label_73;
      this.status_number = 3;
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
  async openCalender2(){
    let model = await this.modalController.create({
      component:DatepickerComponent,
      componentProps:{typeUs:0,useDate:1},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.reqEndDate = data.data.time;
    });
    await model.present();
  }
  async approveRequist(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    if(this.reqNote == undefined || this.reqNote == ""){
      this.errorReqNoteDate = "errorStyleEmpty";
      this.isErrorReqNoteDate = 0;
      return false;
    }
    if(this.reqNote != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'building_id':this.building_id,'user_id':`${this.userId}`,'order_id':`${this.order_id}`,'status':`${this.status_number}`,'text':`${this.reqNote}`,'end_time':`${this.reqEndDate}` };
      this.appinformationService.changeOrderStatus(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.status;
        if(errorData == 1){
          if(this.order_status == 0)
            this.displayResult(this.app_label_74);
          if(this.order_status == 1)
            this.displayResult(this.app_label_75);
          this.modalController.dismiss({
          })
        }else{
          if(this.order_status == 0)
            this.displayResult(this.app_label_76);
          if(this.order_status == 1)
            this.displayResult(this.app_label_77);
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
