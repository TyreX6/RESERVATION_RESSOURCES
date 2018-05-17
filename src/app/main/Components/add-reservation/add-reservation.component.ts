import {Component, OnInit, ViewChild, AfterViewChecked, ViewEncapsulation, TemplateRef} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

// import * as $ from 'jquery';
declare var $;
import 'jqueryui';
import {CalendarInitService} from "./calendar-init.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ActivatedRoute} from '@angular/router';
import {Select2OptionData} from 'ng2-select2';
import {ResourcesService} from "../../services/resources.service";
import {ReservationsService} from "../../services/reservations.service";
import * as moment from 'moment';
import {GlobalService} from "../../../services/global.service";
import {Subject} from 'rxjs/Subject';
import {AddResModalContent} from "./AddResModalContent";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
  styles: [`:host >>> .select2-container {
    min-width: 100%;
  }`]
})
export class AddReservationComponent implements OnInit, AfterViewChecked {
  closeResult: string;
  bsModalRef: BsModalRef;
  public deviceID: any;
  private userID: any;
  private user: any;
  private categories: any[];
  events = [];
  public categoriesData: Array<Select2OptionData>;
  public resourcesData: Array<Select2OptionData> = [];
  public startValue: string;
  public deviceSelected: any;
  calendarOptions: Options;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  public selectedMoments = [
    new Date(),
    new Date()
  ];
  public min = new Date();

  constructor(private toastr: ToastrService,
              private _globalService: GlobalService,
              private route: ActivatedRoute,
              private _calendarService: CalendarInitService,
              private spinnerService: Ng4LoadingSpinnerService,
              private _resourcesService: ResourcesService,
              private _reservationService: ReservationsService,
              private modalService: BsModalService) {

    this.userID = this._globalService.currentUser.id;
    this.user = this._globalService.currentUser;

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.deviceID = params.get('id');

        this._resourcesService.GetResourcesList().subscribe((result) => {
          let data: any[] = result.filter((element) => {
            return element.id == this.deviceID;
          });
          this.resourcesData = this.getChangeList(data);
        });

      }
      else {
        this._resourcesService.GetCategorizedResourcesList().subscribe((result) => {
          this.categories = result;
          this.categoriesData = this.getChangeList(result);

        }, (err) => {
          console.log(err);
        });
      }


    });


  }


  ngOnInit() {
    //Initiate the calendar options
    this.calendarOptions = this._calendarService.calendar_options(this.events);
    $('#modal-request-details').modal('show');
  }

  ngAfterViewChecked() {
    this.jqueryCall();
  }

  //On category list change
  public categoryChanged(e: any): void {

    let list: any;
    list = this.categories.find(function (element) {
      return element.id == e.value;
    });

    this.resourcesData = this.getChangeList(list.ressource);
  }


  /**
   * On resource list change
   * @param e
   */
  public changed(e: any): void {
    this.deviceSelected = e;
    this.refreshCalendar(e.value);
  }


  /**
   * On category list change
   * @param {any[]} categories
   * @returns {Select2OptionData[]}
   */
  public getChangeList(categories: any[]): Select2OptionData[] {
    let list: any[] = [];
    categories.forEach(function (element) {
      list.push({
          id: element.id,
          text: element.name ? element.name : element.model,
        });
    });
    return list;
  }


  /**
   * On Calendar select Event
   * After making choice of the range desired to be reserved
   * A new reservation will be added
   * @param detail
   */
  calendarClick(detail: any) {
    this._calendarService.calendarClick(this.user, detail, this.ucCalendar, this.deviceSelected, this.events);
  }

  render(model: any) {
    console.log("render event", model);
  }


  clickButton(model: any) {
  }

  dayClick(model: any) {
    console.log(model);
  }

  eventClick(model: any) {

    model = {
      event: {
        id: model.event.id,
        id_res: model.event.id_res,
        user: model.event.user,
        resource: model.event.res,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay,
        className: model.event.className,
        // other params
      },
      duration: {}
    };

    /**
     * If the reservation is editable
     */
    if (model.event.user == this.user.id && new Date(model.event.start) > new Date()) {

      // Show Model
      this.bsModalRef = this.modalService.show(ModalContentComponent);
      this.bsModalRef.content.id = model.event.id_res;
      this.bsModalRef.content.selectedMoments = [model.event.start, model.event.end];

      this.bsModalRef.content.onDelete.subscribe(result => {
        // this.ucCalendar.fullCalendar("removeEvents", [model.event.id]);
        // this.events = this.events.filter(function (returnableObjects) {
        //   return returnableObjects.id !== model.event.id;
        // });
        this.refreshCalendar(this.deviceSelected.value);

      });

      this.bsModalRef.content.onUpdate.subscribe(result => {
        this.spinnerService.show();
        let oldStartMoment = moment(model.event.start);
        let oldEndMoment = moment(model.event.end);
        model.event.start = moment(result[0]);
        model.event.end = moment(result[1]);
        this._calendarService.updateEvent(model, this.ucCalendar, this.events).subscribe((success) => {
          if (success) {
            this.bsModalRef.hide();
          }
          else {
            this.ucCalendar.fullCalendar('removeEvents', [model.event.id]);
            model.event.start = oldStartMoment;
            model.event.end = oldEndMoment;
            model.event.className = "bg-danger";
            this.ucCalendar.fullCalendar('renderEvent', model.event);
          }
          this.spinnerService.hide();
        });

      });
    }
  }

  updateEvent(model: any) {
    this._calendarService.updateEvent(model, this.ucCalendar, this.events).subscribe((success) => {
      //this.displayEvent = success;
    });
  }

  resizeEvent(model: any) {
    this._calendarService.resizeEvent(model, this.ucCalendar, this.events);
  }


  clearEvents() {
    this.events = [{}];
  }


  jqueryCall() {
  }


  public refreshCalendar(id: number) {
    this.spinnerService.show();
    this._reservationService.GetReservationsList(id).subscribe((result) => {
        this.events = [];

        result.forEach((element) => {
          this.events.push(
            {
              id: this.events.length,
              id_res: element.id,
              user: element.user.id,
              title: "Réservé pour " + element.user.username,
              start: moment(element.date_debut),
              end: moment(element.date_fin),
              resource: element.ressource.id,
              className: element.user.id == this.userID && moment(element.date_fin) > moment() ? ["bg-dark-green"] : ["bg-grey"],
              editable: element.user.id === this.userID && Date.parse(element.date_fin) > Date.now()
            });
        });
        this.spinnerService.hide();
      },
      (err: HttpErrorResponse) => {
        console.log("Error occured.", err);
        this.toastr.error("Erreur coté serveur", "Erreur 500");
        this.spinnerService.hide();
      }
    );

  }

  openModal() {
    const initialState = {ucCalendar: this.ucCalendar};
    this.bsModalRef = this.modalService.show(AddResModalContent, {initialState});

    this.bsModalRef.content.onAdd.subscribe(result => {
      this.spinnerService.show();
      let detail: any = {start: moment(result[0]), end: moment(result[1])};

      if (!this._calendarService.verifyCrossReservation(this.events, detail.start, detail.end)) {

        this._calendarService.calendarClick(this.user, detail, this.ucCalendar, this.deviceSelected, this.events);
        this.bsModalRef.hide();
      } else {
        this.toastr.error("Il existe une autre réservation", "Erreur");
      }
      this.spinnerService.hide();
    });
  }

}


@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Modifier réservation</h4>
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
      <button type="button" class="btn bg-green" (click)="UpdateEvent()">Modifier</button>
      <button type="button" class="btn bg-red" (click)="deleteEvent()">Supprimer</button>
      <button type="button" class="btn bg-light" (click)="bsModalRef.hide()">Fermer</button>
    </div>
  `
})
export class ModalContentComponent implements OnInit {
  id: number;
  events: any[];
  public selectedMoments = [];

  public minFrom = moment();
  public minTo = this.minFrom.add(moment.duration(15, 'minutes'));
  public endDateValid = true;

  public onDelete: Subject<boolean>;
  public onUpdate: Subject<any>;

  constructor(public bsModalRef: BsModalRef,
              private _reservationService: ReservationsService,
              private toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,) {
  }

  ngOnInit() {
    this.onDelete = new Subject();
    this.onUpdate = new Subject<any>();
  }

  deleteEvent() {
    this.spinnerService.show();
    console.log("id", this.id);
    this._reservationService.DeleteReservation(this.id).subscribe((result) => {
      console.log(result);
      if (result.success == 1) {
        this.toastr.success("Réservation supprimé", "Succée");
        this.spinnerService.hide();
        this.onDelete.next(true);
        this.bsModalRef.hide();
      }
      else {
        this.spinnerService.hide();
        this.toastr.error("Erreur lors du suppression", "Erreur");
        this.onDelete.next(false);
        this.bsModalRef.hide();
      }
    });

  }

  UpdateEvent() {
    if (moment(this.selectedMoments[0]).add(moment.duration(15, 'minutes')) <= moment(this.selectedMoments[1])) {
      this.endDateValid = true;
      this.onUpdate.next(this.selectedMoments);
    }
    else {
      this.endDateValid = false;
    }

  }
}



