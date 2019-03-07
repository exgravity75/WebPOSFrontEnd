import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isValid = true;
  defaultValue = 'test1234';

  constructor(private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<SignInComponent>) { }

  ngOnInit() {
  }


  onSubmit(userName: string, password: string) {
    this.userService.userAuthentication(userName, password)
    .subscribe((res: any) => {
      // console.log(res);
      this.userService.registerUserToken(res.access_token);

      this.router.navigate(['/orders']);
      this.toastr.success('Login Success', '==Dairy==', {timeOut: 5000, progressBar: true});
      this.dialogRef.close();

    }
     , error => {
       this.toastr.error('UserName or password is incorrect', '==Dairy==', {timeOut: 5000, progressBar: true});

     }
    );
  }



}
