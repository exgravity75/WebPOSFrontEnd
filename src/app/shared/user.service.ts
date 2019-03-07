import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userTokenString: string = 'userToken';

  constructor(private http:HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      UserID: user.UserID,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }

    return this.http.post(environment.apiURL + '/User/Register', body);
  }

  userAuthentication(userName, password) {
    const body = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
    console.log(body);
    return this.http.post(environment.apiURL + '/token', body, {headers: reqHeader});
  }

  registerUserToken(token: string){
    localStorage.setItem(this.userTokenString, token);
  }

  removeUserToken(){
    localStorage.removeItem(this.userTokenString);
  }

  chkUserToken(){
    if (localStorage.getItem(this.userTokenString) != null) {
      return true;
    } else {
      return false;
    }
  }

  getUserToken(){
    if(this.chkUserToken){
      return localStorage.getItem(this.userTokenString);
    }
    else {
      return null;
    }
  }
}
