import { Component, OnInit,Input } from '@angular/core';
import {LoadingController,ModalController, NavController, Platform, ToastController,AlertController} from "@ionic/angular";

@Component({
  selector: 'app-utilitydetails',
  templateUrl: './utilitydetails.component.html',
  styleUrls: ['./utilitydetails.component.scss'],
})
export class UtilitydetailsComponent  implements OnInit {
  @Input() img: string | any;
  
  constructor(private alertController: AlertController,private modalController: ModalController,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss({})
    });
  }
  async ngOnInit() {}
  closePage(){
    this.modalController.dismiss({
    })
  }
}
