import {Component, OnInit, AfterContentInit} from '@angular/core';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Router} from "@angular/router";
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any[];

  constructor(private spinnerService: Ng4LoadingSpinnerService,
              private router: Router,
              private _categoriesService: CategoriesService,) {

    this.fetchCategories();

  }

  ngOnInit() {
  }

  refresh() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.spinnerService.show();
    this._categoriesService.GetCategoryList().subscribe((result) => {
      this.categories = result;
      this.spinnerService.hide();
    }, (err) => {
      this.spinnerService.hide();
      console.log(err);
    });
  }


}
