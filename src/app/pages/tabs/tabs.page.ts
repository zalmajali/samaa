import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Device } from '@capacitor/device';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
//label for page
public tabs_one: any;
public tabs_tow: any;
public tabs_three: any;
public tabs_for: any;
public tabs_five: any;
public tabs_six: any;
  //system label
  public checkLanguage: any=0;
  public language: any;
  constructor(private translate: TranslateService,private storage: Storage) { }
  initialiseTranslation(){
    this.translate.get('tabs_one').subscribe((res: string) => {
      this.tabs_one = res;
    });
    this.translate.get('tabs_tow').subscribe((res: string) => {
      this.tabs_tow = res;
    });
    this.translate.get('tabs_three').subscribe((res: string) => {
      this.tabs_three = res;
    });
    this.translate.get('tabs_for').subscribe((res: string) => {
      this.tabs_for = res;
    });
    this.translate.get('tabs_five').subscribe((res: string) => {
      this.tabs_five = res;
    });
    this.translate.get('tabs_six').subscribe((res: string) => {
      this.tabs_six = res;
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
