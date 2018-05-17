import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {Subject} from "rxjs/Subject";
import {Component, OnInit} from "@angular/core";
import {ReservationsService} from "../../services/reservations.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import * as moment from 'moment';

@Component({
  selector: 'add-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Ajouter réservation</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <hr>
    <div class="modal-body">
      <div class="row">
        <label class="col-md-6">
          Date debut réservation:
        </label>
        <div class="col-md-6">
          <input [min]="minFrom" [owlDateTimeTrigger]="dt11" [owlDateTime]="dt11"
                 [(ngModel)]="selectedMoments"
                 [selectMode]="'rangeFrom'">
        </div>
        <owl-date-time [pickerMode]="'dialog'" #dt11></owl-date-time>

      </div>
      <div class="row top20">
        <label class="col-md-6">
          Date fin réservation:
        </label>
        <div class="col-md-6">
          <input [min]="minTo" [owlDateTimeTrigger]="dt10" [owlDateTime]="dt10"
                 [(ngModel)]="selectedMoments"
                 [selectMode]="'rangeTo'">
          <div class="bg-red has-error top10" *ngIf="!endDateValid">
            <span
              class="error-message">Date fin n'est pas valide, elle doit étre supérieur de 15 minutes au moins</span>
          </div>
        </div>

        <owl-date-time [pickerMode]="'dialog'" #dt10></owl-date-time>

      </div>

    </div>
    <hr>
    <div class="modal-footer">
      <button type="button" class="btn bg-green" (click)="AddEvent()">Ajouter</button>
      <button type="button" class="btn bg-light" (click)="bsModalRef.hide()">Fermer</button>
    </div>
  `
})
export class AddResModalContent implements OnInit {

  public selectedMoments = [
    moment().add(moment.duration(1, 'minutes')),
    moment().add(moment.duration(1, 'hours'))
  ];

  public minFrom = moment().add(moment.duration(1, 'minutes'));
  public minTo = this.minFrom.add(moment.duration(15, 'minutes'));

  public endDateValid = true;


  public onClose: Subject<boolean>;
  public onAdd: Subject<any>;

  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.onAdd = new Subject<any>();
  }


  AddEvent() {
    if (moment(this.selectedMoments[0]).add(moment.duration(15, 'minutes')) <= moment(this.selectedMoments[1])) {
      this.endDateValid = true;
      this.onAdd.next(this.selectedMoments);
    }
    else {
      this.endDateValid = false;
    }

  }
}
