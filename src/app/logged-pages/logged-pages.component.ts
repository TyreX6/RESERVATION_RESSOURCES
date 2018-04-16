import {Component, OnInit,OnDestroy} from '@angular/core';
import {GlobalService} from "../global.service";
import {DataService} from './services/data.service';
import {Subscription} from 'rxjs/Subscription';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-logged-pages',
  templateUrl: './logged-pages.component.html',
  styleUrls: ['./logged-pages.component.css']
})
export class LoggedPagesComponent implements OnInit,OnDestroy {
  data: any;
  sub: Subscription;
  currentUser:any;
  constructor(
    private _globalService: GlobalService,
    private dataService: DataService,
    private toastr: ToastrService) {
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
