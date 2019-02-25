import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Orderitem } from 'src/app/shared/orderitem.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData : Orderitem;
  itemList: Item[];
  isValid:boolean= true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);

    if(this.data.orderItemIndex === null){
      this.formData = {
        OrderItemID:null,
        OrderID: this.data.OrderID,
        ItemID:0,
        ItemName: '',
        Price:0,
        Quantity:0,
        Total:0
      }
    }
    else{
      // this.formData = this.orderService.orderItems[this.data.orderItemIndex];
      this.formData =Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(e){
    if(e.selectedIndex ===0){
      this.formData.Price = 0;
      this.formData.ItemName = '';
    }
    else
    {
      this.formData.Quantity = 0;
      this.formData.Price = this.itemList[e.selectedIndex-1].Price;
      this.formData.ItemName = this.itemList[e.selectedIndex-1].Name;
    }
    this.updateTotal();
  }

  updateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form:NgForm){
    if(this.validateForm(form.value)){
      if(this.data.orderItemIndex === null){
        this.orderService.orderItems.push(form.value);
      }
      else{
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }

  }

  validateForm(formData:Orderitem){
    this.isValid = true;
    if(formData.ItemID === 0){
      this.isValid = false;
    }
    else if(formData.Quantity === 0){
      this.isValid = false;
    }

    return this.isValid;
  }
}
