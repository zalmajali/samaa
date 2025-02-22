import { Component } from '@angular/core';
import {AlertController, Platform,NavController,MenuController,ModalController,ToastController} from '@ionic/angular';
import {Storage} from "@ionic/storage-angular";
import { register } from 'swiper/element/bundle';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import {PushinfoComponent} from "./pages/pushinfo/pushinfo.component";
import {UsersService} from "./service/users.service";
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //menu lable
  public dir: any;
  public floatD: any;
  //system label
  public checkLanguage: any=0;
  public language: any;
  //login label
  public token:any;
  public userId:any;
  constructor(private usersService: UsersService,private modalController: ModalController,private translate: TranslateService,private platform : Platform,private storage: Storage) {
    this.information();
    this.setupNotifications();
  }
  async information(){
    await this.storage.create();
    await this.getDeviceLanguage();
  }
  async setupNotifications (){
 
    const addListeners = async () => {
      await PushNotifications.addListener('registration', token => {
        alert("1");
        console.info('Registration token: ', token.value);
      });
    
      await PushNotifications.addListener('registrationError', err => {
        alert("2");
        alert(JSON.stringify(err.error));
        console.error('Registration error: ', err.error);
      });
    
      await PushNotifications.addListener('pushNotificationReceived', notification => {
        alert("3");
        console.log('Push notification received: ', notification);
      });
    
      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        alert("4");
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });
    }
    
    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();
    
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
    
      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
    
      await PushNotifications.register();
    }
    
    const getDeliveredNotifications = async () => {
      alert("5");
      const notificationList = await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    }
    await addListeners();
    await registerNotifications();
    await getDeliveredNotifications();
  }
  async goToPush(title:any,body:any){
    let model = await this.modalController.create({
      component:PushinfoComponent,
      componentProps:{title:title,body:body},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async initialiseTranslation(){
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
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
      await this.initialiseTranslation();
    }else{
      const info = await Device.getLanguageCode();
      this.translate.setDefaultLang(info.value); // اللغة الافتراضية
       this.translate.use(info.value);
      this.language = info.value;
      await this.initialiseTranslation();
    }
  }
}
