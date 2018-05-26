import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Router} from '@angular/router';
import {GlobalService} from "../../../services/global.service";
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  categories: any[];

  constructor(
    private _categoriesService: CategoriesService,
    private router: Router,
    public _globalService: GlobalService
  ) {
    this._categoriesService.GetCategoryNames().subscribe((result) => {
      this.categories = result;
    });
  }

  ngOnInit() {
    $(window).resize(function() {
      var scrollH = $(window).height();

      $('#right-sidebar .tab-content').slimScroll({
        height: scrollH - 45
      });
      $('.page-sidebar-fixed .page-sidebar-menu').slimScroll({
        height: scrollH - 45
      });

    });
  }

  logout() {
    this._globalService.logout();
    this.router.navigate(['login']);
  }

}
