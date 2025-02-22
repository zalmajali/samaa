import { Component, OnInit } from '@angular/core';
import {LoadingController,AlertController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage-angular";
import { Network } from '@capacitor/network';
import {UsersService} from "../../service/users.service";
import {AppinformationService} from "../../service/appinformation.service";
import {DuesuserssearchComponent} from "../duesuserssearch/duesuserssearch.component";
import {DuesusersdetailsComponent} from "../duesusersdetails/duesusersdetails.component";
import {DuesreviewComponent} from "../duesreview/duesreview.component";
import {AdddueComponent} from "../adddue/adddue.component";
@Component({
  selector: 'app-duesusers',
  templateUrl: './duesusers.page.html',
  styleUrls: ['./duesusers.page.scss'],
})
export class DuesusersPage implements OnInit {
  //label for page
  public app_label_159:any;
  public app_label_147:any;
  public app_label_34:any;
  public app_label_9:any;
  public app_label_10:any;
  public app_label_145:any;//مسددة
  public app_label_146:any;//غير مسددة
  public app_label_61:any;//العمارة
  public app_label_62:any;//الشقة
  public app_label_87:any;//الشقة
  public app_label_183:any;//الشقة
  public apartment_data:any;
  public building_data:any;
  public from_date:any;
  public to_date:any;
  public note:any;
  public status_data:any;
  public from_price:any;
  public to_price:any;
  public building_data_index:any;
  public error_internet:any;
  public loopingNumber:any = 1;
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
  public returnDuesArray:any = [];
  public dataDues:any;
  public lastScrollTop = 0;
  constructor(private appinformationService: AppinformationService,private modalController: ModalController,private usersService: UsersService,private storage: Storage,private translate: TranslateService,private router: Router,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController,private alertController:AlertController) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/tabsen/home");
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
    this.translate.get('app_label_159').subscribe((res: string) => {
        this.app_label_159 = res;
    });
    this.translate.get('app_label_147').subscribe((res: string) => {
      this.app_label_147 = res;
    });
    this.translate.get('app_label_34').subscribe((res: string) => {
        this.app_label_34 = res;
    });
    this.translate.get('app_label_9').subscribe((res: string) => {
        this.app_label_9 = res;
    });
    this.translate.get('app_label_10').subscribe((res: string) => {
        this.app_label_10 = res;
    });  
    this.translate.get('app_label_145').subscribe((res: string) => {
        this.app_label_145 = res;
    });
     this.translate.get('app_label_146').subscribe((res: string) => {
        this.app_label_146 = res;
    });
     this.translate.get('app_label_61').subscribe((res: string) => {
        this.app_label_61 = res;
    });
     this.translate.get('app_label_62').subscribe((res: string) => {
        this.app_label_62 = res;
    });
    this.translate.get('app_label_87').subscribe((res: string) => {
        this.app_label_87 = res;
    });
    this.translate.get('app_label_183').subscribe((res: string) => {
        this.app_label_183 = res;
    });
  }
  onScroll(event: any) {
    this.lastScrollTop = event.detail.scrollTop;
  }
  refrechPage(event:any){
    this.ngOnInit();
    setTimeout(() => {
        event.detail.complete();
      }, 2000);
  }
  async goToSearch(){
    let model = await this.modalController.create({
      component:DuesuserssearchComponent,
      componentProps:{building_data:this.building_data,apartment_data:this.apartment_data,from_date:this.from_date,to_date:this.to_date,note:this.note,from_price:this.from_price,to_price:this.to_price,status_data:this.status_data,index_data:this.building_data_index},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.building_data = data.data.building_data
      this.apartment_data = data.data.apartment_data
      this.from_date = data.data.from_date_data
      this.to_date = data.data.to_date_data
      this.note = data.data.note_data
      this.from_price = data.data.from_price_data
      this.to_price = data.data.to_price_data
      this.status_data = data.data.status_data
      this.building_data_index = data.data.index_data
      this.getDuesUser(data.data.building_data,data.data.apartment_data,data.data.from_date_data,data.data.to_date_data,data.data.note_data,data.data.from_price_data,data.data.to_price_data,data.data.status_data)
    });
    await model.present();
  }
  async ngOnInit() {
    this.loopingNumber = 1;
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.user_type = await this.storage.get('user_type');
    this.building_id = await this.storage.get('building_id');
    this.building_data = await this.storage.get('building_id');
    this.apartment_id = await this.storage.get('apartment_id');
    this.userId = await this.storage.get('userId');
    this.token = await this.storage.get('token');
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    await this.getDuesUser();
  }
  async getDuesUser(building_data:any="",apartment_data:any="",from_date:any="",to_date:any="",note:any="",from_price:any="",to_price:any="",status_data:any=""){
    let limitNew = this.loopingNumber;
    const status = await Network.getStatus();
    if(!status.connected) {
      this.displayResult(this.error_internet);
    }
    const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
    });
    let building = this.building_id
    if(building_data!="" && !Array.isArray(building_data))
      building = [building_data]
    let sendValues = {'building_id':building,'user_id':`${this.userId}`,'status':`${status_data}`,'apartment_id':`${apartment_data}`,'from_date':`${from_date}`,'to_date':`${to_date}`,'note':`${note}`,'from_price':`${from_price}`,'to_price':`${to_price}`,'limit':`${limitNew}`};
    this.appinformationService.getDuesForOfficer(sendValues).then(async data=>{
      this.returnResultData = data;
      let errorData = this.returnResultData.status;
      if(errorData == 1){
          this.returnOperationData = this.returnResultData.data;
          this.returnDuesArray=[];
          for(let i = 0; i < this.returnOperationData.length;i++){
              this.returnDuesArray[i]=[];
              this.returnDuesArray[i]['due_id'] = this.returnOperationData[i].due_id;
              this.returnDuesArray[i]['price'] = this.returnOperationData[i].price;
              this.returnDuesArray[i]['dues_date'] = this.returnOperationData[i].date;
              this.returnDuesArray[i]['apartment_number'] = this.returnOperationData[i].apartment_number;
              this.returnDuesArray[i]['description'] = this.returnOperationData[i].description;
              this.returnDuesArray[i]['payment_at'] = this.returnOperationData[i].payment_at;
              this.returnDuesArray[i]['payment_note'] = this.returnOperationData[i].payment_note;
              this.returnDuesArray[i]['review_at'] = this.returnOperationData[i].review_at;
              this.returnDuesArray[i]['review'] = this.returnOperationData[i].review;
              this.returnDuesArray[i]['review_by'] = this.returnOperationData[i].review_by;
              this.returnDuesArray[i]['owner_name'] = this.returnOperationData[i].owner_name;
              this.returnDuesArray[i]['mobile'] = this.returnOperationData[i].mobile;
              if(this.language == 'ar'){
                this.returnDuesArray[i]['type_name'] = this.returnOperationData[i].type_name_ar;
                this.returnDuesArray[i]['name'] = this.returnOperationData[i].name_ar;
                this.returnDuesArray[i]['building_name'] = this.returnOperationData[i].building_ar;
              }
              else{
                this.returnDuesArray[i]['type_name'] = this.returnOperationData[i].type_name_en;
                this.returnDuesArray[i]['name'] = this.returnOperationData[i].name_en;
                this.returnDuesArray[i]['building_name'] = this.returnOperationData[i].building_en;
              }
              if(this.returnOperationData[i].status == 1 && this.returnOperationData[i].review == 2){
                this.returnDuesArray[i]['status']  = 1;
                this.returnDuesArray[i]['dues_status']  = this.app_label_87; 
                this.returnDuesArray[i]['dues_status_color'] = "#FF0000";
              }
              if(this.returnOperationData[i].status == 0 && this.returnOperationData[i].review == 0){
                this.returnDuesArray[i]['status']  = 0;
                this.returnDuesArray[i]['dues_status']  = this.app_label_146; 
                this.returnDuesArray[i]['dues_status_color'] = "#5c7784";
              }
             if(this.returnOperationData[i].status == 1 && this.returnOperationData[i].review == 0){
               this.returnDuesArray[i]['status']  = 1;
               this.returnDuesArray[i]['dues_status']  = this.app_label_183; 
               this.returnDuesArray[i]['dues_status_color'] = "#FDB501";
             }
             if(this.returnOperationData[i].status == 1 && this.returnOperationData[i].review == 1){
               this.returnDuesArray[i]['status']  = 1;
               this.returnDuesArray[i]['dues_status']  = this.app_label_145; 
               this.returnDuesArray[i]['dues_status_color']= "#057005";
             }
          }
          let countOfData = this.returnDuesArray.length;
          if(countOfData == 0)
              this.dataDues = 0;
          else{
              this.dataDues = 1;
          }
      }else
          this.dataDues = 0;
    }).catch(error=>{
        this.getDuesUser(building,apartment_data,from_date,to_date,note,from_price,to_price,status_data)
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
  loadMoreData(event:any) {
    this.loopingNumber++;
    setTimeout(() => {
      if(this.lastScrollTop!=0)
       this.getDuesUser(this.building_data,this.apartment_data,this.from_date,this.to_date,this.note,this.from_price,this.to_price,this.status_data)
      event.target.complete();
    }, 2000);
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
  async goToDuesdetails(due_id:any,price:any,dues_date:any,apartment_number:any,description:any,payment_at:any,payment_note:any,review_at:any,review_by:any,owner_name:any,mobile:any,type_name:any,name:any,building_name:any,status:any){
    let model = await this.modalController.create({
      component:DuesusersdetailsComponent,
      componentProps:{due_id:due_id,price:price,dues_date:dues_date,apartment_number:apartment_number,description:description,payment_at:payment_at,payment_note:payment_note,review_at:review_at,review_by:review_by,owner_name:owner_name,mobile_user:mobile,type_name:type_name,name_due:name,building_name:building_name,status:status},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async goToDuesReview(due_id:any){
    let model = await this.modalController.create({
      component:DuesreviewComponent,
      componentProps:{due_id:due_id},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();    
  }
  async goToAddDues(){
    let model = await this.modalController.create({
      component:AdddueComponent,
      componentProps:{},
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();    
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
  goToProfile(){
    this.navCtrl.navigateRoot("/tabsen/account");
  }
}
