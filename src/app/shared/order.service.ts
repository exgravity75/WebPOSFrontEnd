
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Orderitem } from './orderitem.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: Orderitem[];


  constructor(private http:HttpClient,
    private userService: UserService) { }

  saveOrderUpdateOrder(){
    var body = {
      ...this.formData,
      orderItems: this.orderItems
    };

    return this.http.post(environment.apiURL + '/Order', body);
  }

  // getOrderList(): Observable<any> {
  //   return this.http.get<any>(environment.apiURL + '/Order')
  //             .catch(this.errorHandler);
  // }

  errorHandler(err: HttpErrorResponse){
    return Observable.throw(err.message || "Server Error");
  }

  getOrderList(){
    return this.http.get(environment.apiURL + '/Order').toPromise();
  }

  getOrderByID(id: number): Observable<any>{
    return this.http.get<any>(environment.apiURL + '/Order/'+ id);
  }



  deleteOrder(id: number){
    return this.http.delete(environment.apiURL + '/Order/'+ id).toPromise();
  }

}
