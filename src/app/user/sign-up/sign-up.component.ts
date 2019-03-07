import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.model';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  formData: User;

  isValid = true;

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit() {
    this.formData = {
      UserID : '',
      Email : '',
      FirstName : '',
      LastName : '',
      Password : ''
    }
  }

  onSubmit(form:NgForm){
    if(this.validateForm(form.value)){
      this.userService.registerUser(form.value).subscribe( (data: any) => {
        if(data.Succeeded == true){
          this.toastr.success('Submitted Success', '==Dairy==', {timeOut: 5000, progressBar: true});
          this.dialogRef.close();
        }
        else
        {
          this.toastr.error(data.Errors[0], '==Dairy==', {timeOut: 5000, progressBar: true});
        }

      });
    }

  }

  validateForm(formData:User){
    this.isValid = true;

    // console.log(formData);
    if(formData.FirstName == ''
    || formData.LastName == ''
    || formData.UserID == ''
    || formData.Password == ''
    || formData.Email == ''){
      this.isValid = false;
    }

    return this.isValid;
  }

}
