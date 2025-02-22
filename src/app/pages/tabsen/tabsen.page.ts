import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Device } from '@capacitor/device';
@Component({
  selector: 'app-tabsen',
  templateUrl: './tabsen.page.html',
  styleUrls: ['./tabsen.page.scss'],
})
export class TabsenPage implements OnInit {
//label for page
  public tabs_en_one: any;
  public tabs_en_tow: any;
  public tabs_en_three: any;
  public tabs_en_for: any;
  public tabs_en_five: any;
  public tabs_en_six: any;
  public tabs_en_sevin: any;
  //system label
  public checkLanguage: any=0;
  public language: any;
  constructor(private translate: TranslateService,private storage: Storage) { }
  initialiseTranslation(){
    this.translate.get('tabs_en_one').subscribe((res: string) => {
      this.tabs_en_one = res;
    });
    this.translate.get('tabs_en_tow').subscribe((res: string) => {
      this.tabs_en_tow = res;
    });
    this.translate.get('tabs_en_three').subscribe((res: string) => {
      this.tabs_en_three = res;
    });
    this.translate.get('tabs_en_for').subscribe((res: string) => {
      this.tabs_en_for = res;
    });
    this.translate.get('tabs_en_five').subscribe((res: string) => {
      this.tabs_en_five = res;
    });
    this.translate.get('tabs_en_six').subscribe((res: string) => {
      this.tabs_en_six = res;
    });
    this.translate.get('tabs_en_sevin').subscribe((res: string) => {
      this.tabs_en_sevin = res;
    });
  }
  async ngOnInit() {
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
      this.language = info.value;
      this.initialiseTranslation();
    }
  }
}
