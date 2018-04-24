///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit, ViewChild, AfterViewChecked, ViewEncapsulation, TemplateRef} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import {EventSesrvice} from './event.service';
import * as $ from 'jquery';

import 'jqueryui';
import {CalendarInitService} from "./calendar-init.service";
import {Ng4LoadingSpinnerService} from "../../ng4-loading-spinner";
import {ActivatedRoute} from '@angular/router';
import {Select2OptionData} from 'ng2-select2';
import {ResourcesService} from "../services/resources.service";
import {ReservationsService} from "../services/reservations.service";
import * as moment from 'moment';
import {GlobalService} from "../../global.service";
import {Subject} from 'rxjs/Subject';
import {AddResModalContent} from "./AddResModalContent";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
})
export class AddReservationComponent implements OnInit, AfterViewChecked {
  closeResult: string;
  bsModalRef: BsModalRef;
  private deviceID: any;
  private userID: any;
  private user: any;
  private categories: any[];
  displayEvent: any;
  events = [];
  public categoriesData: Array<Select2OptionData>;
  public resourcesData: Array<Select2OptionData>;
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

      this.deviceID = params.get('id');

    });

    this._resourcesService.GetCategorizedResourcesList().subscribe((result) => {
      console.log(result);
      this.categories = result;
      this.categoriesData = this.getChangeList(result);

    }, (err) => {
      console.log(err);
    });


  }


  ngOnInit() {
    this.calendarOptions = this._calendarService.calendar_options(this.events);
  }

  ngAfterViewChecked() {
    this.jqueryCall();
  }


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
    this.spinnerService.show();

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
    this.displayEvent = model;
  }

  dayClick(model: any) {
    console.log(model);
  }

  eventClick(model: any, template: TemplateRef<any>) {

    console.log("event click");
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
    this.displayEvent = model;
    const initialState = {id: model.event.id, ucCalendar: this.ucCalendar};


    if (model.event.user == this.user.id && new Date(model.event.start) > new Date()) {
      this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
      this.bsModalRef.content.id = model.event.id_res;
      this.bsModalRef.content.selectedMoments = [new Date(model.event.start), new Date(model.event.end)];

      this.bsModalRef.content.onClose.subscribe(result => {
        this.ucCalendar.fullCalendar("removeEvents", [model.event.id]);
        this.events = this.events.filter(function (returnableObjects) {
          return returnableObjects.id !== model.event.id;
        });
        this.refreshCalendar(this.deviceSelected.value);

        console.log('after remove', this.events);
        //this.events[model.event.id]={};
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
      this.displayEvent = success;
    });
  }

  resizeEvent(model: any) {
    this.displayEvent = this._calendarService.resizeEvent(model, this.ucCalendar, this.events);
  }


  clearEvents() {
    this.events = [{}];
  }


  jqueryCall() {
    //   $('#date-end').bootstrapMaterialDatePicker({ weekStart : 0 });
    //   $('#date-start').bootstrapMaterialDatePicker({ weekStart : 0 }).on('change', function(e, date){
    //   $('#date-end').bootstrapMaterialDatePicker('setMinDate', date);
    // });
    /* initialize the external events
     -----------------------------------------------------------------*/
    // $('.fc-event').each(function () {
    //   // make the event draggable using jQuery UI
    //   $(this).data('event', {
    //     title: $.trim($(this).text()), // use the element's text as the event title
    //     stick: true // maintain when user navigates (see docs on the renderEvent method)
    //   });
    //   $(this).draggable({
    //     zIndex: 999,
    //     revert: true, // will cause the event to go back to its
    //     revertDuration: 0 //  original position after the drag
    //   });
    // });

  }


  showTime() {
    let model = {
      id: this.events.length,
      id_res: null,
      user: this.user.id,
      title: this.deviceSelected.model + " pour " + this.user.username,
      start: moment(this.selectedMoments[0]),
      end: moment(this.selectedMoments[1]),
      editable: true
    };
    this._calendarService.calendarClick(this.user, model, this.ucCalendar, this.deviceSelected, this.events);
    console.log(moment(this.selectedMoments[0]));
  }

  refreshCalendar(id: number) {
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
            className: element.user.id == this.userID ? ["bg-success"] : ["bg-red"],
            editable: element.user.id === this.userID && Date.parse(element.date_fin) > Date.now()
          });
      });
      console.log("initial", this.events);

      this.spinnerService.hide();

    });
  }

  openModal() {
    const initialState = {ucCalendar: this.ucCalendar};
    this.bsModalRef = this.modalService.show(AddResModalContent, {initialState});
    this.bsModalRef.content.onAdd.subscribe(result => {
      this.spinnerService.show();
      let detail: any = {start: moment(result[0]), end: moment(result[1])};
      this._calendarService.calendarClick(this.user, detail, this.ucCalendar, this.deviceSelected, this.events);
      this.spinnerService.hide();
      this.bsModalRef.hide();
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
  public min = new Date();
  public onClose: Subject<boolean>;
  public onUpdate: Subject<any>;

  constructor(public bsModalRef: BsModalRef,
              private _reservationService: ReservationsService,
              private toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,) {
  }

  ngOnInit() {
    this.onClose = new Subject();
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
        this.onClose.next(true);
        this.bsModalRef.hide();
      }
      else {
        this.spinnerService.hide();
        this.toastr.error("Erreur lors du suppression", "Erreur");
        this.onClose.next(false);
        this.bsModalRef.hide();
      }
    });

  }

  UpdateEvent() {
    this.onUpdate.next(this.selectedMoments);
  }
}



