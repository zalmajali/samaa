import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import {Storage} from "@ionic/storage-angular";
@Injectable({
  providedIn: 'root'
})
export class AppinformationService {
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
  async buildingInformation(){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_apartments",'').subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async buildingAllInformation(){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_all_apartments",'').subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getUsersByBuilding(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_users_by_building",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async updateOwnershipStatus(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"update_ownership_status",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getBuildingServicesForOwner(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_building_services_for_owner",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getPages(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_pages",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async getContacts(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_contacts",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async getGuaranteeDetails(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_guarantee_details",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async getBuildingUtilitiesForOwner(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_utilities_in_building",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async bookedUtilitiesPoolDetails(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"booked_utilities_pool_details",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async updateUtilitiesFookingForOfficer(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"update_utilities_booking_for_officer",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async reviewDuePayment(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"review_due_payment",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async addDue(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"add_due",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async bookedUtilitiesDetailsForOfficer(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"booked_utilities_details_for_officer",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async bookUtility(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"book_utility",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async bookedUtilities(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"booked_utilities",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async getUtilityDetails(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_utility_details",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getDepartmentsDetailesForOfficer(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_departments_detailes_for_officer",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getDueDetails(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_due_details",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getUtilitiesBookingInBuildingForOfficer(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_utilities_booking_in_building_for_officer",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async bookedUtilitiesDetails(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"booked_utilities_details",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getRequestInfo(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_request_info",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async approveOrder(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"approve_order",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async payDue(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"pay_due",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async getOrderInfo(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_order_info",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getPageDetails(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_page_details",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getOldRequestsForOwner(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_old_requests_for_owner",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getOldRequestsForOfficer(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_old_requests_for_officer",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getOldOrdersForOficer(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_old_orders_for_officer",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async getDuesForOfficer(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_dues_for_officer",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async getNotifications(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_notifications",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  } 
  async getDepartmentsForOfficer(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_departments_for_officer",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getOldOrdersForOwner(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_old_orders_for_owner",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getDues(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_dues",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addRequestForOwner(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"add_request_for_owner",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async approveRequest(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"approve_request",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async editGuaranteeForOfficer(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"edit_guarantee_for_officer",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async changeOrderStatus(item:any){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"change_order_status",JSON.stringify(item),this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async logout(){
    await this.setHttpOptions();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"logout",'',this.httpOptionsVal).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
}
