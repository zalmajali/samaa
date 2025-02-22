import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {Storage} from "@ionic/storage-angular";
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  public token:any;
  public userId:any;
  public password:any;
  public email:any;
  public user_type:any;
  constructor(private storage: Storage,private navCtrl: NavController) { }
  async ngOnInit() {
    setTimeout(async() => {
      await this.checkLoginUser(); // استبدل 'next-page' باسم الصفحة التي تريد الانتقال إليها
    }, 2500); // 2000 ملي ثانية تساوي ثانيتين
  }
  async checkLoginUser(){
    this.token = await this.storage.get('token');
    this.userId = await this.storage.get('userId');
    this.password = await this.storage.get('password');
    this.email = await this.storage.get('email');
    this.user_type = await this.storage.get('user_type');
    if(this.token == null || this.token == undefined || this.password == null || this.password == undefined || this.userId == null || this.userId == null || this.email == null || this.email == null){
      this.storage.remove('token');
      this.storage.remove('userId');
      this.storage.remove('password');
      this.storage.remove('email');
      this.storage.remove('name');
      this.storage.remove('mobile');
      this.storage.remove('user_type');
      this.storage.remove('building_id');
      this.navCtrl.navigateRoot('/slider');
    }else{
      if(this.user_type == 1){
        this.navCtrl.navigateRoot("/tabs");
      }
      else{
        this.navCtrl.navigateRoot("/tabsen");
      }
    }
  }
}
