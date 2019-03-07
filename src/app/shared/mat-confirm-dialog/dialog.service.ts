import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatConfirmDialogComponent } from './mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass= 'confirm-dialog-container';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '400px';
    dialogConfig.position = {top:"20%"};
    dialogConfig.data = {message: msg};

    return this.dialog.open(MatConfirmDialogComponent, dialogConfig);
  }
}
