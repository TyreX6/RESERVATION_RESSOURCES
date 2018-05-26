import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GlobalService} from "../../../services/global.service";
import {ReservationsService} from "../../services/reservations.service";
import * as moment from 'moment';
import * as $ from 'jquery';
import {Observable} from "rxjs/Observable";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  stockQuote: number;
  reservations: any[] = [];
  obsReservations: Observable<any[]>;
  dataTable: any;

  constructor(private toastr: ToastrService,
              public _gS: GlobalService,
              private _reservationService: ReservationsService,
              private chRef: ChangeDetectorRef,
              private _loader: Ng4LoadingSpinnerService,
              private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this._loader.show();
    this._reservationService.GetReservationsListByUser(this._gS.currentUser.id).subscribe((result) => {
      this.reservations = result;
      this.reservations.sort(function (a, b) {
        let c = moment(a.date_debut).valueOf();
        let d = moment(b.date_debut).valueOf();
        return d - c;
      });
      this._loader.hide();
      //this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      // const table: any = $('#proList');
      // this.dataTable = table.Datatable();


    });
  }

  getPassedReservation() {
    let filteredRes = this.reservations.filter((element) => {
      return moment(element.date_fin) < moment();
    });
    return filteredRes.length;
  }

  getUpcomingReservation() {
    let filteredRes = this.reservations.filter((element) => {
      return moment(element.date_debut) > moment();
    });
    return filteredRes.length;
  }

  getactualReservation() {
    let filteredRes = this.reservations.filter((element) => {
      return moment(element.date_fin) > moment() && moment(element.date_debut) < moment();
    });
    return filteredRes.length;
  }

  isStatus(reservation: any): number {
    if (moment(reservation.date_debut) > moment())
      return 0;
    else if (moment(reservation.date_fin) < moment()) {
      return 2;
    }
    else return 1;
  }

  pourcentage(reservation: any): string {
    let now = moment().valueOf();
    let avancement = (now - moment(reservation.date_debut).valueOf()) / (moment(reservation.date_fin).valueOf() - moment(reservation.date_debut).valueOf());
    let pourcentage = 0;
    if (avancement > 1) {
      pourcentage = 100;
    } else if (avancement > 0) {
      pourcentage = avancement * 100;
    }
    now = null;
    return pourcentage.toString().substr(0, 5);
  }

  annuler(reservation: any) {
    if (confirm("Vous étes sure ?")) {
      this._loader.show();
      this._reservationService.DeleteReservation(reservation.id).subscribe((result) => {
          this._loader.hide();

          if (result.success == 1) {
            this.reservations = this.reservations.filter((element) => {
              return element.id != reservation.id;
            });
            this.reservations = [...this.reservations];
            $("#" + reservation.id).html("");
          } else {
            this.toastr.error("Erreur lors de l'annulation", "erreur");
          }

        },
        (err) => {
          console.log(err);
        })
    }
  }

  ngOnDestroy() {

  }

}
