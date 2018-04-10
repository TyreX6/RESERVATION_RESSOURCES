import {Component, OnInit} from '@angular/core';
import {Ng4LoadingSpinnerService} from '../../ng4-loading-spinner';
import {ActivatedRoute, Router} from "@angular/router";
import {ResourcesService} from "../services/resources.service";
import {CategoriesService} from "../services/categories.service";

declare let $: any;

@Component({
  selector: 'app-list-resources',
  templateUrl: './list-resources.component.html',
  styleUrls: ['./list-resources.component.css']
})
export class ListResourcesComponent implements OnInit {

  resources: any[];
  public categories: any[];
  private categID: any;

  constructor(private spinnerService: Ng4LoadingSpinnerService,
              private router: ActivatedRoute,
              private _resourcesService: ResourcesService,
              private _categoryService: CategoriesService) {
    this.router.paramMap.subscribe(params => {
      console.log(params);
      this.categID = parseInt(params.get('category'));

    });

  }


  ngOnInit() {
    this.fetchResources();
    $(function () {
      $('.collapse.in').prev('.panel-heading').addClass('active');
      $('#accordion, #bs-collapse')
        .on('show.bs.collapse', function (a) {
          $(a.target).prev('.panel-heading').addClass('active');
        })
        .on('hide.bs.collapse', function (a) {
          $(a.target).prev('.panel-heading').removeClass('active');
        });
    })
  }


  private fetchResources() {
    this.spinnerService.show();
    if (this.categID) {
      this._categoryService.GetCategory(this.categID).subscribe((result) => {
        this.categories = [];
        this.categories.push(result);
        this.spinnerService.hide();

      }, (err) => {
        this.spinnerService.hide();
        console.log(err);
      });

    }
    else {

      this._resourcesService.GetCategorizedResourcesList().subscribe((result) => {
        this.categories = result;
        this.spinnerService.hide();

      }, (err) => {
        this.spinnerService.hide();
        console.log(err);
      });

    }


  }

}
