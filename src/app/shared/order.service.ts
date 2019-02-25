import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Orderitem } from './orderitem.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: Orderitem[];


  constructor(private http:HttpClient) { }


  private  multiple(){
    let val:number = 0;

    for(let i=0; i < 1000; i ++){
      if(i % 3 ==0 || i % 5 == 0){
        val += i;
      }
    }

    console.log(val);
  }

  private IncPrimeFactor(input:number): number{
    let retVal = 0;
    for(let i = 2; i < input; i ++){
      if(input % i == 0){
        return this.IncPrimeFactor(input + 1);
      }
    }

    return input;
  }

  private PrimeFactor(){
    let primeFactor=2;
    let number = 600851475143;

    while(number >= primeFactor){
      if(number % primeFactor == 0){
        number = number / primeFactor;
        console.log(primeFactor);
      }
      else{
        primeFactor = this.IncPrimeFactor(primeFactor + 1);
      }
    }


  }

  private Fibonacci(){
    let val1:number = 0;
    let val2:number = 1;
    let FibonacciVal = 0;
    let evenVal = 0;

    while(FibonacciVal < 4000000){
      FibonacciVal = (val1 + val2);
      val1 = val2;
      val2 = FibonacciVal;
      if(FibonacciVal % 2 ==0){
        evenVal += FibonacciVal;
      }
    }
    console.log(evenVal);


  }


  saveOrderUpdateOrder(){
    var body = {
      ...this.formData,
      orderItems: this.orderItems
    };

    return this.http.post(environment.apiURL + '/Order', body);
  }

  getOrderList(){
    return this.http.get(environment.apiURL + '/Order').toPromise();
  }

  getOrderByID(id: number): any{
    //console.log('getOrderByID:'+id);
    return this.http.get(environment.apiURL + '/Order/'+ id).toPromise();
  }

  deleteOrder(id: number){
    return this.http.delete(environment.apiURL + '/Order/'+ id).toPromise();
  }

}
