import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import {Storage} from "@ionic/storage-angular";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = "https://app.samaabdountowers.com/api";
  public result:any;
  public httpOptionsVal: any;
  public token:any;
  constructor(private storage: Storage,private http:HttpClient) {
  }

  httpOptionsValUn = {
    headers: new HttpHeaders({
      'Authorization': '',
      'Content-Type': 'application/json'
    })
  }
  async setHttpOptions() {
    this.token = await this.storage.get('token');
    this.httpOptionsVal = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
  }
  async login(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"login",JSON.stringify(item),this.httpOptionsValUn).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async registration(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"register_user",JSON.stringify(item),this.httpOptionsValUn).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async setLang(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"set_lang",JSON.stringify(item),this.httpOptionsValUn).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async userUdid(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"set_udid",JSON.stringify(item),this.httpOptionsValUn).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async forgotPassword(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"forgot_password",JSON.stringify(item),this.httpOptionsValUn).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async updateUserInfo(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"update_user_info",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async changePassword(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"change_password",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
}
