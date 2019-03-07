import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { isFactory } from '@angular/core/src/render3/interfaces/injector';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  isValid: boolean= true;
  customerList : Customer[];

  constructor(private orderService:OrderService,
    private dialog:MatDialog,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }





  ngOnInit() {

    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    // let orderID = this.currentRoute.snapShot.data['id'];
    //console.log('orderID:'+ orderID);

    // /order/edit/4?searchId=23
    // console.log(this.currentRoute.snapshot.queryParamMap.get('searchId'));
    // let searchId = this.currentRoute.snapshot.paramMap.get('searchId');
    // if(searchId != null){
    //   console.log(searchId);
    // }


    if(orderID == null){
      this.resetForm();
    }
    else{
      this.orderService.getOrderByID(parseInt( orderID)).subscribe(res => {
        this.orderService.formData = res.order;
        this.orderService.orderItems = res.orderDetails;
      },
      err =>{});
    }


    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
  }

  resetForm(form?: NgForm){
    if(form===null)
      form.reset();

    this.orderService.formData = {
      OrderID:null,
      OrderNo : Math.floor(100000 + Math.random()*900000).toString(),
      CustomerID:0,
      PMethod: '',
      GTotal:0,
      DeletedOrderItemIDs: ''
    };

    this.orderService.orderItems = [];
  }

  AddOrEditOrderItem(orderItemIndex, OrderID){
    const dialogConfig =new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {orderItemIndex, OrderID};

    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.updateGrandTotal();
      }
    );
  }

  onDeleteOrderItem(orderItemID: number, i: number){
    if(orderItemID != null)
    {
      this.orderService.formData.DeletedOrderItemIDs += orderItemID +",";
    }
    this.orderService.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal(){
    this.orderService.formData.GTotal = this.orderService.orderItems.reduce(
      (prev, curr)=> {
        return prev+curr.Total;
      }, 0
    );
    this.orderService.formData.GTotal = parseFloat(this.orderService.formData.GTotal.toFixed(2));
  }

  validateForm(){
    this.isValid = true;
    if(this.orderService.formData.CustomerID === 0){
      this.isValid = false;
    }
    else if (this.orderService.orderItems.length === 0)
    {
      this.isValid = false;
    }

    return this.isValid;
  }

  onSubmit(form:NgForm){


    if(this.validateForm()){
      this.orderService.saveOrderUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastr.success('Submitted Success', '==Dairy==', {timeOut: 5000, progressBar: true});
        this.router.navigate(['/orders']);
      });
    }
    else
    {
      this.toastr.error('invalid inputs', '==Dairy==', {timeOut: 5000, progressBar: true});
    }

  }
}
