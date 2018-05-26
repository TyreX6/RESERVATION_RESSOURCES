import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

declare var $: any;
import {CategoriesService} from "../../services/categories.service";
import {ResourcesService} from "../../services/resources.service";
import {Observable} from "rxjs/Observable";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  closeResult: string;
  type: any = '';
  public modalRef: BsModalRef;
  categoriesNames: any[];
  resources: Observable<any[]>;
  resourcesToShow: Observable<any[]>;
  resolutions$: Observable<any[]>;
  operations: any[] = [{"operation": ">"}, {"operation": "<"}, {"operation": "="}];
  operationSelected = this.operations[0].operation;
  selectedResolution: any = 'Tous';
  resourceName: string ='';
  os: any[] = [];
  osType: any = '';
  someRange: any;
  min = 256;
  max = 14336;
  range = [256, 14336];
  rangeActif = false ;


  constructor(private modalService: BsModalService,
              private _categsService: CategoriesService,
              private _resService: ResourcesService,
              private _loader: Ng4LoadingSpinnerService) {
    this._loader.show();
    this._categsService.GetCategoryNames().subscribe((result) => {
      this.categoriesNames = result;
    });

    this._resService.GetOsList().subscribe((result) => {
      this.os = result;
    });

    this._resService.GetResolutionsList().subscribe((result) => {
      result.push({'resolution': 'Tous'});
      this.resolutions$ = Observable.of(result);
    });

    this._resService.GetResourcesList().subscribe((result) => {
      this.resources = Observable.of(result);
      this.resourcesToShow = this.resources;
      // this.resourcesToShow = this.resources.map(resources =>
      //   resources.filter(resource => resource.os === "IOS"));
      this._loader.hide();
      this.rangeActif = true ;
    });



  }

  ngOnInit() {
    //this.jqueryCalls();
  }

  categChange() {
    this.filterResources();
  }

  nameChanged(e) {
    this.filterResources();
  }

  checkOsChange() {
    this.filterResources();
  }

  rangeChanged(event: any) {
    if (this.rangeActif){
      this.filterResources();
    }

  }

  resolChanged(e) {
    this.filterResources();
  }

  OperationChanged(e) {
    this.filterResources();
  }

  filterResources() {
    if (this.type == '') {
      this.resourcesToShow = this.resources.map(resources =>
        resources);
    }
    else {
      if (this.type > 3) {
        this.resourcesToShow = this.resources.map(resources =>
          resources.filter(resource => resource.category.id == this.type));
      }
      else if (this.type == 3) {
        this.resourcesToShow = this.resources.map(resources =>
          resources.filter(resource => resource.category.id == this.type));
        this.filterByResolution();
      }
      else {
        this.resourcesToShow = this.resources.map(resources =>
          resources.filter(resource => resource.category.id == this.type));
        this.filterByram();
        this.filterByResolution();
        this.filterByOs();
      }
    }

    this.filterByName();


  }

  filterByOs() {
    if (this.osType == '') {
      this.resourcesToShow = this.resourcesToShow.map(resources =>
        resources);
    }
    else {
      this.resourcesToShow = this.resourcesToShow.map(resources =>
        resources.filter(resource => resource.os == this.osType));
    }
  }

  filterByram() {
    this.resourcesToShow = this.resourcesToShow.map(resources =>
      resources.filter(resource => (1000 * resource.ram >= this.range[0]) && (1000 * resource.ram) <= this.range[1]));
  }

  filterByName() {
    this.resourcesToShow = this.resourcesToShow.map(resources =>
      resources.filter(resource => resource.name.toLowerCase().replace(/\s/g, '').indexOf(this.resourceName.toLowerCase().replace(/\s/g, '')) !== -1));
  }

  filterByResolution() {
    if (this.selectedResolution !== "Tous") {
      if (this.operationSelected == "=") {
        this.resourcesToShow = this.resourcesToShow.map(resources =>
          resources.filter(resource => resource.resolution == this.selectedResolution));
      }
      else if (this.operationSelected == ">") {
        this.resourcesToShow = this.resourcesToShow.map(resources =>
          resources.filter(resource => resource.resolution >= this.selectedResolution));
      }
      else if (this.operationSelected == "<") {
        this.resourcesToShow = this.resourcesToShow.map(resources =>
          resources.filter(resource => resource.resolution <= this.selectedResolution));
      }

    }
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  jqueryCalls() {
    var callbacks_list = $('.demo-callbacks ul');
    $('input.iCheck').on('ifCreated ifClicked ifChanged ifChecked ifUnchecked ifDisabled ifEnabled ifDestroyed', function (event) {
      callbacks_list.prepend('<li><span>#' + this.id + '</span> is ' + event.type.replace('if', '').toLowerCase() + '</li>');
    }).iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green',
      increaseArea: '20%'
    });

    let $this = this;
    $('input[name="optionsRadios"]').on('ifChecked', function (event) {
      $this.type = $(this).val();
    });
  }


}
