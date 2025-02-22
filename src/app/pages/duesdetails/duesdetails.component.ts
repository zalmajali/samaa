import { Component, OnInit,Input  } from '@angular/core';
import {LoadingController,AlertController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
@Component({
  selector: 'app-duesdetails',
  templateUrl: './duesdetails.component.html',
  styleUrls: ['./duesdetails.component.scss'],
})
export class DuesdetailsComponent  implements OnInit {
  @Input() due_id: string | any;
  //label for page
  public app_label_147:any;
  public app_label_148:any;
  public app_label_149:any;
  public app_label_150:any;
  public app_label_151:any;
  public app_label_152:any;
  public app_label_153:any;
  public app_label_154:any;
  public app_label_155:any;
  public app_label_156:any;
  public app_label_157:any;
  public app_label_145:any;
  public app_label_146:any;
  public price:any;
  public date:any;
  public description:any;
  public payment_at:any;
  public payment_note:any;
  public review_at:any;
  public review_by:any;
  public dues_status:any;
  public name_due:any;
  public type_name:any;


//    "app_label_145":"مسددة",
//"app_label_146":"غير مسددة",

  // "app_label_148":"عنوان الفاتورة",
  // "app_label_149":"نوع الفاتورة",
  // "app_label_150":"السعر",
  // "app_label_151":"التاريخ",
  // "app_label_152":"الحالة",
  // "app_label_153":"تاريخ الدفع",
  // "app_label_154":"ملاحظات",
  // "app_label_155":"ملاحظات الدفع",
  // "app_label_156":"تاريخ المراجعة",
  // "app_label_157":"المشرف",

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
  public returnServicesArray:any = [];
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
    this.translate.get('app_label_145').subscribe((res: string) => {
      this.app_label_145 = res;
    });
    this.translate.get('app_label_146').subscribe((res: string) => {
      this.app_label_146 = res;
    });
    this.translate.get('app_label_147').subscribe((res: string) => {
      this.app_label_147 = res;
    });
    this.translate.get('app_label_148').subscribe((res: string) => {
      this.app_label_148 = res;
    });
    this.translate.get('app_label_149').subscribe((res: string) => {
      this.app_label_149 = res;
    });
    this.translate.get('app_label_150').subscribe((res: string) => {
      this.app_label_150 = res;
    });
    this.translate.get('app_label_151').subscribe((res: string) => {
      this.app_label_151 = res;
    });
    this.translate.get('app_label_152').subscribe((res: string) => {
      this.app_label_152 = res;
    });
    this.translate.get('app_label_153').subscribe((res: string) => {
      this.app_label_153 = res;
    });
    this.translate.get('app_label_154').subscribe((res: string) => {
      this.app_label_154 = res;
    });
    this.translate.get('app_label_155').subscribe((res: string) => {
      this.app_label_155 = res;
    });
    this.translate.get('app_label_156').subscribe((res: string) => {
      this.app_label_156 = res;
    });
    this.translate.get('app_label_157').subscribe((res: string) => {
      this.app_label_157 = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.user_type = await this.storage.get('user_type');
    this.building_id = await this.storage.get('building_id');
    this.apartment_id = await this.storage.get('apartment_id');
    this.userId = await this.storage.get('userId');
    this.user_type = await this.storage.get('user_type');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    await this.getDuesDetalis()
  }
  async getDuesDetalis(){
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
    });
    let sendValues = {'building_id':this.building_id,'apartment_id':`${this.apartment_id}`,'user_id':`${this.userId}`,'due_id':`${this.due_id}`};
    this.appinformationService.getDueDetails(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data[0];
          this.price = this.returnOperationData.price;
          this.date = this.returnOperationData.date;
          this.description = this.returnOperationData.description;
          this.payment_at = this.returnOperationData.payment_at;
          this.payment_note = this.returnOperationData.payment_note;
          this.review_at = this.returnOperationData.review_at;
          this.review_by = this.returnOperationData.review_by;
          if(this.returnOperationData.status == 0){
            this.dues_status = this.app_label_146; 
          }
          if(this.returnOperationData.status == 1){
            this.dues_status  = this.app_label_145; 
          }
          if(this.language == 'ar'){
            this.name_due = this.returnOperationData.name_ar;
            this.type_name = this.returnOperationData.type_name_ar;
          }
          else{
            this.name_due = this.returnOperationData.name_en;
            this.type_name = this.returnOperationData.type_name_en;
          }
      }
    }).catch(error=>{
        this.getDuesDetalis()
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
