import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable as RxObservable} from "rxjs/Observable";

import {GlobalService} from '../global.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
  public serverAddress: any;

  constructor(
      public http: HttpClient,
      private globalServ: GlobalService,
      public jwtHelper: JwtHelperService
  ) {
    this.serverAddress = this.globalServ.serverAddress;
    console.log('Hello AuthServiceProvider Provider');
  }

  loginService(data:any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.serverAddress+'api/login_check', JSON.stringify(data), {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      })
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  loggedIn() {
    return ! this.jwtHelper.isTokenExpired();
  }

  // logout() {
  //   localStorage.removeItem('id_token');
  // }
  //
  // loggedIn() {
  //   return tokenNotExpired('id_token');
  // }

}
