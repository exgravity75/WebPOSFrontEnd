import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(this.userService.chkUserToken()){

        return true;
      } else {
        this.toastr.error('Login reguired!', '==Dairy==', {timeOut: 5000, progressBar: true});

        this.router.navigate(['/Orders']);
        return false;
      }
  }
}
