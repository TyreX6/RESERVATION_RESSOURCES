import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalService} from "../../../global.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:any={};

  constructor(private router:Router,private _globalService:GlobalService) {
    this.user.username=this._globalService.currentUser.username;
  }

  ngOnInit() {
  }

  public logout() {
    this._globalService.logout();
    this.router.navigate(['login']);
  }

}
