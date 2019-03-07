import { Component, OnInit, OnChanges } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SignUpComponent } from '../user/sign-up/sign-up.component';
import { SignInComponent } from '../user/sign-in/sign-in.component';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth(): boolean{
    return this.userService.chkUserToken();
  }

  constructor(private dialog:MatDialog,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }





  signIn(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    // dialogConfig.data = {orderItemIndex, OrderID};

    this.dialog.open(SignInComponent, dialogConfig);
  }


  signUp(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';
    // dialogConfig.data = {orderItemIndex, OrderID};

    this.dialog.open(SignUpComponent, dialogConfig);
  }

  logout(){
    this.userService.removeUserToken();
    this.router.navigate(['/orders']);

  }
}
