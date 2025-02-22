import { Component, OnInit,Input } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent  implements OnInit {
  @Input() typeUs: string | any;
  @Input() useDate: string | any;
  @Input() dateRes: string | any;
  //label for page
    public selectTime: any;
    public selectedTime: any;
    public ok: any;
    public cancel: any;
  //system label
  public checkLanguage: any=0;
  public language: any;
  disabledDates:any;
  constructor(private modalController: ModalController,private storage: Storage,private translate: TranslateService,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss({})
    });
  }
  isDateEnabled = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = this.formatDateUTC(date);

    return !this.disabledDates.includes(formattedDate);
  };
  private formatDateUTC(date: Date): string {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  initialiseTranslation(){
    this.translate.get('ok').subscribe((res: string) => {
      this.ok = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
    });
  }
  async ngOnInit() {
    this.disabledDates = this.dateRes;
    await this.getDeviceLanguage();
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
      this.initialiseTranslation();
    }
  }
  selectDate(event:any){
    if(event.target.value!=undefined){
      this.selectTime = event.target.value;
      let checkVal = this.selectTime.split('T');
      if(this.typeUs == 0)
        this.selectedTime = checkVal[0]+' '+checkVal[1];
      else
        this.selectedTime = checkVal[0];
    }
    this.modalController.dismiss({
      "time":this.selectedTime
    })
  }
  functionClosePage(){
    this.modalController.dismiss({
      "time":""
    })
  }
}
