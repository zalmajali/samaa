import { Component, OnInit,Input } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController,AlertController} from "@ionic/angular";
import { Router,ActivatedRoute } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
@Component({
  selector: 'app-showdisclaimer',
  templateUrl: './showdisclaimer.component.html',
  styleUrls: ['./showdisclaimer.component.scss'],
})
export class ShowdisclaimerComponent  implements OnInit {
  @Input() utilityDisclaimer: string | any;
  public app_label_108:any;
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
  constructor(private appinformationService: AppinformationService,private usersService: UsersService,private activaterouter: ActivatedRoute,private alertController: AlertController,private modalController: ModalController,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
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
    this.translate.get('app_label_108').subscribe((res: string) => {
      this.app_label_108 = res;
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
