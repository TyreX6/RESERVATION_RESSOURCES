import { Injectable } from "@angular/core";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class GlobalService {
    public currentUser: any = {};
    public serverAddress = "http://localhost:8000/";
    constructor(private jwtHelper: JwtHelperService) {
      if (this.loggedIn()){
        let token = localStorage.getItem('access_token');
        this.currentUser = this.jwtHelper.decodeToken(token);
      }

    }

    public loggedIn(){
      return localStorage.getItem("access_token") !== null;
    }

    public logout(){
      localStorage.removeItem('access_token');
      this.currentUser=null;

    }

}
