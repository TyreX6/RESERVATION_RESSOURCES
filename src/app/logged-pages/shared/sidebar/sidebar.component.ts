import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from "../../../global.service";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any = {};
  categories: any[];

  constructor(private router: Router, private _globalService: GlobalService, private _categoriesService: CategoriesService) {
    console.log(this._globalService.currentUser);
    this.user.username = this._globalService.currentUser.username;
    this.user.email = this._globalService.currentUser.email;
    this.user.roles = this._globalService.currentUser.roles;
    this._categoriesService.GetCategoryList().subscribe((result) => {
      this.categories = result;
    })
  }

  ngOnInit() {
  }

  public logout() {
    this._globalService.logout();
    this.router.navigate(['login']);
  }

}
