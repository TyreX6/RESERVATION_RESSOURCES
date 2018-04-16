import {Component, OnInit, ViewChild, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {ToastrService} from 'ngx-toastr';

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
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
})
export class AddReservationComponent implements OnInit, AfterViewChecked {
  closeResult: string;
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
              private modalService: NgbModal) {

    this.userID = this._globalService.currentUser.id;
    this.user = this._globalService.currentUser;
    this.route.paramMap.subscribe(params => {

      console.log(params);
      this.deviceID = params.get('id');

    });

    // if (this.id) {
    //   this.changed({value:this.id});
    // }
    // else {
    this._resourcesService.GetCategorizedResourcesList().subscribe((result) => {
      this.categories = result;
      this.categoriesData = this.getChangeList(result);

    }, (err) => {
      console.log(err);
    });
    // }


  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
    console.log(list.ressource);
    this.resourcesData = this.getChangeList(list.ressource);
  }


  public changed(e: any): void {
    this.spinnerService.show();

    this.deviceSelected = e;
    this._reservationService.GetReservationsList(parseInt(e.value)).subscribe((result) => {
      this.events = [];

      result.forEach((element) => {
        this.events.push(
          {
            id: this.events.length,
            id_res: element.id,
            user: element.user.id,
            title: element.dispositif.modele + " pour " + element.user.username,
            start: moment(element.date_debut),
            end: moment(element.date_fin),
            editable: element.user.id === this.userID && Date.parse(element.date_fin) > Date.now()
          });
      });

      this.spinnerService.hide();

    });
  }


  getChangeList(categories: any[]): Select2OptionData[] {
    let list: any[] = [];
    categories.forEach(function (element) {
      list.push({
        id: element.id,
        text: element.name ? element.name : element.modele,
      });
    });
    return list;
  }


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

  eventClick(model: any) {
    console.log(model);
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
  }

  updateEvent(model: any) {
    this.displayEvent = this._calendarService.updateEvent(model, this.ucCalendar, this.events);
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
        title: this.deviceSelected.modele + " pour " + this.user.username,
        start: moment(this.selectedMoments[0]),
        end: moment(this.selectedMoments[1]),
        editable: true
    };
    this._calendarService.calendarClick(this.user, model, this.ucCalendar, this.deviceSelected, this.events);
    console.log(moment(this.selectedMoments[0]));
  }
}
