
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthIntercepter implements HttpInterceptor {

  constructor(private router: Router,
    private userService: UserService,
    private toastr: ToastrService){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if(request.headers.get('No-Auth') == 'True'){
    //   return next.handle(request.clone());
    // }
    let clonedReq;

    if(this.userService.chkUserToken()){
      clonedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.userService.getUserToken())
      });
    }
    else{
      clonedReq = request.clone();
    }

      return next.handle(clonedReq).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
                // this.errorDialogService.openDialog(event);
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            // let data = {};
            // data = {
            //     reason: error && error.error.reason ? error.error.reason : '',
            //     status: error.status
            // };
            if(error.status === 401){
              this.toastr.error('Login reguired!', '==Dairy==', {timeOut: 5000, progressBar: true});
              this.userService.removeUserToken();
            }
            else{
              this.toastr.error('Server Not Responding!', '==Dairy==', {timeOut: 5000, progressBar: true});
              this.router.navigate(['/']);
            }


            // this.errorDialogService.openDialog(data);
            return throwError(error);
        }));

      // Angular 4~5
      // return next.handle(clonedReq)
      // .do(
      //   suc => {},
      //   (err:any) => {
      //     if(err.status === 401) {

      //       this.toastr.error('Login reguired!', '==Dairy==', {timeOut: 5000, progressBar: true});
      //     }
      //     else {
      //       this.toastr.error('Server not responding!', '==Dairy==', {timeOut: 5000, progressBar: true});
      //     }

      //   this.router.navigate(['/']);

      //   }
      // );

    // else {
    //   this.toastr.error('Login reguired!', '==Dairy==', {timeOut: 5000, progressBar: true});
    //   this.router.navigate(['/']);

    // }

    return;
  }
}
