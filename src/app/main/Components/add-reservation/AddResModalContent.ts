import {Ng4LoadingSpinnerService} from "../../../services/ng4-loading-spinner";
import {Subject} from "rxjs/Subject";
import {ToastrService} from "ngx-toastr";
import {Component, OnInit} from "@angular/core";
import {ReservationsService} from "../../services/reservations.service";
import {BsModalRef} from "ngx-bootstrap/modal";

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
          <input [min]="min" [owlDateTimeTrigger]="dt11" [owlDateTime]="dt11"
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
          <input [min]="min" [owlDateTimeTrigger]="dt10" [owlDateTime]="dt10"
                 [(ngModel)]="selectedMoments"
                 [selectMode]="'rangeTo'">
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
    new Date(),
    new Date()
  ];
  public min = new Date();
  public onClose: Subject<boolean>;
  public onAdd: Subject<any>;

  constructor(public bsModalRef: BsModalRef,
              private _reservationService: ReservationsService,
              private toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,) {
  }

  ngOnInit() {
    this.onClose = new Subject();
    this.onAdd = new Subject<any>();
  }


  AddEvent() {
    this.onAdd.next(this.selectedMoments);
  }
}
