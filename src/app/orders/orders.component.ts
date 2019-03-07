import { DialogService } from './../shared/mat-confirm-dialog/dialog.service';
import { MatConfirmDialogComponent } from './../shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/order.service';
import { Component, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList;
  ifLoading = true;

  constructor(private orderService: OrderService,
    private router:Router,
    private toastr: ToastrService,
    private dialogService: DialogService ) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this.orderService.getOrderList().then(res => {this.orderList = res; this.ifLoading = false;});

  }

  openForEdit(orderID:number){
    this.router.navigate(['/order/edit/'+orderID]);
  }

  onOrderDelete(orderID: number){
    this.dialogService.openConfirmDialog('Delete Order?').afterClosed()
    .subscribe(res => {
      console.log(res);
      if(res){
        this.orderService.deleteOrder(orderID).then(() => {
              this.refreshList();
              this.toastr.warning('Deleted Successfully', '==Restaurant==', {timeOut: 5000, progressBar: true});
            });
      }
    });

    // if(confirm("Delete?")){
    //   this.orderService.deleteOrder(orderID).then(res => {
    //     this.refreshList();
    //     this.toastr.warning('Deleted Successfully', '==Restaurant==', {timeOut: 5000, progressBar: true});
    //   });
    // }
  }




}
