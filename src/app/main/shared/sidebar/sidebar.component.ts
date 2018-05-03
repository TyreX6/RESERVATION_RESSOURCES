import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
  AfterViewInit, ViewContainerRef
} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from "../../../services/global.service";
import {CategoriesService} from "../../services/categories.service";
import {SideMenuDirective} from "./side.menu.directive";
import {DynamicMenuComponent} from "./dynamic.menu.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  user: any = {};
  interval: any;
  categories: any[];
  @Input() categs: any[];
  // @ViewChild(SideMenuDirective) adHost: SideMenuDirective;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) myRef;

  constructor(private router: Router,
              private _globalService: GlobalService,
              private _categoriesService: CategoriesService,
              private componentFactoryResolver: ComponentFactoryResolver) {

    console.log(this._globalService.currentUser);
    this.user.username = this._globalService.currentUser.username;
    this.user.email = this._globalService.currentUser.email;
    this.user.roles = this._globalService.currentUser.roles;

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this._categoriesService.GetCategoryList().subscribe((result) => {
      this.categs = result;
      this.loadComponent();
    });

    // this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicMenuComponent);
    const ref = this.myRef.createComponent(componentFactory);
     // let viewContainerRef = this.myRef.viewContainerRef;
    // viewContainerRef.clear();

    // let componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>ref.instance).categs = this.categs;
    ref.changeDetectorRef.detectChanges();
    console.log(this.categs);
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 10000);
  }

  public logout() {
    this._globalService.logout();
    this.router.navigate(['login']);
  }

}
