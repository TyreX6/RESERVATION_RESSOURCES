import {Component, OnInit,OnDestroy} from '@angular/core';
import {GlobalService} from "../services/global.service";
import {Subscription} from 'rxjs/Subscription';
import {ToastrService} from 'ngx-toastr';
import {CategoriesService} from "./services/categories.service";

@Component({
  selector: 'app-logged-pages',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,OnDestroy {
  categs:any[];
  data: any;
  sub: Subscription;
  currentUser:any;
  constructor(
    private _globalService: GlobalService,
    private toastr: ToastrService,
    private _categoriesService: CategoriesService) {
    this.currentUser = this._globalService.currentUser;
  }


  ngOnInit() {
    // this.sub = this.dataService.getNotification()
    //   .subscribe(data => {
    //     if (data.user_id == this.currentUser.id){
    //       let message = "Vous avez une réservation à "+data.date_debut ;
    //       this.toastr.info(message, "Information");
    //     }
    //   });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
